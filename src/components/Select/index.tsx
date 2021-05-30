import { useEffect, useState } from 'react';
import { useField } from '@unform/core';

import TextInput from 'components/TextInput';

import * as S from './styles';

export type Option = {
  label: string;
  value: any;
};

type SelectProps = {
  label: string;
  name: string;
  options?: Option[];
  emptyOption?: boolean;
  onChange?: (value?: any) => void;
  className?: string;
  disabled?: boolean;
};

const Select = ({
  name,
  label,
  options = [],
  className,
  emptyOption = false,
  disabled = false,
  onChange
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const { defaultValue, fieldName, registerField, error } = useField(name);

  const handleChange = (option?: Option) => {
    setSelectedOption(option);
    onChange && onChange(option?.value);
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedOption?.value
    });
  }, [registerField, fieldName, selectedOption]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.value === defaultValue
      );
      setSelectedOption(defaultOption);
    }
  }, [defaultValue, options]);

  return (
    <S.Wrapper className={className}>
      <TextInput
        name={name}
        label={label}
        unformRegister={false}
        readOnly
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        value={selectedOption?.label}
        icon={<S.ArrowIcon isOpen={open} />}
        error={error}
        disabled={disabled}
      />
      <S.OptionsList isOpen={open}>
        {emptyOption && (
          <S.Option onClick={() => handleChange(undefined)}>&nbsp;</S.Option>
        )}
        {options.map((option) => (
          <S.Option
            key={`${option.label}-${JSON.stringify(option.value)}`}
            onClick={() => handleChange(option)}
          >
            {option.label}
          </S.Option>
        ))}
      </S.OptionsList>
    </S.Wrapper>
  );
};

export default Select;
