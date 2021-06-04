import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { Edit3 } from '@styled-icons/feather';

import Base from 'templates/Base';

import Heading from 'components/Heading';
import Button from 'components/Button';

import { useGetSchoolDetail } from 'requests/queries/schools';

import { translateContactType } from 'utils/mappers/contactsMapper';

import * as S from './styles';

const School = () => {
  const [session] = useSession();
  const { query } = useRouter();

  const { data: school } = useGetSchoolDetail(
    query.school_id as string,
    session
  );

  return (
    <Base>
      <Heading>Escola</Heading>
      <S.AddButtonContainer>
        <Link href={`/school/${query.school_id}/edit`} passHref>
          <Button as="a" size="medium" styleType="normal" icon={<Edit3 />}>
            Alterar dados
          </Button>
        </Link>
      </S.AddButtonContainer>

      <S.Wrapper>
        <div>
          <S.SchoolName size="md" color="primary">
            {school?.name}
          </S.SchoolName>
          <S.LightText>Código do INEP: {school?.inep_code}</S.LightText>
        </div>
        <S.Details>
          <S.Grid>
            <Link href={`/school/${query.school_id}/enrolls`}>
              <S.LinkGridItem>
                <strong>Alunos ativos</strong>
                <span>{school?.enroll_count}</span>
              </S.LinkGridItem>
            </Link>
            <Link href={`/school/${query.school_id}/classrooms`}>
              <S.LinkGridItem>
                <strong>Turmas</strong>
                <span>{school?.classrooms_count}</span>
              </S.LinkGridItem>
            </Link>
          </S.Grid>
          <S.Divider style={{ marginTop: 24 }} />
          <S.Section>
            <h2>Endereço</h2>
            <S.Grid>
              <S.GridItem>
                <strong>Logradouro</strong>
                <span>{school?.address.street}</span>
              </S.GridItem>

              <S.GridItem>
                <strong>Número</strong>
                <span>{school?.address.house_number}</span>
              </S.GridItem>

              <S.GridItem>
                <strong>Bairro</strong>
                <span>{school?.address.district}</span>
              </S.GridItem>

              <S.GridItem>
                <strong>Cidade</strong>
                <span>{school?.address.city}</span>
              </S.GridItem>

              <S.GridItem>
                <strong>Região</strong>
                <span>{school?.address.region}</span>
              </S.GridItem>
            </S.Grid>
          </S.Section>
          <S.Section style={{ marginTop: 24 }}>
            <h2>Contatos</h2>
          </S.Section>
          <S.Grid>
            {school?.contacts.map((contact) => (
              <S.GridItem key={contact.id}>
                <strong>{translateContactType(contact.type)}</strong>
                <span>{contact.description}</span>
              </S.GridItem>
            ))}
          </S.Grid>
        </S.Details>
      </S.Wrapper>
    </Base>
  );
};

export default School;
