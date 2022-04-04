import Logo from "../Logo";
import Card from "./Card";

export default function HeaderSection() {
  return (
    <Card className="col-span-10">
      <header className="flex items-center justify-between">
        <span className="text-[22px] text-gray-700 font-bold">سلام مهدی عزیز!</span>
        <Logo />
      </header>
    </Card>
  );
}
