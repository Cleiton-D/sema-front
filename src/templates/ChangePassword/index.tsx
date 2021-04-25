import { useSession } from 'next-auth/client';
import Image from 'next/image';

import Heading from 'components/Heading';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

import * as S from './styles';

const ChangePassword = () => {
  const [session] = useSession();

  return (
    <S.Wrapper>
      <S.Content>
        <S.UserContent>
          <Heading>Criar senha</Heading>
          <S.UserImageContainer>
            <Image
              src="/img/fry.jpg"
              layout="fill"
              objectFit="cover"
              quality={80}
              sizes="80px"
              alt={session?.user.name || undefined}
            />
          </S.UserImageContainer>
          <span>{session?.user.name}</span>
        </S.UserContent>

        <span>
          Olá {session?.user.name}, para acessar o portal você precisa criar uma
          nova senha!
        </span>

        <S.Form onSubmit={(values) => console.log(values)}>
          <TextInput
            name="newPassword"
            label="Digite sua nova senha"
            type="password"
          />
          <TextInput
            name="passwordConfirmation"
            label="Confirme sua nova senha"
            type="password"
          />
          <Button styleType="normal" size="large">
            Salvar senha
          </Button>
        </S.Form>
      </S.Content>
    </S.Wrapper>
  );
};

export default ChangePassword;
