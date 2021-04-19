import * as S from './styles';

export type SectionContentProps = {
  children: React.ReactNode;
};

const SectionContent = ({ children }: SectionContentProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default SectionContent;
