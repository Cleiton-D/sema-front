import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/TableColumn';
import AddGradeModal, { ModalRef } from 'components/AddGradeModal';

import { useListGrades } from 'requests/queries/grades';
import { useDeleteGradeMutation } from 'requests/mutations/grades';

import * as S from './styles';

const Grades = () => {
  const [session] = useSession();
  const { data } = useListGrades(session);

  const mutation = useDeleteGradeMutation(session);

  const modalRef = useRef<ModalRef>(null);
  const handleOpenModal = () => {
    modalRef.current?.openModal();
  };

  return (
    <Base>
      <Heading>Séries</Heading>
      <S.AddButtonContainer>
        <Button
          styleType="normal"
          icon={<PlusCircle />}
          onClick={handleOpenModal}
        >
          Adicionar Série
        </Button>
      </S.AddButtonContainer>

      <S.TableSection>
        <S.SectionTitle>
          <h4>Séries</h4>
        </S.SectionTitle>
      </S.TableSection>
      <Table items={data || []} keyExtractor={(value) => value.id}>
        <TableColumn label="Nome" tableKey="description" />
        <TableColumn
          label="Ações"
          tableKey="id"
          contentAlign="center"
          actionColumn
          render={(grade) => (
            <S.ActionButton
              type="button"
              title={`Remover ${grade.description}`}
              onClick={() => mutation.mutate(grade)}
            >
              <X size={20} />
            </S.ActionButton>
          )}
        />
      </Table>
      <AddGradeModal ref={modalRef} />
    </Base>
  );
};

export default Grades;
