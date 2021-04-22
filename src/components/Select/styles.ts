import styled, { css, DefaultTheme } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 5rem;
  width: 100%;
`;

const labelModifiers = {
  inFocusOrValue: (theme: DefaultTheme) => css`
    box-shadow: inset 0rem 0rem 0rem 0.2rem ${theme.colors.primary};

    span {
      top: 0;
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.primary};
    }
  `
};

type LabelProps = {
  hasValue: boolean;
};

export const Label = styled.label<LabelProps>`
  ${({ theme, hasValue }) => css`
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: inset 0rem 0rem 0rem 0.1rem ${theme.colors.lightSilver};

    span {
      position: absolute;
      padding: 0 0.3rem;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.lightSilver};
      background: ${theme.colors.white};
      transition: all 0.15s ease-out;
    }

    ${hasValue && labelModifiers.inFocusOrValue(theme)}

    &:focus-within {
      ${labelModifiers.inFocusOrValue(theme)}
    }
  `}
`;

export const Input = styled.select`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    border: none;
    outline: 0;
    background: transparent;
    appearance: none;
    cursor: pointer;
    padding: 0 ${theme.spacings.xsmall};
    font-family: ${theme.font.poppins};
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
  `}
`;
