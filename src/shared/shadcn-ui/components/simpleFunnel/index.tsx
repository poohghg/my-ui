import { createContextSet } from '@/src/shared/libs/react-utils';
import { ReactElement, useState } from 'react';

// // --- 1. 타입 및 컨텍스트 기본 정의 (기존 코드 유지) ---
// import { createContextSet } from '@/src/shared/libs/react-utils';
// import { ReactElement, useState } from 'react';
//
// interface FunnelContextType<T extends string[]> {
//   step: T[number];
//   steps: T;
//   setStep: (step: T[number]) => void;
//   prevStep: () => void;
//   nextStep: () => void;
// }
//
// // 1.1. 기본 컨텍스트 정의 (string[]으로 일반화)
// type BaseFunnelContextType = FunnelContextType<string[]>;
// const [FunnelContextProvider, useBaseFunnelContext] = createContextSet<BaseFunnelContextType>({
//   name: 'FunnelContext',
// });
//
// // 1.2. 제네릭 래퍼 훅 (타입 단언을 통해 T를 강제)
// function useFunnelContext<T extends string[]>(): FunnelContextType<T> {
//   return useBaseFunnelContext() as FunnelContextType<T>;
// }
//
// interface FunnelProps<T extends string[]> {
//   steps: T;
//   children: ReactElement; // 자식은 Funnel.Step 들을 포함할 예정
//   defaultStep: T[number];
//   onchange?: (setp: T[number]) => void;
// }
//
// // 1.3. Funnels 컴포넌트 정의 (Provider 역할)
// const Funnels = <T extends string[]>({ children, steps, defaultStep, onchange }: FunnelProps<T>) => {
//   // ... (이전과 동일한 내부 로직)
//   const [step, setStep] = useState<T[number]>(defaultStep);
//
//   const updateStep = (newStep: T[number]) => {
//     setStep(newStep);
//     onchange?.(newStep);
//   };
//
//   const prevStep = () => {
//     const currentIndex = steps.findIndex(s => s === step);
//     if (currentIndex > 0) updateStep(steps[currentIndex - 1]);
//   };
//
//   const nextStep = () => {
//     const currentIndex = steps.findIndex(s => s === step);
//     if (currentIndex < steps.length - 1) updateStep(steps[currentIndex + 1]);
//   };
//
//   const cotextValue = { step, steps, setStep: updateStep, prevStep, nextStep } as FunnelContextType<T>;
//
//   return <FunnelContextProvider value={cotextValue}>{children}</FunnelContextProvider>;
// };
//
// // --- 2. 재사용성을 위한 타입 팩토리 함수 (핵심) ---
//
// /**
//  * 특정 스텝 타입(T)에 고정된 Funnel 컴포넌트와 훅을 생성합니다.
//  * @returns { object } Typed Funnel Components and Hook
//  */
// function createTypedFunnel<T extends string[]>() {
//   // 2.1. Funnels 컴포넌트를 T 타입에 고정
//   const TypedFunnels = (props: FunnelProps<T>) => Funnels<T>(props);
//
//   // 2.2. useFunnelContext 훅을 T 타입에 고정
//   const useTypedFunnelContext = () => useFunnelContext<T>();
//
//   // 2.3. Funnel의 특정 스텝을 렌더링하는 컴포넌트 (T에 고정된 useFunnelContext 사용)
//   interface FunnelStepProps {
//     name: T[number]; // 스텝 이름도 T[number]로 타입 고정
//     children: ReactElement | (() => ReactElement);
//   }
//
//   const FunnelStep = ({ name, children }: FunnelStepProps) => {
//     const { step: currentStep } = useTypedFunnelContext(); // T가 추론된 훅 사용
//
//     // 현재 스텝과 일치할 때만 자식을 렌더링
//     return currentStep === name ? <>{typeof children === 'function' ? children() : children}</> : null;
//   };
//
//   // Funnels 컴포넌트에 Step 컴포넌트와 훅을 묶어서 반환 (재사용 편의성 증가)
//   return {
//     Funnels: Object.assign(TypedFunnels, { Step: FunnelStep }),
//     useFunnelContext: useTypedFunnelContext,
//   };
// }
//
// // --- 3. 특정 퍼널 정의 (재사용 단위) ---
//
// /**
//  * 💡 이 부분은 애플리케이션에서 한 번만 정의됩니다.
//  * LoginFunnel은 이제 오직 'ID', 'PW', 'Complete' 스텝만 가질 수 있습니다.
//  */
// const { Funnels: LoginFunnel, useFunnelContext: useLoginFunnel } = createTypedFunnel<
//   ['ID', 'PW', 'Complete']
// >();

interface FunnelContextType<T extends string[]> {
  step: T[number];
  steps: T;
  setStep: (step: T[number]) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const [FunnelContextProvider, useBaseFunnelContext] = createContextSet<FunnelContextType<string[]>>({
  name: 'FunnelContext',
});

const useFunnelContext = <T extends string[]>(): FunnelContextType<T> => {
  return useBaseFunnelContext() as unknown as FunnelContextType<T>;
};

// interface FunnelStepProps {
//   children: () => ReactElement;
// }
//
// const FunnelStep = () => {
//   const ctx = useFunnelContext();
//   return currentStep === step ? <>{children()}</T> : null;
// };

interface FunnelProps<T extends string[]> {
  steps: T;
  children: ReactElement;
  defaultStep: T[number];
  onchange?: (setp: T[number]) => void;
}

const Funnels = <T extends string[]>({ children, steps, defaultStep, onchange }: FunnelProps<T>) => {
  const [step, setStep] = useState<T[number]>(defaultStep);

  const updateStep = (step: T[number]) => {
    setStep(step);
    onchange?.(step);
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s === step);

    if (currentIndex === 0) {
      return;
    }

    updateStep(steps[currentIndex - 1]);
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s === step);

    if (currentIndex === steps.length - 1) {
      return;
    }

    updateStep(steps[currentIndex + 1]);
  };

  const cotextValue = {
    step,
    steps,
    setStep: updateStep,
    prevStep,
    nextStep,
  };

  return <FunnelContextProvider value={cotextValue}>{children}</FunnelContextProvider>;
};
