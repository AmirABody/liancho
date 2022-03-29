import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Toast as ToastType } from "../interfaces";
import { eventManager, Event } from "./eventManager";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  toast: ToastType;
  config: ToastConfig;
}

interface ToastConfig {
  limit: number;
  progressBar: boolean;
  autoRemove: boolean;
  autoRemoveTime: number;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

function Toast({ toast, config }: ToastProps) {
  const bgColor = {
    info: { whole: "bg-blue-500", icon: "bg-blue-700/50" },
    success: { whole: "bg-green-500", icon: "bg-green-700/50" },
    warning: { whole: "bg-yellow-500", icon: "bg-yellow-700/50" },
    error: { whole: "bg-red-500", icon: "bg-red-700/50" },
  }[toast.type];

  const icon = {
    info: "eva:info-fill",
    success: "ep:success-filled",
    warning: "clarity:warning-standard-solid",
    error: "bxs:error-circle",
  }[toast.type];

  useEffect(() => {
    if (config.autoRemove) {
      setTimeout(() => {
        eventManager.emit(Event.Delete, toast.id);
      }, config.autoRemoveTime);
    }
  }, []);

  return (
    <motion.div
      className={`flex items-center w-96 ${bgColor.whole} text-white rounded overflow-hidden relative`}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <div className={`flex items-center justify-center self-stretch ${bgColor.icon} px-3`}>
        <Icon icon={icon} color="white" width="22" />
      </div>
      <div className="flex flex-grow justify-between items-center px-3">
        <span className="font-medium py-3 flex-grow">{toast.message}</span>
        <button
          onClick={() => {
            eventManager.emit(Event.Delete, toast.id);
          }}
        >
          <Icon icon="gridicons:cross" color="white" width={22} />
        </button>
      </div>
      {config.progressBar && config.autoRemove && (
        <span
          style={{ animation: `progress ${config.autoRemoveTime / 1000}s linear forwards` }}
          className={`w-0 h-[3px] bg-white absolute bottom-0 right-0`}
        />
      )}
    </motion.div>
  );
}

// Global id for toasts
let Id = 0;

export function ToastContainer(toastConfig: Partial<ToastConfig>) {
  const [toastList, setToastList] = useState<ToastType[]>([]);

  const config: ToastConfig = {
    limit: toastConfig.limit ?? 6,
    progressBar: toastConfig.progressBar ?? true,
    autoRemove: toastConfig.autoRemove ?? true,
    autoRemoveTime: toastConfig.autoRemoveTime ?? 5000, // in milliseconds
    position: toastConfig.position ?? "top-right",
  };

  const position = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  }[config.position];

  const addToast = ({ type, message }: Pick<ToastType, "type" | "message">) => {
    let newToast: ToastType = {
      id: Id++,
      type,
      message,
    };

    setToastList((prevList) => {
      if (prevList.length === config.limit) return prevList;
      return [...prevList, newToast];
    });
  };

  const deleteToast = (id: number) => {
    setToastList((prevList) => prevList.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    eventManager.on(Event.Create, addToast).on(Event.Delete, deleteToast);
    return () => {
      eventManager.off(Event.Create).off(Event.Delete);
    };
  }, []);

  return (
    <div className={`flex flex-col-reverse gap-y-2 absolute ${position} p-4 z-[1000]`}>
      <AnimatePresence>
        {toastList.map((toast) => (
          <Toast key={toast.id} toast={toast} config={config} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function toast({ type, message }: Pick<ToastType, "type" | "message">) {
  eventManager.emit(Event.Create, { type, message });
}
