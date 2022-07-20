import { Fragment, ReactNode } from "react";

interface GenericListProps<T> {
  items: T[];
  filter: (item: T) => boolean;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
}

export const GenericList = <T,>({
  items,
  filter,
  renderItem,
  keyExtractor,
}: GenericListProps<T>): JSX.Element => {
  return (
    <>
      {items.filter(filter).map((item: T, index: number) => (
        <Fragment key={keyExtractor(item)}>{renderItem(item, index)}</Fragment>
      ))}
    </>
  );
};
