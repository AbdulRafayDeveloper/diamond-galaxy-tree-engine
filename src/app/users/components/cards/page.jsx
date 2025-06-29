"use client";
import React from "react";

const ReferralCard = ({ title, count, amount }) => {
  return (
    <div className="flex flex-col bg-[#F6F1DE] rounded-xl h-[200px] gap-4 p-3 justify-center items-center">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-black text-3xl">{title}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="size-6 mt-2"
          fill="black"
          stroke="black"
        >
          <path d="M352 224c53 0 96-43 96-96s-43-96-96-96..." />
        </svg>
      </div>
      <p className="text-2xl font-bold text-yellow-500">{count}</p>
      <div className="flex flex-row">
        <button className="w-[150px] p-1 bg-black flex flex-row justify-center gap-4 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="size-4 mt-1"
            fill="white"
          >
            <path d="M246.6 9.4c-12.5..." />
          </svg>
          <p className="text-white">{amount}</p>
          <img
            src="/logoImg.avif"
            alt="logo"
            className="w-6 h-6 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default ReferralCard;
