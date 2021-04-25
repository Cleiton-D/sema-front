import UserDropdown from 'components/UserDropdown';

import * as S from './styles';

const Header = () => {
  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <span>Perfil:</span>
        <p>Professor - Escola Municipal Cecília Meireles</p>
      </S.ProfileContainer>
      <div>
        <UserDropdown username="Cleiton" image="/img/fry.jpg" />
      </div>
    </S.Wrapper>
  );
};

export default Header;
