import { BaseDiscountStrategy, TenPercentDiscountStrategy } from '@/src/features/cart/model/DiscountStrategy';
import { BaseMenuItemType, DiscountStrategyImpl, RemoteMenuItem } from '@/src/features/cart/model/type';

export class BaseMenuItem implements BaseMenuItemType {
  private readonly _ingredients: string[];
  private readonly _id: string;
  private readonly _name: string;
  private readonly _type: string;
  private readonly _price: number;
  private _discountStrategy: DiscountStrategyImpl;

  constructor(item: RemoteMenuItem) {
    this._id = item.id;
    this._name = item.name;
    this._type = item.category;
    this._price = item.price;
    this._ingredients = item.ingredients;
    this._discountStrategy = new BaseDiscountStrategy();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get price(): number {
    return this._price;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  set discountStrategy(strategy: DiscountStrategyImpl) {
    this._discountStrategy = strategy;
  }

  calculateDiscount(): number {
    return this._discountStrategy.calculate(this._price);
  }
}

export class PastaItem extends BaseMenuItem {
  private readonly servingSize: string;

  constructor(item: RemoteMenuItem, servingSize: string) {
    super(item);
    this.servingSize = servingSize;
    this.discountStrategy = new TenPercentDiscountStrategy();
  }

  calculateDiscount(): number {
    return this.servingSize === 'large' ? super.calculateDiscount() : 0;
  }
}

export class PizzaItem extends BaseMenuItem {
  private readonly toppings: number;

  constructor(item: RemoteMenuItem, toppings: number) {
    super(item);
    this.toppings = toppings;
  }

  calculateDiscount(): number {
    return 3 < this.toppings ? super.calculateDiscount() : 0;
  }
}
