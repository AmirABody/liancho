import Logo from "../Logo";
import { Icon } from "@iconify/react";
import Button from "../buttons/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuth: boolean;
}

export default function Header({ isAuth }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-1">
      <div className="flex justify-between max-w-[1200px] px-4 py-2 mx-auto">
        <div className="flex gap-x-3">
          <Button
            className="font-semibold hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700 dark:text-white"
            text={theme === "light" ? "حالت شب" : "حالت روز"}
            rippleColor="#9ca3af"
            startIcon={
              theme === "light" ? (
                <Icon icon="icon-park-outline:dark-mode" width="25" />
              ) : (
                <Icon icon="fa-regular:sun" width={23} />
              )
            }
            onClick={toggleTheme}
          />
          {isAuth && (
            <Link to="/dashboard">
              <div className="flex items-center bg-blue-600/60 hover:bg-blue-600/80 dark:bg-blue-400/80 dark:hover:bg-blue-400/60 p-[1px] rounded-full cursor-pointer transition-all">
                <Icon icon="carbon:user-avatar-filled-alt" color="white" width={34} />
                <span className="text-white px-3 font-semibold">داشبورد</span>
              </div>
            </Link>
          )}
        </div>
        <Link className="self-center" to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
