export default function (str) {
  const map = {
    '-': ' ',
    // eslint-disable-next-line no-dupe-keys
    '-': '_',
    a: 'á|à|ã|â|À|Á|Ã|Â',
    e: 'é|è|ê|É|È|Ê',
    i: 'í|ì|î|Í|Ì|Î',
    o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    c: 'ç|Ç',
    n: 'ñ|Ñ',
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const pattern in map) {
    if (pattern && str) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }
  }

  return str;
}
