import styled, { css } from 'styled-components';
import { Form as Unform } from '@unform/web';

import * as InputStyles from 'components/TextInput/styles';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall};
    width: 100%;
    min-width: 50rem;
  `}
`;

export const Form = styled(Unform)`
  ${({ theme }) => css`
    ${InputStyles.Wrapper} {
      margin-bottom: ${theme.spacings.small};

      &:last-of-type {
        margin-bottom: ${theme.spacings.large};
      }
    }
  `}
`;

export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;

    button {
      width: 16rem;

      & + button {
        margin-left: ${theme.spacings.xsmall};
      }
    }
  `}
`;
