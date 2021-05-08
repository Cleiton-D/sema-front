import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { PlusCircle } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';
import Button from 'components/Button';

import { SchoolWithEnrollCount } from 'models/School';
import { useListSchools } from 'requests/queries/schools';

import * as S from './styles';

const Schools = () => {
  const [session] = useSession();
  const { data } = useListSchools(session);

  const { push } = useRouter();

  const handleNewSchool = () => {
    push('/administration/schools/new');
  };

  return (
    <Base>
      <Heading>Escolas</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          icon={<PlusCircle />}
          onClick={handleNewSchool}
        >
          Adicionar Escola
        </Button>
      </S.AddButtonContainer>
      <S.TableSection>
        <S.SectionTitle>
          <h4>Escolas</h4>
        </S.SectionTitle>
        <Table<SchoolWithEnrollCount>
          items={data || []}
          keyExtractor={(item) => item.id}
        >
          <TableColumn label="Nome" tableKey="name" />
          <TableColumn label="INEP" tableKey="inep_code" />
          <TableColumn
            label="Matrículas ativas"
            tableKey="enroll_count"
            contentAlign="center"
          />
        </Table>
      </S.TableSection>
    </Base>
  );
};

export default Schools;
