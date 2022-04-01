import Header from "../components/home/Header";
import Button from "../components/buttons/Button";
import { Icon } from "@iconify/react";
import RawLogo from "../components/RawLogo";
import Slider from "../components/home/Slider";
import SignUpModal from "../components/home/SignUpModal";
import { useState } from "react";
import SignInModal from "../components/home/SignInModal";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, useLogOut } from "./user-api/hooks-api";

function Landing() {
  const [modal, setModal] = useState<string>("");

  const { user } = useAuth();

  const mutation = useLogOut();


  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header isAuth={Boolean(user)} />

        <div className="flex items-stretch w-full flex-grow dark:bg-gray-700">
          <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4 py-4">
            <div className="flex flex-col basis-1/2 relative">
              <div className="w-20 h-5 rounded-full bg-blue-500 shadow-2 mb-6"></div>
              <h1 className="text-gray-700 dark:text-white text-[4rem] font-semibold mb-12">
                کارهای روزمره‌ات رو
                <br />
                به همین سادگی
                <br />
                <span className="text-blue-500">مدیریت</span> کن
              </h1>
              <div className="flex gap-x-5">
                {user ? (
                  <Button
                    className="w-[180px] h-[55px] text-2xl bg-white dark:bg-red-500 font-medium text-red-500 dark:text-white dark:hover:bg-red-400 hover:bg-red-500 hover:text-white border-2 dark:border-0 border-red-500"
                    text="خروج"
                    rippleColor="rgba(255, 255, 255, 0.3)"
                    endIcon={<Icon icon="majesticons:logout" width="27" hFlip />}
                    onClick={handleSignOut}
                  />
                ) : (
                  <>
                    <Button
                      className="w-[180px] h-[55px] text-2xl bg-green-500 font-medium text-white shadow-3 hover:bg-green-400"
                      text="ثبت نام"
                      rippleColor="rgba(255, 255, 255, 0.3)"
                      endIcon={<Icon icon="akar-icons:person-add" width="26" />}
                      onClick={() => setModal("signup")}
                    />
                    <Button
                      className="w-[180px] h-[55px] text-2xl bg-white dark:bg-blue-500 font-medium text-blue-500 dark:text-white dark:hover:bg-blue-400 hover:bg-blue-500 hover:text-white border-2 dark:border-0 border-blue-500 shadow-4"
                      text="ورود"
                      rippleColor="rgba(255, 255, 255, 0.3)"
                      endIcon={<Icon icon="majesticons:login" width="27" hFlip />}
                      onClick={() => setModal("signin")}
                    />
                  </>
                )}
              </div>
              <div className="absolute top-60 -left-5">
                <RawLogo width={510} shadow={false} selfBlur={true} />
              </div>
            </div>
            <div className="w-1/2">
              <Slider />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {modal.length && (
            <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {modal === "signup" && <SignUpModal setModal={setModal} />}
              {modal === "signin" && <SignInModal setModal={setModal} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Landing;
