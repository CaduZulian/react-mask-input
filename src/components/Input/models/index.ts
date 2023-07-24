/* eslint-disable prettier/prettier */

export interface InputMaskProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string;
}
