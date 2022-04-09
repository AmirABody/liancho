interface ModalProps {
  setModal: (modal: string) => void;
  center?: boolean;
  children: React.ReactNode;
}

export default function Modal({ setModal, children, center = true }: ModalProps) {
  return (
    <div className="w-screen h-screen fixed z-50 top-0 left-0 overflow-auto">
      <div className="bg-gray-400/30 dark:bg-gray-800/80 w-full h-full fixed" onDoubleClick={() => setModal("")} />
      <div className={`flex justify-center w-full h-full ${center ? "items-center" : ""}`}>
        <div
          className={`relative w-[380px] bg-white dark:bg-gray-600 dark:border dark:border-gray-500 rounded-md p-5 h-fit z-[60] ${
            !center ? "my-10" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
