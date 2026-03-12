import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeToast } from "../../store/slices/toastSlice";
import Toast from "./Toast";

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
