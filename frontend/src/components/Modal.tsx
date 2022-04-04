interface ModalProps {
  setModal: (modal: string) => void;
  children: React.ReactNode;
}

export default function Modal({ setModal, children }: ModalProps) {
  return (
    <div className="w-screen h-screen absolute z-50 top-0 left-0">
      <div className="bg-gray-400/30 dark:bg-gray-800/80 w-full h-full absolute" onDoubleClick={() => setModal("")} />
      <div className="relative flex justify-center w-full h-full mt-10 z-[60]">
        <div className="w-4/12 bg-white dark:bg-gray-600 dark:border dark:border-gray-500 rounded-md p-5 h-fit">
          {children}
        </div>
      </div>
    </div>
  );
}
