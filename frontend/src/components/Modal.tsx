interface ModalProps {
  setModal: (modal: string) => void;
  children: React.ReactNode;
}

export default function Modal({ setModal, children }: ModalProps) {
  return (
    <div className="w-screen h-screen absolute z-50 top-0 left-0">
      <div className="bg-gray-400/30 dark:bg-gray-800/80 w-full h-full absolute" onDoubleClick={() => setModal("")} />
      <div className="flex justify-center w-full h-full mt-10">
        <div className="w-4/12 modal-gradient dark:!bg-gray-600 border border-[#B4B4B4]/50 rounded-lg p-5 h-fit">
          {children}
        </div>
      </div>
    </div>
  );
}
