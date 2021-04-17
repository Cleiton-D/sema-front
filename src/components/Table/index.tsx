import {
  useMemo,
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback
} from 'react';
import mitt, { Emitter } from 'mitt';
import debounce from 'lodash.debounce';

import { TableColumnProps } from 'components/TableColumn';
import TableRow from 'components/TableRow';

import * as S from './styles';

type TableProps<T> = {
  minimal?: boolean;
  items: T[];
  keyExtractor: (value: T) => string;
  children:
    | React.ReactElement<TableColumnProps>
    | React.ReactElement<TableColumnProps>[];
};

type TableContextProps = {
  eventEmitter: Emitter;
  minimal: boolean;
};
const TableContext = createContext<TableContextProps>({} as TableContextProps);

function Table<T extends Record<string, string>>({
  minimal = false,
  items,
  keyExtractor,
  children
}: TableProps<T>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const newItems = useMemo(
    () =>
      items.map((item) => ({
        key: keyExtractor(item),
        value: item
      })),
    [items, keyExtractor]
  );

  const eventEmitter = useMemo(mitt, []);

  const resizeHandler = useCallback(() => {
    eventEmitter.emit('resize');
  }, [eventEmitter]);

  useEffect(() => {
    const target = containerRef.current;

    const debounced = debounce(resizeHandler, 150);
    const resizeObserver = new ResizeObserver(debounced);
    if (target) {
      resizeObserver.observe(target);
    }

    return () => {
      if (target) {
        resizeObserver.unobserve(target);
      }
    };
  }, [resizeHandler]);

  return (
    <TableContext.Provider value={{ eventEmitter, minimal }}>
      <S.Wrapper ref={containerRef}>
        <table>
          <S.TableHeader>
            <tr>{children}</tr>
          </S.TableHeader>
          <tbody>
            {newItems.map((item) => (
              <TableRow
                item={item.value}
                columns={children}
                key={item.key}
                rowKey={item.key}
              />
            ))}
          </tbody>
        </table>
      </S.Wrapper>
    </TableContext.Provider>
  );
}

export const useTable = () => useContext(TableContext);

export default Table;
