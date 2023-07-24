import { defaultChars } from '../../constants';

export const removeMask = (value: string, mask: string, maskChar?: string) => {
  const defaultCharsArray = Object.keys(defaultChars);

  const valueChars = value.split('');
  const maskChars = mask.split('');

  const result = maskChars.reduce((acc, char, index) => {
    if (
      defaultCharsArray.includes(char) &&
      !!value[index] &&
      (maskChar ? value[index] !== maskChar : true)
    ) {
      acc.push(valueChars[index]);
    }
    return acc;
  }, [] as string[]);

  return result.join('');
};

export const maskText = (value: string, mask: string, maskChar?: string) => {
  const defaultCharsArray = Object.keys(defaultChars);

  const valueChars = value.split('');
  const maskChars = mask.split('');

  const result = maskChars.reduce((acc, char, index) => {
    console.log(valueChars, index);
    if (defaultCharsArray.includes(char)) {
      if (valueChars[index]) {
        acc.push(valueChars[index]);
      } else {
        maskChar && acc.push(maskChar);
      }
    } else {
      acc.push(char);
    }
    return acc;
  }, [] as string[]);

  return result.join('');
};
