import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle } from '@styled-icons/feather';
import { useQuery } from 'react-query';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';
import AddUserModal, { ModalRef } from 'components/AddUserModal';

import { FormattedUser } from 'models/User';
import { listUsers } from 'requests/queries/users';

import * as S from './styles';

const Users = () => {
  const [session] = useSession();

  const { data } = useQuery<FormattedUser[]>('get-users', () =>
    listUsers(session)
  );

  const modalRef = useRef<ModalRef>(null);

  const handleOpenModal = () => {
    modalRef.current?.openModal();
  };

  return (
    <Base>
      <Heading>Usuários</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          icon={<PlusCircle />}
          onClick={handleOpenModal}
        >
          Adicionar Usuário
        </Button>
      </S.AddButtonContainer>

      <S.TableSection>
        <S.SectionTitle>
          <h4>Usuários</h4>
        </S.SectionTitle>

        <Table<FormattedUser>
          items={data || []}
          keyExtractor={(value) => value.id}
        >
          <TableColumn label="Nome" tableKey="username" />
          <TableColumn label="Login" tableKey="login" />
          <TableColumn
            label="Data de Criação"
            tableKey="formattedCreatedAt"
            contentAlign="center"
          />
          <TableColumn
            label="Data da última atualização"
            tableKey="formattedUpdatedAt"
            contentAlign="center"
          />
          <TableColumn label="Ações" tableKey="" contentAlign="center" />
        </Table>
      </S.TableSection>
      <AddUserModal ref={modalRef} />
    </Base>
  );
};

export default Users;
