import styled, { css } from 'styled-components';
import { Form as Unform } from '@unform/web';

import SectionContent from 'components/SectionContent';
import * as InputStyles from 'components/TextInput/styles';
import * as HeadingStyles from 'components/Heading/styles';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: ${theme.colors.mainBg};
    color: ${theme.colors.gray};
  `}
`;

export const Content = styled(SectionContent)`
  ${({ theme }) => css`
    max-width: 55rem !important;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 0rem 0rem 1rem ${theme.colors.lightGray};

    padding: ${theme.spacings.small};
    padding-top: ${theme.spacings.xxsmall};

    ${HeadingStyles.Wrapper} {
      margin-bottom: ${theme.spacings.xsmall};
    }
  `}
`;

export const UserContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: ${theme.spacings.small};

    span {
      color: ${theme.colors.silver};
    }
  `}
`;

export const UserImageContainer = styled.div`
  ${({ theme }) => css`
    width: 8rem;
    height: 8rem;
    position: relative;
    border-radius: 50%;
    box-shadow: 0rem 0rem 0.2rem ${theme.colors.gray};

    img {
      border-radius: 50%;
    }
  `}
`;

export const Form = styled(Unform)`
  ${({ theme }) => css`
    width: 100%;
    margin-top: ${theme.spacings.small};

    ${InputStyles.Wrapper} {
      margin-bottom: ${theme.spacings.small};

      &:last-of-type {
        margin-bottom: ${theme.spacings.large};
      }
    }
  `}
`;
