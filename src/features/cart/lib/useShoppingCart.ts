import { BaseMenuItemType } from '@/src/features/cart/model/type';
import { useMemo } from 'react';

export const useShoppingCart = (items: BaseMenuItemType[]) => {
  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.price, 0), [items]);

  const totalDiscount = useMemo(() => items.reduce((acc, item) => acc + item.calculateDiscount(), 0), [items]);

  return {
    items,
    totalPrice,
    totalDiscount,
  };
};
