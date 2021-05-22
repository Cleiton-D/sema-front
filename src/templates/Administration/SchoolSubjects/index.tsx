import { useRef } from 'react';
import { useSession } from 'next-auth/client';
import { PlusCircle, Edit, X } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';
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
      <div>
        <S.CardSchoolSubjects>
          {data?.map((item) => (
            <S.SchoolSubjectItem key={item.id} highlightOnHover>
              <S.NameSchoolSubject>{item.description}</S.NameSchoolSubject>
              <div style={{ display: 'flex' }}>
                <S.ActionEditButton
                  type="button"
                  title={`Alterar a disciplina ${item.description}`}
                  onClick={() => modalRef.current?.openModal(item)}
                >
                  <Edit title={`Alterar a disciplina ${item.description}`} />
                </S.ActionEditButton>
                <S.ActionDeleteButton
                  type="button"
                  title={`Remover ${item.description}`}
                  onClick={() => handleDelete(item)}
                >
                  <X />
                </S.ActionDeleteButton>
              </div>
            </S.SchoolSubjectItem>
          ))}
        </S.CardSchoolSubjects>
      </div>
      <AddSchoolSubjectModal ref={modalRef} />
    </Base>
  );
};

export default SchoolSubjects;
