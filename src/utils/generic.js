export const removeAccents = string => {
  const accents =
    'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź';
  const accentsOut =
    'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz';
  return string
    .split('')
    .map(letter => {
      const accentIndex = accents.indexOf(letter);
      return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
    .join('');
};
