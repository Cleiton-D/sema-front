import Link from 'next/link';

import * as S from './styles';

export type CardProps = {
  children: string;
  description: string;
  icon?: React.ReactNode;
  link: string;
};

const Card = ({ children, description, icon, link }: CardProps) => (
  <S.Wrapper>
    <S.Content hasIcon={!!icon}>
      {!!icon && icon}
      {!!children && <S.Text>{children}</S.Text>}
      <S.Description>{description}</S.Description>
    </S.Content>
    <Link href={link} passHref>
      <S.Link>
        acessar <S.ArrowIcon />
      </S.Link>
    </Link>
  </S.Wrapper>
);

export default Card;
