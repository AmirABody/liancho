import RawLogo from "./RawLogo";

function Logo() {
  return (
    <div className="flex items-center gap-x-3">
      <h1 className="font-dana text-gray-900 dark:text-white font-black text-lg">LianCho</h1>
      <RawLogo />
    </div>
  );
}

export default Logo;
