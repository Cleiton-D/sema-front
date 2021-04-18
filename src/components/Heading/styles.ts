import styled, { css } from 'styled-components';

export const Wrapper = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xxlarge};
  `}
`;
