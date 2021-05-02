import React, { memo, Children, useState } from 'react';

import { TableColumnProps } from 'components/TableColumn';
import TableCell from 'components/TableCell';

import * as S from './styles';

type TableRowProps = {
  item: Record<string, any>;
  columns:
    | React.ReactElement<TableColumnProps>
    | React.ReactElement<TableColumnProps>[];
  rowKey: string;
};

const TableRow = ({ item, columns, rowKey }: TableRowProps): JSX.Element => {
  const [
    internalContent,
    setInternalContent
  ] = useState<React.ReactNode | null>();

  return (
    <>
      <S.Wrapper key={rowKey} disabledItem={item.disabled}>
        {Children.map(columns, ({ props: columnProps }) => (
          <TableCell
            key={`${rowKey}_${columnProps.tableKey}_${columnProps.label}`}
            columnProps={columnProps}
            item={item}
            objectKey={columnProps.tableKey}
            renderInternalContent={setInternalContent}
          />
        ))}
      </S.Wrapper>

      <S.DetailLine active={!!internalContent}>
        <td colSpan={Children.count(columns)}>
          <div>{internalContent}</div>
        </td>
      </S.DetailLine>
    </>
  );
};

export default memo(TableRow);
