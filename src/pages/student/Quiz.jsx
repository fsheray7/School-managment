import React from "react";
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full  bg-white flex flex-col items-center justify-center px-4 mt-10">

      <div className="flex pt-6 items-center justify-center">
        <img
          src="/studentimage/quizimage.png"
          alt="Quiz image"
          className="w-60 h-60"
        />
      </div>

      <Button
        onClick={() => navigate("/quizoptions")}
        className="mt-6 max-w-xs"
        variant="primary"      >
        Start
      </Button>
    </section>
  );
};

export default Quiz;
