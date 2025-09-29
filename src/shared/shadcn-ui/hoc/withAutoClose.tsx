import React, { ComponentType, ReactElement, useEffect, useMemo, useState } from 'react';

export interface Toggleable {
  isOpen: boolean;
  close: () => void;
}

export const withAutoClose =
  <P extends Toggleable>(Component: ComponentType<P>, duration = 2000) =>
  (props: Omit<P, keyof Toggleable>): ReactElement => {
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
      if (show) {
        const timerId = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timerId);
      }
    }, [show]);

    const finalProps = useMemo(
      () =>
        ({
          ...props,
          isOpen: show,
          close: () => setShow(false),
        }) as P,
      [props, show]
    );

    return <Component {...finalProps} />;
  };
