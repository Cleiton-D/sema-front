import Link from 'next/link';
import { useRouter } from 'next/router';
import { PlusCircle } from '@styled-icons/feather';
import { useSession } from 'next-auth/client';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';

import { Enroll } from 'models/Enroll';

import { useListEnrolls } from 'requests/queries/enrolls';

import { translateStatus } from 'utils/translateStatus';

import * as S from './styles';

const Enrolls = () => {
  const { query } = useRouter();

  const [session] = useSession();
  const { data: enrolls } = useListEnrolls(session, {
    school_id: query.school_id as string
  });

  return (
    <Base>
      <Heading>Matrículas</Heading>
      <S.AddButtonContainer>
        <Link href={`/school/${query.school_id}/enrolls/new`} passHref>
          <Button styleType="normal" size="medium" icon={<PlusCircle />} as="a">
            Nova matrícula
          </Button>
        </Link>
      </S.AddButtonContainer>
      <S.TableSection>
        <S.SectionTitle>
          <h4>Matrículas</h4>
        </S.SectionTitle>
        <Table<Enroll> items={enrolls || []} keyExtractor={(value) => value.id}>
          <TableColumn label="Nome" tableKey="person.name" />
          <TableColumn
            label="Situação"
            tableKey="status"
            render={(status) => translateStatus(status)}
          />
          <TableColumn label="Turma" tableKey="current_classroom.description" />
        </Table>
      </S.TableSection>
    </Base>
  );
};

export default Enrolls;
