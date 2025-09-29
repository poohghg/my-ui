import { useShoppingCart } from '@/src/features/cart/lib/useShoppingCart';
import { BaseMenuItemType } from '@/src/features/cart/model/type';
import React from 'react';

export const ShoppingCart = ({ cartItems }: { cartItems: BaseMenuItemType[] }) => {
  const { totalPrice, totalDiscount } = useShoppingCart(cartItems);

  return (
    <div data-testid="shopping-cart" className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ol>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <span>${item.price}</span>
          </li>
        ))}
      </ol>
      <div className="number">Total Discount: ${totalDiscount}</div>
      <div className="number">Total: ${totalPrice - totalDiscount}</div>
    </div>
  );
};
