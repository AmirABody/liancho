import Typewriter from "typewriter-effect";
import Header from "../components/Header";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
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
