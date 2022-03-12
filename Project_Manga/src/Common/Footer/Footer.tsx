import { useEffect, useState } from "react";

export default function Footer() {
  const [showScrollUp, setShowScrollUp] = useState(false);
  useEffect(() => {
    addEventListener("scroll", () => {
      scrollY > 600 ? setShowScrollUp(true) : setShowScrollUp(false);
    });
  });
  return (
    <button
      className={
        showScrollUp
          ? "bg-blue-500 fixed text-white rounded-lg h-12 px-5 shadow-2xl hover:bg-blue-800 bottom-0 w-12 right-0 mr-6 mb-10"
          : "hidden"
      }
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
