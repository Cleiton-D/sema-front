import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react';
import { useField } from '@unform/core';
import mergeRefs from 'react-merge-refs';

import * as S from './styles';

type InputHtmlProps =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputAs = 'input' | 'textarea';

export type TextInputProps = Omit<InputHtmlProps, 'value'> & {
  name: string;
  label: string;
  as?: InputAs;
  onChangeValue?: (value: string) => void;
};

const TextInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({ as = 'input', name, label, ...rest }, ref) => {
  const [hasValue, setHasValue] = useState(false);
  const { registerField, fieldName, error, defaultValue } = useField(name);

  const fieldRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHasValue(!!value);
  };

  useEffect(() => {
    registerField<HTMLInputElement>({
      name: fieldName,
      ref: fieldRef,
      getValue: (reference) => reference.current.value
    });
  }, [registerField, fieldName]);

  useEffect(() => {
    setHasValue(!!defaultValue);
  }, [defaultValue]);

  return (
    <S.Wrapper inputAs={as}>
      <S.Label hasValue={hasValue} inputAs={as}>
        <span>{label}</span>
        <S.Input
          onChange={handleChange}
          defaultValue={defaultValue}
          as={as}
          ref={mergeRefs([fieldRef, ref])}
          {...rest}
        />
      </S.Label>
      {!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Wrapper>
  );
};

export default forwardRef(TextInput);
