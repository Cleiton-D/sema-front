import styled, { css } from 'styled-components';

export const Wrapper = styled.aside`
  ${({ theme }) => css`
    grid-area: sidebar;
    background: ${theme.colors.white};
    box-shadow: 0.2rem 0rem 0.5rem rgba(218, 222, 236, 0.5);
    text-align: center;
  `}
`;
