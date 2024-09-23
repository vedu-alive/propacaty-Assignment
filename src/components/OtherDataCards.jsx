import React from 'react'
import { cardIcons, units } from '../utils/variables';

const OtherDataCards = ({propertyName, value, }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-[#2E2E38] rounded-3xl border text-[#fff] border-[#484950] p-2 relative">
      <div className="p-3 rounded-full flex justify-center items-center bg-white absolute top-[-1.5rem]">
        <img className="h-8 w-8" src={cardIcons[propertyName]} alt={"icon"} />
      </div>
      <p className="mt-8">{propertyName}</p>
      <p className="text-[#ADB5BD]">
        {value} <span className="">{units[propertyName]}</span>
      </p>
    </div>
  );
}

export default OtherDataCards