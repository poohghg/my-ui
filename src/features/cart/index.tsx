import { BaseMenuItemType } from '@/src/features/cart/model/type';
import { MenuList } from '@/src/features/cart/ui/MenuList';
import { useCallback, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState<BaseMenuItemType[]>([]);

  const addCartItem = useCallback((item: BaseMenuItemType) => {
    setCartItems(prev => [...prev, item]);
  }, []);

  return (
    <>
      <h1 className={'text-3xl font-bold underline'}>cart</h1>
      <div className={'fixed top-5 right-5 flex flex-col gap-2 z-50'}>
        <MenuList onAddMenuItem={addCartItem} />
        {/*<ShoppingCart cartItems={cartItems} />*/}
      </div>
    </>
  );
};

export default Cart;
