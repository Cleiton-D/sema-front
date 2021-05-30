import { useState, useImperativeHandle, forwardRef } from 'react';
import { useSession } from 'next-auth/client';
import { useAtomValue } from 'jotai/utils';
import { X } from '@styled-icons/feather';

import GradeSchoolSubjectsCard from 'components/GradeSchoolSubjectsCard';

import { Grade } from 'models/Grade';
import { FormHandles } from 'models/Form';

import { useListGrades } from 'requests/queries/grades';
import { useDeleteGradeMutation } from 'requests/mutations/grades';

import { schoolYearAtom } from 'store/atoms/school-year';

import * as S from './styles';

const GradeSchoolSubjectsForm: React.ForwardRefRenderFunction<FormHandles> = (
  _,
  ref
) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>();

  const schoolYearAtomValue = useAtomValue(schoolYearAtom);

  const [session] = useSession();

  const { data: grades } = useListGrades(session);
  const deleteGrade = useDeleteGradeMutation(session);

  const handleSelectGrade = (grade: Grade) => {
    if (selectedGrade?.id === grade.id) {
      setSelectedGrade(undefined);
    } else {
      setSelectedGrade(grade);
    }
  };

  const handleDeleteGrade = (event: React.MouseEvent, grade: Grade) => {
    event.stopPropagation();

    const confirm = window.confirm(`Deseja apagar ${grade.description}?`);
    if (confirm) {
      deleteGrade.mutate(grade);
    }
  };

  const submitForm = async () => {
    console.log('Sending form...');
  };

  useImperativeHandle(ref, () => ({ submitForm }));

  return (
    <>
      <S.Content>
        <S.Wrapper>
          <S.TableSection>
            <S.SectionTitle>
              <h4>Séries</h4>
            </S.SectionTitle>
            <S.List>
              {grades?.map((grade) => (
                <S.ListItem
                  key={grade.id}
                  highlightOnHover
                  onClick={() => handleSelectGrade(grade)}
                  selected={selectedGrade?.id === grade.id}
                >
                  <span>{grade.description}</span>
                  <S.ActionButton
                    onClick={(event) => handleDeleteGrade(event, grade)}
                  >
                    <X />
                  </S.ActionButton>
                </S.ListItem>
              ))}
            </S.List>
          </S.TableSection>
        </S.Wrapper>

        <S.GradeSchoolSubjectsCardContainer>
          <GradeSchoolSubjectsCard
            gradeId={selectedGrade?.id}
            schoolYearId={schoolYearAtomValue?.schoolYear.id}
          />
        </S.GradeSchoolSubjectsCardContainer>
      </S.Content>
      <S.Overlay
        active={!!selectedGrade}
        onClick={() => setSelectedGrade(undefined)}
      />
    </>
  );
};

export default forwardRef(GradeSchoolSubjectsForm);
