import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { StyledIconProps } from '@styled-icons/styled-icon';

import * as S from './styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: React.ComponentType<StyledIconProps>;
  as?: React.ElementType;
  styleType: 'normal' | 'rounded' | 'outlined';
} & ButtonTypes;

const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    icon: Icon,
    size = 'large',
    fullWidth = false,
    styleType = 'normal',
    ...props
  },
  ref
) => (
  <S.Wrapper
    size={size}
    fullWidth={fullWidth}
    hasIcon={!!Icon}
    ref={ref}
    styleType={styleType}
    {...props}
  >
    {!!Icon && <Icon data-testid="icon" />}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default forwardRef(Button);
