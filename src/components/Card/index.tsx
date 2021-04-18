import * as S from './styles';

export type CardProps = {
  children: React.ReactNode;
  description: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

const Card = ({
  children,
  description,
  icon,
  fullWidth = false,
  ...props
}: CardProps) => (
  <S.Card hasIcon={!!icon} fullWidth={fullWidth} {...props}>
    {!!icon && icon}
    <S.Text>{children}</S.Text>
    <S.Description>{description}</S.Description>
    <S.Divider />
    <S.Link href="/">Acessar</S.Link>
  </S.Card>
);

export default Card;
