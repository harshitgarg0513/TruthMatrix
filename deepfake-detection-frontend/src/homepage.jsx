import { TypewriterEffectSmooth } from "./components/typewritereffect";
import { useNavigate } from "react-router-dom";
import { NavbarDemo } from "./components/navigation";
export function TypewriterEffectSmoothDemo() {
  const navigate = useNavigate();
  const words = [
    {
      text: "Welcome to the world of { ",
    },
    {
      text: "",
    },
    {
      text: "",
    },
    
    {
      text: "TruthMatrix",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "}",
      },
  ];
  return (
    (<div className="flex flex-col items-center justify-center h-[40rem]  ">
        <NavbarDemo/>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The One-Stop-Way to detect DeepFakes.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm" onClick={
            ()=>{
                navigate("/dashboard")
            }
          }>
          Check Now
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={
            ()=>{
                navigate("/signup")
            }
          }>
          Signup
        </button>
      </div>
    </div>)
  );
}
