import { DiscountStrategyImpl } from '@/src/features/cart/model/type';

export class BaseDiscountStrategy implements DiscountStrategyImpl {
  calculate(): number {
    return 0;
  }
}

export class SpecialDiscountStrategy implements DiscountStrategyImpl {
  calculate(price: number): number {
    return price * 0.15;
  }
}

export class TenPercentDiscountStrategy implements DiscountStrategyImpl {
  calculate(price: number): number {
    return price * 0.1;
  }
}
