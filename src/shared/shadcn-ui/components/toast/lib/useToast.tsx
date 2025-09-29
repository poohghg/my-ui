'use client';

import { useSyncExternalStore } from 'react';
import { toastManager } from 'ui/components/toast/model/ToastManager';

export const useToast = () => {
  return useSyncExternalStore(
    callback => toastManager.subscribe(callback),
    () => toastManager.toastsList,
    () => toastManager.toastsList
  );
};
