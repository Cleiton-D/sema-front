import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { TableColumnProps } from 'components/TableColumn';
import { useTable } from 'components/Table';

import * as S from './styles';

export type TableCellProps = {
  value: any;
  columnProps: TableColumnProps;
  renderInternalContent: (content: React.ReactNode) => void;
};

const TableCell = ({
  value,
  columnProps,
  renderInternalContent
}: TableCellProps) => {
  const { fixed, contentAlign, render, children } = columnProps;

  const [position, setPosition] = useState(0);
  const [showing, setShowing] = useState(false);

  const { eventEmitter, minimal } = useTable();

  const onChangePosition = useCallback((position) => {
    setPosition(position);
  }, []);

  const handleRenderInternalContent = useCallback(() => {
    renderInternalContent(showing ? null : children);
    setShowing(!showing);
  }, [renderInternalContent, children, showing]);

  useEffect(() => {
    if (!fixed) return;

    const key = `${columnProps.label}_${columnProps.tableKey}`;
    eventEmitter.on(`change_position_${key}`, onChangePosition);

    return () => {
      eventEmitter.off(`change_position_${key}`, onChangePosition);
    };
  }, [columnProps, onChangePosition, eventEmitter, fixed]);

  const renderedContent = useMemo(() => (render ? render(value) : value), [
    value,
    render
  ]);

  return (
    <S.Wrapper
      fixed={fixed}
      position={position}
      minimal={minimal}
      contentAlign={contentAlign}
      showingDetail={showing}
    >
      {children ? (
        <S.ExpandButton onClick={handleRenderInternalContent}>
          {renderedContent}
          <S.ExpandIcon size={20} active={showing} />
        </S.ExpandButton>
      ) : (
        renderedContent
      )}
    </S.Wrapper>
  );
};

export default memo(TableCell);
