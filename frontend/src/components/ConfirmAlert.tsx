import { useEffect, useState } from "react";
import Button from "./buttons/Button";
import Modal from "./Modal";
import { eventManager, Event } from "./eventManager";
import { Alert } from "../interfaces";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmAlertProps extends Alert {}

export default function ConfirmAlert({ text, action }: ConfirmAlertProps) {
  return (
    <Modal
      setModal={() => {
        eventManager.emit(Event.DeleteAlert);
      }}
    >
      <div className="text-gray-800 dark:text-white">{text}</div>
      <div className="flex gap-x-2 mt-5">
        <Button
          className="bg-green-500 text-white rounded-sm w-1/2"
          text="مطمئنم"
          onClick={() => {
            action();
            eventManager.emit(Event.DeleteAlert);
          }}
          rippleColor="rgba(255, 255, 255, 0.3)"
        />
        <Button
          className="bg-red-500 text-white rounded-sm w-1/2"
          text="خیر"
          onClick={() => {
            eventManager.emit(Event.DeleteAlert);
          }}
          rippleColor="rgba(255, 255, 255, 0.3)"
        />
      </div>
    </Modal>
  );
}

export function AlertContainer() {
  const [alert, setAlert] = useState<ConfirmAlertProps | null>(null);

  const setConfirmAlert = (confirmAlert: ConfirmAlertProps) => {
    setAlert(confirmAlert);
  };

  const deleteConfirmAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    eventManager.on(Event.SetAlert, setConfirmAlert).on(Event.DeleteAlert, deleteConfirmAlert);
    return () => {
      eventManager.off(Event.SetAlert).off(Event.DeleteAlert);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-[2000]"
          >
            <ConfirmAlert text={alert.text} action={alert.action} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function alert({ text, action }: Alert) {
  eventManager.emit(Event.SetAlert, { text, action });
}
