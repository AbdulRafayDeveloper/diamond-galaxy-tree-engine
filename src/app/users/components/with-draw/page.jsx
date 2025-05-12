import React from "react";

const Page = () => {
  return (
    <>
      <div className="conatiner mt-5 ">
        {/* <div>
                    <p className="text-3xl">Deposits</p>
                </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="flex flex-col bg-[#22405c] rounded-xl gap-4 p-3 ">
            <div className="flex flex-row gap-2">
              <h1 className="text-white ">Total Withdraw</h1>
            </div>
            <div>
              <p className="text-lg  text-[#DDA853]">0.00 USD</p>
            </div>
            <div className="flex flex-row gap-5 ">
              <div>
                <h1 className="text-white ">Submitted</h1>
                <p className="text-md text-[#DDA853]">0.00</p>
              </div>
              <div>
                <h1 className="text-white ">Pending</h1>
                <p className="text-md text-[#DDA853]">$0.00</p>
              </div>
              <div>
                <h1 className="text-white ">Rejected</h1>
                <p className="text-md text-[#DDA853]">$0.00</p>
              </div>
            </div>
          </div>
          {/* col 2 */}
          <div className="flex flex-col bg-[#F6F1DE] rounded-xl gap-4 p-3 justify-center items-center">
            <div className="flex flex-row gap-2">
              <h1 className="text-black ">Total Earned</h1>
            </div>
            <div>
              <p className="text-lg  text-[#DDA853]">0.00 USD</p>
            </div>
          </div>
          <div className="flex flex-col bg-[#22405c] rounded-xl gap-4 p-3 justify-center items-center">
            <div className="flex flex-row gap-2">
              <h1 className="text-white ">Available Balance</h1>
            </div>
            <div>
              <p className="text-lg  text-[#DDA853]">0.00 USD</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
