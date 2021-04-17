import { memo, Children } from 'react';

import { TableColumnProps } from 'components/TableColumn';
import TableCell from 'components/TableCell';

import * as S from './styles';

type TableRowProps = {
  item: Record<string, string>;
  columns:
    | React.ReactElement<TableColumnProps>
    | React.ReactElement<TableColumnProps>[];
  rowKey: string;
};

const TableRow = ({ item, columns, rowKey }: TableRowProps): JSX.Element => {
  return (
    <S.Wrapper key={rowKey}>
      {Children.map(columns, ({ props: columnProps }) => (
        <TableCell
          key={`${rowKey}_${columnProps.tableKey}_${columnProps.label}`}
          columnProps={columnProps}
          value={item[columnProps.tableKey]}
        />
      ))}
    </S.Wrapper>
  );
};

export default memo(TableRow);
