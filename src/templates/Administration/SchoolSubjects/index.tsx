import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle, Edit, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import TableColumn from 'components/TableColumn';
import Table from 'components/Table';
import AddSchoolSubjectModal, {
  SchoolSubjectModalRef
} from 'components/AddSchoolSubjectModal';

import { SchoolSubject } from 'models/SchoolSubject';

import { useListSchoolsSubjects } from 'requests/queries/school-subjects';
import { useDeleteSchoolSubjectMutation } from 'requests/mutations/school-subjects';

import * as S from './styles';

const SchoolSubjects = () => {
  const [session] = useSession();
  const { data } = useListSchoolsSubjects(session);

  const modalRef = useRef<SchoolSubjectModalRef>(null);
  const handleOpenModal = () => {
    modalRef.current?.openModal();
  };

  const mutation = useDeleteSchoolSubjectMutation(session);
  const handleDelete = (schoolSubject: SchoolSubject) => {
    const confirmation = window.confirm(
      `Deseja excluir a disciplina ${schoolSubject.description}?`
    );
    if (confirmation) {
      mutation.mutate(schoolSubject);
    }
  };

  return (
    <Base>
      <Heading>Disciplinas</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          size="medium"
          icon={<PlusCircle />}
          onClick={handleOpenModal}
        >
          Adicionar Disciplinas
        </Button>
      </S.AddButtonContainer>

      <S.TableSection>
        <S.SectionTitle>
          <h4>Disciplinas</h4>
        </S.SectionTitle>
      </S.TableSection>
      <Table items={data || []} keyExtractor={(item) => item.id}>
        <TableColumn label="Nome" tableKey="description" />
        <TableColumn
          label="Descrição da disciplina"
          tableKey="additional_description"
        />
        <TableColumn
          label="Ações"
          tableKey="id"
          contentAlign="center"
          actionColumn
          render={(schoolSubject) => (
            <S.ActionButtons>
              <S.ActionEditButton
                type="button"
                title={`Remover ${schoolSubject.description}`}
                onClick={() => modalRef.current?.openModal(schoolSubject)}
              >
                <Edit
                  title={`Alterar a disciplina ${schoolSubject.description}`}
                />
              </S.ActionEditButton>
              <S.ActionDeleteButton
                type="button"
                title={`Remover a disciplina ${schoolSubject.description}`}
                onClick={() => handleDelete(schoolSubject)}
              >
                <X />
              </S.ActionDeleteButton>
            </S.ActionButtons>
          )}
        />
      </Table>
      <AddSchoolSubjectModal ref={modalRef} />
    </Base>
  );
};

export default SchoolSubjects;
