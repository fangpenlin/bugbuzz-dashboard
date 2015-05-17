import Ember from 'ember';
import { highlight } from 'highlight.js';

function range(start, count) {
  return Array.apply(0, new Array(count))
    .map(function (element, index) {
      return index + start;
    });
}

// return tag opening string
function tagOpen(tag) {
  return '<%@ class="%@">'.fmt(tag.tagName.toLowerCase(), tag.className);
}

// return tag closing string
function tagClose(tag) {
  return '</%@>'.fmt(tag.tagName.toLowerCase());
}

// split DOM nodes into lines
function splitLines(nodes) {
  var lines = [];
  var currentLine = [];
  var openingTags = [];

  var traverse = function (currentNodes) {
    var lastOpenTag;
    var tagPrefix = [];
    var tagSuffix = [];
    openingTags.forEach(function (tag) {
      tagPrefix.push(tagOpen(tag));
      tagSuffix.push(tagClose(tag));
    });
    tagPrefix = tagPrefix.join('');
    tagSuffix = tagSuffix.join('');
    if (openingTags.length) {
      lastOpenTag = openingTags[openingTags.length - 1];
      currentLine.push(tagOpen(lastOpenTag));
    }
    var processLine = function (line) {
      // we see a newline, flush current line
      if (line.endsWith('\n')) {
        currentLine.push(line.slice(0, line.length - 1));
        // wrap current line with open tags
        lines.push(currentLine.join('') + tagSuffix);
        currentLine = [tagPrefix];
      // this line has no newline, just buffer it
      } else {
        currentLine.push(line);
      }
    };
    for (var i = 0; i < currentNodes.length; i++) {
      var node = currentNodes[i];
      // text node
      if (node.nodeType === Node.TEXT_NODE) {
        var lineParts = node.textContent.match(/([^\n]*?)(\n|$)/g);
        lineParts.forEach(processLine);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        openingTags.push(node);
        traverse(node.childNodes, openingTags);
      } else {
        throw new Error('Not supported node %@'.fmt(node));
      }
    }
    if (openingTags.length) {
      currentLine.push(tagClose(lastOpenTag));
      openingTags.pop();
    }
  };
  traverse(nodes);
  if (currentLine.length) {
    lines.push(currentLine.join(''));
  }
  return lines;
}

export default Ember.Component.extend({
  classNameBindings: ['lang'],
  hasLineNumbers: true,
  lineNumbers: Ember.computed('code', function() {
    var code = this.get('code');

    if (code) {
      return range(1, code.split('\n').length);
    } else {
      return [];
    }
  }).readOnly(),

  highlight: Ember.computed('code', 'lang', function() {
    var lang = this.get('lang');
    var code = this.get('code');

    if (!lang) {
      throw new Error('highlight-js lang property must be set');
    }
    var html = highlight(lang, code).value;
    var nodes = Ember.$.parseHTML(html);
    var lines = splitLines(nodes);
    var wrappedLines = [];
    lines.forEach(function (line, index) {
      wrappedLines.push('<span id="line-%@">'.fmt(index + 1) + line + '</span>');
    });
    var result = wrappedLines.join('\n');
    return result;
  }).readOnly()
});
