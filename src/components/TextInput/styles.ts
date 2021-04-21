import styled, { css, DefaultTheme } from 'styled-components';
import { InputAs } from '.';

type WrapperProps = {
  inputAs: InputAs;
};

const wrapperModifiers = {
  input: () => css`
    height: 4rem;
  `,
  textarea: () => css`
    max-height: 40rem;
  `
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ inputAs }) => css`
    position: relative;
    line-height: 1.2rem;
    width: 100%;

    ${wrapperModifiers[inputAs]}
  `}
`;

const labelModifiers = {
  inFocusOrValue: (theme: DefaultTheme) => css`
    box-shadow: inset 0rem 0rem 0rem 0.2rem ${theme.colors.primary};

    span {
      top: 0;
      transform: translateY(-50%);
      left: 0.8rem;
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.primary};
    }
  `,
  input: () => css`
    top: 50%;
    transform: translateY(-50%);
  `,
  textarea: () => css`
    top: 0.5rem;
    transform: translateY(50%);
  `
};

type LabelProps = {
  hasValue: boolean;
  inputAs: InputAs;
};

export const Label = styled.label<LabelProps>`
  ${({ theme, hasValue, inputAs }) => css`
    display: block;
    cursor: text;
    width: 100%;
    height: 100%;
    max-height: inherit;
    transition: all 0.3s ease;
    border-radius: 0.5rem;
    box-shadow: inset 0rem 0rem 0rem 0.1rem ${theme.colors.lightSilver};

    span {
      padding: 0 0.3rem;
      position: absolute;
      left: 1rem;
      background: ${theme.colors.white};
      font-size: ${theme.font.sizes.small};
      transition: all 0.15s ease-out;
      color: ${theme.colors.lightSilver};

      ${labelModifiers[inputAs]}
    }

    ${hasValue && labelModifiers.inFocusOrValue(theme)}

    &:hover {
      box-shadow: inset 0rem 0rem 0rem 0.1rem ${theme.colors.primary};
    }

    &:focus-within {
      ${labelModifiers.inFocusOrValue(theme)}
    }
  `}
`;

const TextArea = (theme: DefaultTheme) => css`
  padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
`;

export const Input = styled.input`
  ${({ theme }) => css`
    &:not(input) {
      ${TextArea(theme)}
    }

    background: transparent;
    border: none;
    outline: 0;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    max-height: inherit;
    padding: 0 ${theme.spacings.xsmall};
    font-size: ${theme.font.sizes.small};
    font-family: ${theme.font.poppins};
    color: ${theme.colors.black};
  `}
`;

export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.red};
  `}
`;
