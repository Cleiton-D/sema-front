import styled, { css } from 'styled-components';

export const Wrapper = styled.tr``;

type DetailLineProps = {
  active: boolean;
};
export const DetailLine = styled.tr<DetailLineProps>`
  ${({ active }) => css`
    div {
      visibility: ${active ? 'visible' : 'hidden'};
      overflow: auto;
      max-height: ${active ? '400px' : '0px'};
      transition: all 0.3s ease-out;
    }
  `}
`;
