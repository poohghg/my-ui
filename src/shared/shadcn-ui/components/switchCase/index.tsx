import { ReactNode } from 'react';
import { typedMemo } from '@/src/shared/libs/react-utils';

type Case = Record<string | number, () => ReactNode>;

interface SwitchCaseProps<T extends Case> {
  value: keyof T | (string & {}) | (number & {});
  caseBy: T;
  defaultComponent: () => ReactNode;
}

const SwitchCase = <T extends Case>({ value, caseBy, defaultComponent = () => null }: SwitchCaseProps<T>) => {
  return (caseBy[value] ?? defaultComponent)();
};

export default typedMemo(SwitchCase);
