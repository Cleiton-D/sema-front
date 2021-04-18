import styled, { css, DefaultTheme } from 'styled-components';

import { CardProps } from '.';

export type WrapperProps = {
  hasIcon: boolean;
} & Pick<CardProps, 'fullWidth'>;

const wrapperModifiers = {
  fullWidth: () => css`
    width: 100%;
  `,
  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.2rem;
      color: ${theme.colors.primary};
      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `
};
export const Text = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.inter};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.primary};
    text-align: left;
    padding-left: 0.3rem;
  `}
`;

export const Description = styled.h4`
  ${({ theme }) => css`
    font-family: ${theme.font.inter};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.silver};
    padding-left: 0.3rem;
    padding-bottom: 0.3rem;
  `}
`;

export const Divider = styled.div`
  ${({ theme }) => css`
    border: 0.00675rem solid ${theme.colors.lightSilver};
  `}
`;

export const Link = styled.a`
  ${({ theme }) => css`
    font-family: ${theme.font.inter};
    font-style: ${theme.font.normal};
    font-weight: ${theme.font.normal};
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.primary};
    text-decoration: none;
    padding: 0.5rem;
    text-align: center;
  `}
`;

export const Card = styled.div<WrapperProps>`
  ${({ theme, fullWidth, hasIcon }) => css`
    display: flex;
    flex-direction: column;
    height: 8.3125rem;
    width: 13.125rem;
    padding: 1rem 1rem;
    background: ${theme.colors.white};
    box-shadow: 0px 0px 4px rgba(51, 73, 77, 0.3);
    border-radius: ${theme.border.radius};

    ${!!fullWidth && wrapperModifiers.fullWidth()};
    ${!!hasIcon && wrapperModifiers.withIcon(theme)};
  `}
`;
