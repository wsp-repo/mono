import { LATIN_ONLY_REGEX } from '@dev/api-sdk';

console.info(LATIN_ONLY_REGEX);

setInterval(() => {
    console.warn('Service1', LATIN_ONLY_REGEX);
}, 10000);

