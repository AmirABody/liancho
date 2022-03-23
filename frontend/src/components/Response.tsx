import { Icon } from "@iconify/react";
import { Response as ResponseType } from "../interfaces";

interface ResponseProps extends ResponseType {
  setResponse: (response: ResponseType | null) => void;
}

export default function Response({ type, message, setResponse }: ResponseProps) {
  const bgColor = {
    success: { whole: "bg-green-500", icon: "bg-green-700/50" },
    warning: { whole: "bg-yellow-500", icon: "bg-yellow-700/50" },
    error: { whole: "bg-red-500", icon: "bg-red-700/50" },
  }[type];

  const icon = {
    success: "ep:success-filled",
    warning: "clarity:warning-standard-solid",
    error: "bxs:error-circle",
  }[type];

  return (
    <div className={`flex items-center w-full ${bgColor.whole} text-white rounded overflow-hidden`}>
      <div className={`flex items-center justify-center self-stretch ${bgColor.icon} px-3`}>
        <Icon icon={icon} color="white" width="22" />
      </div>
      <div className="flex flex-grow justify-between items-center px-3">
        <span className="font-medium py-3 flex-grow">{message}</span>
        <button onClick={() => setResponse(null)}>
          <Icon icon="gridicons:cross" color="white" width={22} />
        </button>
      </div>
    </div>
  );
}
