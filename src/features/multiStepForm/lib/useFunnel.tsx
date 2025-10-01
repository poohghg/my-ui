import { isValidElement, ReactElement, ReactNode, useMemo, useState } from 'react';

interface StepProps<T extends string[]> {
  name: T[number];
  children: ReactNode;
}

interface FunnelProps<T extends string[]> {
  children: Array<ReactElement<StepProps<T>>> | ReactElement<StepProps<T>>;
}

interface FunnelComponent<T extends string[]> {
  Step: (props: StepProps<T>) => ReactElement;

  (props: FunnelProps<T>): ReactElement;
}

export const useFunnel = <T extends string[], Key extends T[number]>(steps: T, defaultStep: Key) => {
  const [step, setStep] = useState<Key>(defaultStep);

  const updateStep = (next: Key) => {
    setStep(next);
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s === step)!;

    if (currentIndex === steps.length - 1) {
      return;
    }

    setStep(steps[currentIndex + 1] as Key);
  };

  const StepComponent = useMemo(() => {
    return ({ children }: StepProps<T>) => <>{children}</>;
  }, []);

  const FunnelComponent: FunnelComponent<T> = useMemo(
    () =>
      ({ children }: FunnelProps<T>) => {
        const ActiveStep = Array.isArray(children)
          ? children.find(child => isValidElement(child) && child.props.name === step)
          : children.props.name === step
            ? children
            : null;

        return <>{ActiveStep}</>;
      },
    [step]
  ) as FunnelComponent<T>;

  FunnelComponent.Step = StepComponent;

  return {
    step,
    updateStep,
    nextStep,
    Funnel: FunnelComponent,
  };
};
