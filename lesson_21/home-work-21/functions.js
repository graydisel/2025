'use strict'
export function generateKey(keyLength, symbols) {
    let key = '';
    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        key += symbols[randomIndex];
    }
    return key;
}