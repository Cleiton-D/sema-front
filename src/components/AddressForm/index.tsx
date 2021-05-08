import { forwardRef } from 'react';
import { FormHandles } from '@unform/core';
import { PrimitiveAtom, useAtom } from 'jotai';

import TextInput from 'components/TextInput';

import { AddressFormData } from 'models/Address';

import * as S from './styles';

type AddressFormProps = {
  jotaiState: PrimitiveAtom<AddressFormData>;
};

const AddressForm: React.ForwardRefRenderFunction<
  FormHandles,
  AddressFormProps
> = ({ jotaiState }, ref) => {
  const [state, setState] = useAtom(jotaiState);

  return (
    <S.Wrapper>
      <S.SectionTitle>
        <h4>Endereço</h4>
        <S.Form
          initialData={state}
          onSubmit={(values) => setState(values)}
          ref={ref}
        >
          <TextInput name="street" label="Logradouro" />
          <TextInput name="house_number" label="Número" />
          <TextInput name="city" label="Cidade" />
          <TextInput name="district" label="Bairro" />
          <TextInput name="region" label="Regiao" />
        </S.Form>
      </S.SectionTitle>
    </S.Wrapper>
  );
};

export default forwardRef(AddressForm);
