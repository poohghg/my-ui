'use client';

import { ComponentType } from 'react';
import { Button } from 'ui';
import { toasts } from 'ui/components/toast/model/ToastManager';

const withLoading = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P & { isLoading: boolean }) => {
    const { isLoading, ...rest } = props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...(rest as P)} />;
  };
};

const MyComponent: React.FC<{ data: string }> = ({ data }) => {
  return <div>Data: {data}</div>;
};

const MyComponentWithLoading = withLoading(MyComponent);

export const Test = () => {
  return <MyComponentWithLoading isLoading={true} data="Hello, World!" />;
};

export const ToastTest = () => {
  const handleClick = () => {
    toasts.success('This is a success message!', 3000);
  };

  return <Button onClick={handleClick}>addToast</Button>;
};
