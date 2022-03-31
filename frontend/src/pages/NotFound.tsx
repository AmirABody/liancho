import Typewriter from "typewriter-effect";
import Header from "../components/Header";
import { useAuth } from "./user-api/hooks-api";

export default function NotFound() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <Header isAuth={Boolean(user)} />
      <div className="dark:bg-gray-700 flex items-center justify-center h-screen font-bold text-4xl text-blue-500 dark:text-white">
        <Typewriter
          options={{
            strings: ["خطای ۴۰۴: صفحه‌ی مورد نظر یافت نشد:)"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
}
