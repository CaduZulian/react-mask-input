import React from 'react';
import { ChangeEvent, FocusEvent } from 'react';
import './styles.css';
import { defaultChars } from '../../constants';
import { maskText } from '../../utils';
import { InputMaskProps } from './models';

export const Input = ({
  onChange,
  onFocus,
  onBlur,
  mask,
  maskChar,
  ...props
}: InputMaskProps) => {
  const defaultCharsArray = Object.keys(defaultChars);
  const defaultMask = maskChar
    ? mask.replace(/(9)|(a)|(\*)/g, maskChar)
    : mask.slice(
        0,
        mask.split('').findIndex((char) => defaultCharsArray.includes(char))
      );
  const defaultSelectionStart = mask
    .split('')
    .findIndex((char) => defaultCharsArray.includes(char));

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cursorPosition = event.target.selectionStart ?? 0;

    const baseValue = event.target.value.slice(0, cursorPosition);

    if (baseValue) {
      event.target.value = maskText(baseValue, mask, maskChar);
    }

    window.requestAnimationFrame(() => {
      if (!defaultCharsArray.includes(mask.split('')[cursorPosition])) {
        let newCursorPosition = mask
          .slice(cursorPosition, mask.length)
          .split('')
          .findIndex((char) => defaultCharsArray.includes(char));

        if (newCursorPosition === -1) {
          newCursorPosition = 0;
        }

        event.target.setSelectionRange(
          cursorPosition + newCursorPosition,
          cursorPosition + newCursorPosition
        );
      } else {
        event.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    });

    if (onChange) {
      onChange(event);
    }
  };

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      event.target.value = defaultMask;
      window.requestAnimationFrame(() => {
        event.target.setSelectionRange(
          defaultSelectionStart,
          defaultSelectionStart
        );
      });
    } else {
      window.requestAnimationFrame(() => {
        const cursorPosition = mask
          .split('')
          .findIndex(
            (char, index) =>
              defaultCharsArray.includes(char) &&
              (!event.target.value[index] ||
                (maskChar && event.target.value[index] === maskChar))
          );

        event.target.setSelectionRange(cursorPosition, cursorPosition);
      });
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === defaultMask) {
      event.target.value = '';
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div className='container'>
      <label htmlFor='mask'>Mask</label>

      <input
        type='text'
        id='mask'
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...props}
      />
    </div>
  );
};
