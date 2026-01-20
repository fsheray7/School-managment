import React from "react";

const QuizCard = ({ question, options }) => {
  return (
    <div className=" flex  items-center justify-center
      w-full 
      bg-white 
      rounded-2xl 
      shadow-2xl 
      border-t-8 
      border-[#1749E5] 
      overflow-hidden
      transition-all 
      
    ">

      <div className="
        p-4 
        sm:p-5 
        md:p-4 
        lg:p-8 
      
      ">

        {/* Question */}
        <h2 className="
          text-base 
          sm:text-lg 
          md:text-xl 
          lg:text-2xl 
          font-bold 
          text-[#1749E5] 
          mb-4 
          sm:mb-5 
          md:mb-6
        ">
          {question}
        </h2>

        {/* Options – ALWAYS 2 COLUMNS */}
        <div className="
          grid 
          grid-cols-2
          gap-6
          sm:gap-3 
          md:gap-4
        ">
          {options.map((option, index) => (
            <button
              key={index}
              className="
                border 
                border-[#1749E5] 
                text-[#1749E5]
                rounded-full
                px-2 
                py-2
                sm:px-3 
                sm:py-2
                md:px-4 
                md:py-1
                lg:px-5 
                lg:py-2
                text-[10px]
                sm:text-xs
                md:text-sm
                lg:text-sm
                hover:bg-[#1749E5] 
                hover:text-white
                transition-all 
                duration-300
                text-center
                leading-tight
              "
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default QuizCard;
