import styled, { css, DefaultTheme } from 'styled-components';

import { columnFixedModifier } from 'components/TableColumn/styles';

const wrapperModifiers = {
  minimal: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: #545f6a;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
  `
};

type WrapperProps = {
  position: number;
  fixed?: boolean;
  minimal: boolean;
  contentAlign?: 'left' | 'center' | 'right';
};
export const Wrapper = styled.td<WrapperProps>`
  ${({ theme, fixed, position, minimal, contentAlign = 'left' }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.silver};
    padding: ${theme.spacings.xxsmall} 0;
    border-bottom: 0.1rem solid ${theme.colors.lightSilver};
    padding: ${theme.spacings.xsmall};
    background: ${theme.colors.white};
    text-align: ${contentAlign};

    ${!!fixed && columnFixedModifier(theme, position)}
    ${!!minimal && wrapperModifiers.minimal(theme)}
  `}
`;

export const ExpandButton = styled.button`
  background: none;
  border: none;
  outline: 0;
  font: inherit;
`;
