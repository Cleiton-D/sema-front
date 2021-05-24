import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
import AddGradeModal, { ModalRef } from 'components/AddGradeModal';

import { Grade } from 'models/Grade';

import { useListGrades } from 'requests/queries/grades';
import { useDeleteGradeMutation } from 'requests/mutations/grades';

import * as S from './styles';

const Grades = () => {
  const [session] = useSession();
  const { data } = useListGrades(session);

  const mutation = useDeleteGradeMutation(session);
  const handleDelete = (grade: Grade) => {
    const confirmation = window.confirm(
      `Deseja excluir a série ${grade.description}?`
    );
    if (confirmation) {
      mutation.mutate(grade);
    }
  };

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
      <div>
        <S.CardGrades>
          {data?.map((item) => (
            <S.GradeItem key={item.id} highlightOnHover>
              <S.NameGrade>{item.description}</S.NameGrade>
              <S.ActionDeleteButton
                type="button"
                title={`Remover ${item.description}`}
                onClick={() => handleDelete(item)}
              >
                <X />
              </S.ActionDeleteButton>
            </S.GradeItem>
          ))}
        </S.CardGrades>
      </div>
      <AddGradeModal ref={modalRef} />
    </Base>
  );
};

export default Grades;
