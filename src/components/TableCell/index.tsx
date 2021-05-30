import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { TableColumnProps } from 'components/TableColumn';
import { useTable } from 'components/Table';

import * as S from './styles';

export type TableCellProps = {
  item: Record<string, any>;
  objectKey: string;
  columnProps: TableColumnProps;
  renderInternalContent: (content: React.ReactNode) => void;
};

const TableCell = ({
  item,
  objectKey,
  columnProps,
  renderInternalContent
}: TableCellProps) => {
  const {
    fixed,
    contentAlign,
    actionColumn,
    render,
    children,
    open
  } = columnProps;

  const [position, setPosition] = useState(0);
  const [showing, setShowing] = useState(false);

  const { eventEmitter, minimal } = useTable();

  const onChangePosition = useCallback((position) => {
    setPosition(position);
  }, []);

  const handleRenderInternalContent = useCallback(() => {
    if (!open) {
      setShowing((currentShowing) => {
        renderInternalContent(currentShowing ? null : children);
        return !currentShowing;
      });
    }
  }, [renderInternalContent, children, open]);

  useEffect(() => {
    if (!fixed) return;

    const key = `${columnProps.label}_${columnProps.tableKey}`;
    eventEmitter.on(`change_position_${key}`, onChangePosition);

    return () => {
      eventEmitter.off(`change_position_${key}`, onChangePosition);
    };
  }, [columnProps, onChangePosition, eventEmitter, fixed]);

  useEffect(() => {
    if (open && children) {
      setShowing(true);
    }
  }, [open, children]);

  const renderedContent = useMemo(() => {
    if (!render) return item[objectKey];

    return actionColumn ? render(item) : render(item[objectKey]);
  }, [item, objectKey, actionColumn, render]);

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
