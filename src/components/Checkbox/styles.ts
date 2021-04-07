import styled, { css } from 'styled-components';
import { CheckboxProps } from '.';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

type InputProps = Pick<CheckboxProps, 'inactive'>;

export const Input = styled.input<InputProps>`
  ${({ theme, inactive }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    width: 1.8rem;
    height: 1.8rem;
    border: 0.1rem solid ${theme.colors.primary};
    border-radius: 0.5rem;
    position: relative;
    outline: none;
    transition: all 0.2s ease-out;

    ${inactive &&
    css`
      border: 0.1rem solid ${theme.colors.lightGray};
    `}

    &::before {
      content: '';
      width: 0.6rem;
      height: 0.9rem;
      border: 0.2rem solid ${theme.colors.white};
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg);
      position: absolute;
      top: 0.1rem;
      opacity: 0;
    }

    &:focus {
      box-shadow: 0 0 0.1rem ${theme.colors.primary};
    }

    &:checked {
      background: ${theme.colors.primary};
      border-width: 0.2rem;
      &::before {
        opacity: 1;
      }
    }
    &:disabled {
      opacity: 0.6;
    }
  `}
`;

export const Label = styled.label<Pick<CheckboxProps, 'labelColor'>>`
  ${({ theme, labelColor }) => css`
    cursor: pointer;
    padding-left: ${theme.spacings.xxsmall};
    color: ${theme.colors[labelColor!]};
    line-height: 1.8rem;
  `}
`;
