import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { PlusCircle, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';
import ClassroomModal, { ClassroomModalRef } from 'components/ClassroomModal';

import { Classroom } from 'models/Classroom';

import { useListClassrooms } from 'requests/queries/classrooms';
import { useDeleteClassroom } from 'requests/mutations/classroom';

import { translateDescription } from 'utils/mappers/classPeriodMapper';

import * as S from './styles';

const Classrooms = () => {
  const modalRef = useRef<ClassroomModalRef>(null);

  const { query } = useRouter();

  const [session] = useSession();

  const {
    data: classrooms,
    key,
    queryAddMutation,
    queryRemoveMutation
  } = useListClassrooms(session, {
    school_id: query.school_id as string
  });

  const deleteClassroomMutation = useDeleteClassroom({
    [key]: queryRemoveMutation
  });

  const handleAddClassroom = () => {
    modalRef.current?.openModal();
  };

  const handleDeleteClassroom = (classroom: Classroom) => {
    const confirmation = window.confirm(
      `Deseja apagar a turma ${classroom.description}?`
    );
    if (confirmation) {
      deleteClassroomMutation.mutate(classroom);
    }
  };

  return (
    <Base>
      <Heading>Turmas</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          size="medium"
          icon={<PlusCircle />}
          onClick={handleAddClassroom}
        >
          Adicionar Turma
        </Button>
      </S.AddButtonContainer>
      <S.TableSection>
        <S.SectionTitle>
          <h4>Turmas</h4>
        </S.SectionTitle>
        <Table<Classroom>
          items={classrooms || []}
          keyExtractor={(item) => item.id}
        >
          <TableColumn label="Descrição" tableKey="description" />
          <TableColumn
            label="Série"
            tableKey="grade"
            render={(grade) => grade.description}
          />
          <TableColumn
            label="Período"
            tableKey="class_period"
            render={(class_period) =>
              translateDescription(class_period.description)
            }
          />
          <TableColumn
            label="Matriculas ativas"
            tableKey="enroll_count"
            contentAlign="center"
          />
          <TableColumn
            label="Ações"
            tableKey="id"
            contentAlign="center"
            actionColumn
            render={(classroom) => (
              <S.ActionButtons>
                <S.ActionDeleteButton
                  type="button"
                  title={`Excluir a turma ${classroom.description}`}
                  onClick={() => handleDeleteClassroom(classroom)}
                >
                  <X />
                </S.ActionDeleteButton>
              </S.ActionButtons>
            )}
          />
        </Table>
      </S.TableSection>
      <ClassroomModal
        ref={modalRef}
        createQueries={{ [key]: queryAddMutation }}
      />
    </Base>
  );
};

export default Classrooms;

// class_period_id: "0997cb3f-f7df-4b59-9080-5f1c04536d2c"
// created_at: "2021-06-03T01:41:44.232Z"
// deleted_at: null
// description: "teste"
// grade_id: "b523dcc0-1e95-44fc-ad78-4e45d58e934b"
// id: "bbb30117-f7bf-4466-8636-9705edeb75b2"
// school_id: "a5fd4e15-e03a-4398-a003-9949250f93f2"
// school_year_id: "2cb411c9-e95a-4287-86ed-7ab252cb00c9"
// updated_at: "2021-06-03T01:41:44.232Z"
