import { memo, useCallback, useEffect, useState } from 'react';

import { TableColumnProps } from 'components/TableColumn';
import { useTable } from 'components/Table';

import * as S from './styles';

export type TableCellProps = {
  value: any;
  columnProps: TableColumnProps;
};

const TableCell = ({ value, columnProps }: TableCellProps) => {
  const { fixed, contentAlign, render } = columnProps;

  const [position, setPosition] = useState(0);
  const { eventEmitter, minimal } = useTable();

  const onChangePosition = useCallback((position) => {
    setPosition(position);
  }, []);

  useEffect(() => {
    if (!fixed) return;

    const key = `${columnProps.label}_${columnProps.tableKey}`;
    eventEmitter.on(`change_position_${key}`, onChangePosition);

    return () => {
      eventEmitter.off(`change_position_${key}`, onChangePosition);
    };
  }, [columnProps, onChangePosition, eventEmitter, fixed]);

  return (
    <S.Wrapper
      fixed={fixed}
      position={position}
      minimal={minimal}
      contentAlign={contentAlign}
    >
      {render ? render(value) : value}
    </S.Wrapper>
  );
};

export default memo(TableCell);
