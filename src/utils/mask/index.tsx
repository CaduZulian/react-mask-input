import { defaultChars } from '../../constants';

export const removeMask = (value: string, mask: string, maskChar?: string) => {
  const defaultCharsArray = Object.keys(defaultChars);

  const valueChars = value.split('');
  const maskChars = mask.split('');
  const result: string[] = [];

  maskChars.forEach((char, index) => {
    if (
      defaultCharsArray.includes(char) &&
      !!value[index] &&
      (maskChar ? value[index] !== maskChar : true)
    ) {
      result.push(valueChars[index]);
    }
  });

  return result.join('');
};
