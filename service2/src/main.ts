import { LATIN_ONLY_REGEX } from '@dev/api-sdk';

console.info('Service2', LATIN_ONLY_REGEX);

setInterval(() => {
    console.warn('Service2', LATIN_ONLY_REGEX);
}, 10000);

