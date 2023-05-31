import { useEffect } from "react";
import Div100Vh from "react-div-100vh";

export function SignInCancelled() {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace(window.location.origin);
    }, 3000);
  }, []);
  return (
    <Div100Vh className={`flex justify-center text-white items-center p-6`}>
      <section className="flex flex-col gap-2 justify-center items-center">
        <span className="text-3xl font-black">Login cancelado</span>
        <span className="text-2xl font-semibold">Redirecionando...</span>
      </section>
    </Div100Vh>
  );
}
