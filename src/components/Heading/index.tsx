import * as S from './styles';

export type HeadingProps = {
  children: React.ReactNode;
};

const Heading = ({ children }: HeadingProps): JSX.Element => (
  <S.Wrapper>{children}</S.Wrapper>
);

export default Heading;
