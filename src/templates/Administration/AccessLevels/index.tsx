import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import AddAccessLevelModal, {
  AccessLevelModalRef
} from 'components/AddAccessLevelModal';

import { AccessLevel } from 'models/AccessLevel';

import { useListAccessLevels } from 'requests/queries/access-levels';
import { useDeleteAccessLevelMutation } from 'requests/mutations/access-levels';

import * as S from './styles';

const AccessLevels = () => {
  const [session] = useSession();
  const { data } = useListAccessLevels(session);

  const modalRef = useRef<AccessLevelModalRef>(null);
  const handleOpenModal = () => {
    modalRef.current?.openModal();
  };

  const mutation = useDeleteAccessLevelMutation(session);
  const handleDelete = (accessLevel: AccessLevel) => {
    const confirmation = window.confirm(
      `Deseja excluir o nível de acesso ${accessLevel.description}`
    );
    if (confirmation) {
      mutation.mutate(accessLevel);
    }
  };

  return (
    <Base>
      <Heading>Nível de Acesso</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          icon={<PlusCircle />}
          onClick={handleOpenModal}
        >
          Adicionar Nível de Acesso
        </Button>
      </S.AddButtonContainer>
      <div>
        <S.CardAccessLevels>
          {data?.map((item) => (
            <S.AccessLevelsItem key={item.id} highlightOnHover>
              <S.NameAccessLevels>{item.description}</S.NameAccessLevels>
              <S.ActionDeleteButton
                type="button"
                title={`Remover ${item.description}`}
                onClick={() => handleDelete(item)}
              >
                <X />
              </S.ActionDeleteButton>
            </S.AccessLevelsItem>
          ))}
        </S.CardAccessLevels>
      </div>
      <AddAccessLevelModal ref={modalRef} />
    </Base>
  );
};

export default AccessLevels;
