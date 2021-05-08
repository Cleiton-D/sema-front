import { useSession } from 'next-auth/client';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';

import { useListClassPeriods } from 'requests/queries/class-periods';
import { FormattedClassPeriod } from 'models/ClassPeriod';

import * as S from './styles';

const ClassPeriods = () => {
  const [session] = useSession();

  const { data } = useListClassPeriods(session);

  return (
    <Base>
      <Heading>Períodos e Horários</Heading>
      <S.TableSection>
        <S.SectionTitle>
          <h4>Períodos</h4>
        </S.SectionTitle>
        <Table<FormattedClassPeriod>
          items={data || []}
          keyExtractor={(value) => value.id}
        >
          <TableColumn label="Descrição" tableKey="translated_description" />
          <TableColumn
            label="Início"
            tableKey="time_start"
            contentAlign="center"
          />
          <TableColumn label="Fim" tableKey="time_end" contentAlign="center" />
          <TableColumn
            label="Duração das aulas"
            tableKey="class_time"
            contentAlign="center"
          />
          <TableColumn
            label="Duração do intervalo"
            tableKey="break_time"
            contentAlign="center"
          />
          <TableColumn
            label="Horário do intervalo"
            tableKey="break_time_start"
            contentAlign="center"
          />
        </Table>
      </S.TableSection>
    </Base>
  );
};

export default ClassPeriods;
