'use client';

import { useCallback } from 'react';
import { useToast } from 'ui/components/toast/lib/useToast';
import { type Toast, ToastType } from 'ui/components/toast/model/type';
import { toasts } from 'ui/components/toast/model/ToastManager';
import { useAutoClose } from '@/src/shared/libs/hooks/useAutoClose';

const toastTypeClasses: Record<ToastType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warn: 'bg-yellow-500 text-black',
  info: 'bg-gray-500',
};

const ToastItem = ({ type, id, message, delay }: Toast) => {
  const handleAutoClose = useCallback(() => {
    toasts.close(id);
  }, [id]);

  useAutoClose(delay, handleAutoClose);

  return <div className={`px-4 py-2 rounded shadow-md text-white ${toastTypeClasses[type]}`}>{message}</div>;
};

const Toast = () => {
  const toasts = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default Toast;
