import { useContext } from "react";
import Logo from "../components/Logo";
import { Icon } from "@iconify/react";
import Button from "./buttons/Button";
import { ThemeContext, ThemeContextInterface } from "../contexts/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-1">
      <div className="flex justify-between max-w-[1200px] px-4 py-2 mx-auto">
        <Button
          className="font-semibold hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700 dark:text-white"
          text={theme === "light" ? "حالت شب" : "حالت روز"}
          rippleColor="#9ca3af"
          startIcon={theme === 'light' ? <Icon icon="icon-park-outline:dark-mode" width="25" /> : <Icon icon="fa-regular:sun" width={23} />}
          onClick={toggleTheme}
        />
        <Logo />
      </div>
    </header>
  );
}
