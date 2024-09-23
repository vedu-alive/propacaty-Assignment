import React, { useState } from 'react'

const Toggle = ({unit, setUnit}) => {
  const [translate, setTranslate] = useState(false);
  return (
    <div
      className="flex items-center justify-center gap-2 bg-[#2E2E38] rounded-3xl border border-[#484950] py-2 px-3 cursor-pointer min-w-24"
      onClick={() => {
        setTranslate((prev) => !prev);
        setUnit((prev) => !prev);
      }}
    >
      <div className="text-[#fff] font-semibold text-lg">{unit ? "°F" : "°C"}</div>
      <div className=" flex items-center justify-center relative w-8 h-4">
        {/* write code to implement togle btn */}
        <div className="border border-[#fff] w-full" />
        <div
          className={`rounded-full h-3 w-4 bg-white absolute left-0 ${
            translate ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

export default Toggle