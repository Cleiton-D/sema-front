import styled, { css } from 'styled-components';

import Heading from 'components/Heading';
import SectionContent from 'components/SectionContent';

export const Wrapper = styled(SectionContent)`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};
    padding: ${theme.spacings.xsmall} !important;
  `}
`;

export const AddButtonContainer = styled.div`
  width: 20rem;
  align-self: flex-end;
`;

export const LightText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: ${theme.font.light};
  `}
`;

export const SchoolName = styled(Heading)`
  text-transform: uppercase;
`;

export const Details = styled.article`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
  `}
`;

type GridProps = {
  rows?: number;
};
export const Grid = styled.div<GridProps>`
  ${({ rows }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-template-rows: ${rows ? `repeat(${rows}, 1fr)` : 'auto'};
    grid-gap: 2rem;
  `}
`;

export const GridItem = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    font-size: ${theme.font.sizes.small};

    > strong {
      color: ${theme.colors.lightSilver};
      font-weight: ${theme.font.normal};
      margin-bottom: ${theme.spacings.xxsmall};
    }

    > span {
      color: #7b7f80;
    }
  `}
`;

export const LinkGridItem = styled(GridItem)`
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Section = styled.section`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};

    > h2 {
      font-family: ${theme.font.poppins};
      font-size: ${theme.font.sizes.medium};
      font-weight: ${theme.font.medium};
      color: #7b7f80;
    }
  `}
`;

export const Divider = styled.hr`
  ${({ theme }) => css`
    width: 75%;
    appearance: none;
    content: '';
    display: block;
    box-shadow: 0rem 0rem 0rem 0.05rem ${theme.colors.lightSilver};
    border: none;
  `}
`;
