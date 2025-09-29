import { SpecialDiscountStrategy, TenPercentDiscountStrategy } from '@/src/features/cart/model/DiscountStrategy';
import { BaseMenuItemType } from '@/src/features/cart/model/type';

function isTodayFriday(): boolean {
  const today = new Date();
  return today.getDay() === 5;
}

interface MenuListProps {
  onAddMenuItem: (item: BaseMenuItemType) => void;
}

export const MenuList = ({ onAddMenuItem }: MenuListProps) => {
  const handleAddMenuItem = (item: BaseMenuItemType) => {
    if (isTodayFriday()) {
      item.discountStrategy = new SpecialDiscountStrategy();
    } else if (item.type === 'pizza') {
      // 피자면 피자 인스턴스를 만들고 할인율 적용
      item.discountStrategy = new TenPercentDiscountStrategy();
    } else if (item.type === 'pasta') {
      item.discountStrategy = new TenPercentDiscountStrategy();
    }
    onAddMenuItem(item);
  };

  return (
    <div data-testid="menu-list" className="menu-list ">
      <ol>
        {/*{menuItems.map(item => (*/}
        {/*  <li key={item.id}>*/}
        {/*    <h3>{item.name}</h3>*/}
        {/*    <span>${item.price}</span>*/}
        {/*    <div>*/}
        {/*      {item.ingredients.map(ingredient => (*/}
        {/*        <span>{ingredient}</span>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*    <button onClick={() => handleAddMenuItem(item)}>Add</button>*/}
        {/*  </li>*/}
        {/*))}*/}
      </ol>
    </div>
  );
};
