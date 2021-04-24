import CryptoJS from 'crypto-js';
import {secretKey} from '../config';

export const encrypt = (plainText: string): string => {
    return CryptoJS.AES.encrypt(plainText, secretKey).toString();
}

export const decrypt = (ciphertext: string): string => {
    return CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8)
}