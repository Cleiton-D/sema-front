import styled, { css, DefaultTheme } from 'styled-components';

import { BadgeProps } from './';

export type WrapperProps = Pick<BadgeProps, 'styledType'>;

const wrapperModifiers = {
  green: (theme: DefaultTheme) => css`
    border: 0.1rem solid ${theme.background.secondary};
    color: ${theme.colors.secondary};
    border-radius: ${theme.border.rounded};
  `,
  blue: (theme: DefaultTheme) => css`
    border: 0.1rem solid ${theme.background.primary};
    color: ${theme.colors.primary};
    border-radius: ${theme.border.rounded};
  `,
  orange: (theme: DefaultTheme) => css`
    background: #f4da85;
    color: #50605c;
    border-radius: ${theme.border.rounded};
  `,
  red: (theme: DefaultTheme) => css`
    background: #ee4c4c;
    color: ${theme.colors.white};
    border-radius: ${theme.border.rounded};
  `
};

export const Wrapper = styled.h1<WrapperProps>`
  ${({ theme, styledType }) => css`
    display: inline-block;
    padding: 0.8rem 2rem;
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
    font-style: normal;
    line-height: 1rem;
    text-align: center;

    ${!!styledType && wrapperModifiers[styledType](theme)}
  `}
`;
