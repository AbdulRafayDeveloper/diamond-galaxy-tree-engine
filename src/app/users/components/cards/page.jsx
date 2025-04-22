import React from "react";

const Page = () => {
  return (
    <>
      <div className="conatiner mt-3 ">
        <div className="grid grid-cols-1">
          <div className="flex flex-col bg-[#F6F1DE] rounded-xl h-[200px] gap-4 p-3 justify-center items-center">
            <div className="flex flex-row gap-2">
              <h1 className="text-black text-3xl">My Refferals</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="size-6 mt-2"
                fill="black"
                stroke="black"
              >
                <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">0</p>
            </div>
            <div className="flex flex-row">
              <button className="w-[150px] p-1 bg-black opacticy-30  flex flex-row justify-center gap-4 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="size-4 mt-1"
                  fill="white"
                  stroke="white"
                >
                  <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z" />
                </svg>
                <p className="text-white">0</p>
                <img
                  src="/logoImg.avif"
                  alt=""
                  className="w-6 h-6 flex justify-end rounded-[200px]"
                />
              </button>
            </div>
          </div>
          {/* col 2 */}
          {/* <div className="flex flex-col bg-[#22405c] rounded-xl gap-4 p-3 justify-center items-center">
            <div className="flex flex-row gap-2">
              <h1 className="text-white text-3xl">Team</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="size-6 mt-2"
                fill="white"
                stroke="black"
              >
                <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">0</p>
            </div>
            <div className="flex flex-row">
              <button className="w-[150px] p-1 bg-white opacticy-30  flex flex-row justify-center gap-4 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="size-4 mt-1"
                  fill="black"
                  stroke="white"
                >
                  <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z" />
                </svg>
                <p>0</p>
                <img
                  src="/logoImg.avif"
                  alt=""
                  className="w-6 h-6 flex justify-end rounded-[200px]"
                />
              </button>
            </div>
          </div> */}
          {/* <div className="flex flex-col bg-[#F6F1DE] rounded-xl h-[200px] gap-4 p-3 justify-center items-center">
                       <div className="flex flex-row gap-2">
                            <h1 className="text-black">Individual</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5" fill="black" stroke="black">
                                <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>
                            </svg>
                       </div>
                       <div>
                            <p className="text-lg font-bold text-yellow-500">5</p>
                       </div>
                       <div className="flex flex-row" >
                            <button className="w-[150px] p-1 bg-black opacticy-30  flex flex-row justify-center gap-4 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-4 mt-1" fill="white" stroke="white">
                                    <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/>
                                </svg>
                                <p className="text-white">0</p>
                                <img src="/logoImg.avif" alt="" className="w-6 h-6 flex justify-end rounded-[200px]" />
                            </button>
                       </div>
                    </div> */}
        </div>
      </div>
    </>
  );
};
export default Page;
