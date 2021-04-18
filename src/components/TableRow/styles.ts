import styled, { css, DefaultTheme } from 'styled-components';

export const Wrapper = styled.tr``;

const detailLineModifiers = {
  active: (theme: DefaultTheme) => css`
    > td > div {
      border-left: 5px solid ${theme.colors.secondary};
      visibility: visible;
      max-height: 40rem;
    }
  `
};

type DetailLineProps = {
  active: boolean;
};
export const DetailLine = styled.tr<DetailLineProps>`
  ${({ active, theme }) => css`
    > td {
      > div {
        border: none;
        border-color: ${theme.colors.secondary};
        visibility: hidden;
        overflow: auto;
        max-height: 0rem;
        transition: all 0.3s ease-out;
      }
    }

    ${!!active && detailLineModifiers.active(theme)}
  `}
`;
