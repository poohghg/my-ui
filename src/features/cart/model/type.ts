export type RemoteMenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  ingredients: string[];
  description?: string;
  allergyTags?: string[];
  calories?: number;
};

export interface BaseMenuItemType {
  id: string;
  name: string;
  type: string;
  price: number;
  ingredients: string[];
  discountStrategy: DiscountStrategyImpl;
  calculateDiscount(): number;
}

export interface DiscountStrategyImpl {
  calculate(price: number): number;
}

// test

interface AInterface {
  type: 'A';
  name: string;
  age: number;
  hasJob: boolean;
}

interface BInterface {
  type: 'B';
  name: string;
  age: number;
  hasCar: boolean;
}

interface CInterface {
  type: 'C';
  name: string;
  age: number;
  hasHouse: boolean;
}

interface AllTypes {
  A: AInterface;
  B: BInterface;
  C: CInterface;
}

export type ABCType = AInterface | BInterface | CInterface;
