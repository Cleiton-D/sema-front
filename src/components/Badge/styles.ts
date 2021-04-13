import styled, { css, DefaultTheme } from 'styled-components';

import { BadgeProps } from './';

export type WrapperProps = Pick<BadgeProps, 'styledType'>;

const wrapperModifiers = {
  green: (theme: DefaultTheme) => css`
    border: 0.1rem solid ${theme.colors.secondary};
    color: ${theme.colors.secondary};
    border-radius: 10rem;
  `,
  blue: (theme: DefaultTheme) => css`
    border: 0.1rem solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    border-radius: 10rem;
  `,
  orange: () => css`
    background: #f4da85;
    color: #50605c;
    border-radius: 10rem;
  `,
  red: (theme: DefaultTheme) => css`
    background: #ee4c4c;
    color: ${theme.colors.white};
    border-radius: 10rem;
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
