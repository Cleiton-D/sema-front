import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import * as S from './styles';

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  return (
    <S.Wrapper>
      <Header />
      <Sidebar />
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

export default Base;
