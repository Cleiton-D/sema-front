import { forwardRef, useRef } from 'react';
import { useAtom, PrimitiveAtom } from 'jotai';
import { PlusCircle, X } from '@styled-icons/feather';
import { v4 as uuidv4 } from 'uuid';

import * as S from './styles';

import { ModalRef } from 'components/Modal';
import AddContactModal from 'components/AddContactModal';

import { ContactFormData } from 'models/Contact';

type ContactsFormProps = {
  jotaiState: PrimitiveAtom<ContactFormData[]>;
};

type ContactsFormRef = {
  submitForm: () => void;
};

const ContactsForm: React.ForwardRefRenderFunction<
  ContactsFormRef,
  ContactsFormProps
> = ({ jotaiState }, _) => {
  const [state, setState] = useAtom(jotaiState);
  const modalRef = useRef<ModalRef>(null);

  const onSubmitModalForm = (values: Omit<ContactFormData, 'id'>) => {
    const item = { ...values, id: uuidv4() };
    setState((old) => [...old, item]);
  };

  const handleRemoveItem = (id: string) => {
    setState((old) => old.filter((item) => item.id !== id));
  };

  return (
    <S.Wrapper>
      <S.SectionTitle>
        <h4>Contatos</h4>
      </S.SectionTitle>

      <S.ContactsList>
        {state.map((item) => (
          <S.ContactItem key={item.id}>
            <div>
              <div>
                <strong>Tipo:</strong>
                <span>{item.type}</span>
              </div>
              <div>
                <strong>Contato:</strong>
                <span>{item.description}</span>
              </div>
            </div>

            <S.ActionButton
              type="button"
              onClick={() => handleRemoveItem(item.id)}
            >
              <X size={20} />
            </S.ActionButton>
          </S.ContactItem>
        ))}

        <S.AddNewItem onClick={() => modalRef.current?.openModal()}>
          <PlusCircle size={20} />
          Adicionar contato
        </S.AddNewItem>
      </S.ContactsList>

      <AddContactModal ref={modalRef} onSubmit={onSubmitModalForm} />
    </S.Wrapper>
  );
};

export default forwardRef(ContactsForm);
