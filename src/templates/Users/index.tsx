import { useSession } from 'next-auth/client';
import { PlusCircle } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';

import { User as UserType, FormattedUser } from 'models/User';

import { useUsers } from './hooks/useUsers';

import * as S from './styles';

export type UsersProps = {
  users: UserType[];
};

const Users = ({ users: ssrUsers }: UsersProps) => {
  const [session] = useSession();
  const { data } = useUsers({ initialData: ssrUsers, session });

  return (
    <Base>
      <Heading>Usuários</Heading>
      <S.AddButtonContainer>
        <Button styleType="normal" icon={<PlusCircle />}>
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
    </Base>
  );
};

export default Users;
