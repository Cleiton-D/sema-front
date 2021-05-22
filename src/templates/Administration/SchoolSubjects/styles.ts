import styled, { css } from 'styled-components';
import { darken } from 'polished';

import SectionContent from 'components/SectionContent';
import ListItem from 'components/ListItem';

export const AddButtonContainer = styled.div`
  width: 19rem;
  align-self: flex-end;
`;

export const CardSchoolSubjects = styled(SectionContent).attrs({ as: 'ul' })`
  ${({ theme }) => css`
    width: 37vw;
    height: max(50vh, 100%);
    list-style: none;
    padding: ${theme.spacings.xsmall} !important;
  `}
`;

export const SchoolSubjectItem = styled(ListItem)`
  justify-content: space-between;
`;

export const NameSchoolSubject = styled.span`
  ${({ theme }) => css`
    margin-left: 2rem;
    line-height: 2.4rem;
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
  `}
`;

export const ActionEditButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: ${theme.colors.primary};
    height: 3rem;
    width: 3rem;
    border: 0;
    border-radius: 50%;
    outline: 0;
    transition: background 0.3s ease;

    svg {
      width: 1.8rem;
      stroke-width: 2;
    }

    &:hover {
      background: ${darken(0.05, theme.colors.white)};
    }
  `}
`;

export const ActionDeleteButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 3rem;
    border: 0;
    outline: 0;
    stroke-width: 2;
    color: ${theme.colors.red};
    padding: 0.4rem;
    transition: background 0.3s ease;

    &:hover {
      background: ${darken(0.05, theme.colors.white)};
    }
  `}
`;
