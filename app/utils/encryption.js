/* global Crypto */
import { base64DecToArr, UTF8ArrToStr } from './base64';

// decrypt with base64 parameters
export function decrypt_with_b64(key, iv, data) {
    var key = base64DecToArr(key);
    var iv = base64DecToArr(iv);
    var encrypted = base64DecToArr(data);
    return Crypto.pkcs_unpad(
      Crypto.decrypt_aes_cbc(encrypted.buffer, key.buffer, iv.buffer)
    );
}

// decrypt with base64 parameters and return string
export function decrypt_with_b64_as_string(key, iv, data) {
    var decrypted = decrypt_with_b64(key, iv, data);
    return UTF8ArrToStr(new Uint8Array(decrypted));
}
