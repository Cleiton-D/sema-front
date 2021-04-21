import { SelectHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import * as S from './styles';

type DefaultSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = Omit<DefaultSelectProps, 'value'> & {
  label: string;
  name: string;
  options?: SelectOption[];
};

const Select = ({ name, label, options = [] }: SelectProps) => {
  const [hasValue, setHasValue] = useState(false);
  const { defaultValue, fieldName, registerField } = useField(name);

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setHasValue(!!value);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
      getValue: (ref) => ref.current.value
    });
  }, [registerField, fieldName]);

  return (
    <S.Wrapper>
      <S.Label hasValue={hasValue}>
        <span>{label}</span>
        <S.Input
          ref={selectRef}
          defaultValue={defaultValue}
          onChange={handleSelectOption}
        >
          <option></option>
          {options.map(({ label, value }) => (
            <option key={`${label}_${value}`} value={value}>
              {label}
            </option>
          ))}
        </S.Input>
      </S.Label>
    </S.Wrapper>
  );
};

export default Select;
