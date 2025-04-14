"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const[formSubmitData,setFormSubmitData]=useState(false);
  const[formData,setFormData]=useState({
    coin:" CoinPayements - USDT",
    paymentGateway:"",
    Amount:""
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:[value]
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
    setFormSubmitData(true);
  }
   const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf);
        toast.success("Referral link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link.");
      }
    };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  const section = "Deposit";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="grid grid-cols-3 md:flex  p-2">
        <div>
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            ref={sidebarRef}
            id="separator-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <SideBar section={section} />
          </aside>
        </div>
        <div className=" flex items-center md:mt-2  px-1 sm:px-6 lg:px-8 md:ml-56">
          <p className="text-[12px]  md:text-2xl md:font-semibold ml-3">
            Deposit
          </p>
        </div>
        <div className="flex justify-end md:ml-[750px]">
          <Header appear={true} />
        </div>
      </div>
      {/* body part */}
      <div className="md:ml-64">
        <div className="bg-white">
          <div className="md:p-4 p-2">
            <div className="bg-[#22405c] flex flex-col justify-center items-center p-2 rounded-md h-[500px]">
                <div className="flex justify-center items-center text-center mt-4">
                    <p className="text-3xl font-thick text-md text-white">Deposit Funds</p>
                </div>
                <div className="mt-10 p-2 flex justify-center items-center gap-3" >
                    <form>
                        <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 rounded-md gap-5 bg-[#F6F1DE]  p-5 h-[340px] lg:w-[500px] ">
                            <div className="">
                                <div>
                                    <label htmlFor="" className="ml-1">Coin</label>
                                </div>
                                <div>
                                    <input type="text" value={formData.coin} name="coin" disabled className="p-1 rounded-md bg-white text-gray-300 lg:w-[450px] w-[230px]"  />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label htmlFor="" className="ml-1">Payment Gateways</label>
                                </div>
                                <div>
                                    <select name="paymentGateway" value={formData.paymentGateway} id="paymentGateway"
                                    onChange={handleChange} 
                                    className="p-1 rounded-md  lg:w-[450px] w-[230px]  outline-none">
                                        <option value="Trust Wallet">Trust Wallet</option>
                                        <option value="Binanace">Binance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label htmlFor="" className="ml-1">Amount</label>
                                </div>
                                <div>
                                    <input type="number" value={formData.Amount} name="Amount" 
                                    placeholder="enter the amount"  
                                    className="p-1 rounded-md  lg:w-[450px] w-[230px]  outline-none pl-1" 
                                    onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                              <button className="p-2 flex w-full rounded-md justify-center items-center text-center bg-[#22405c] text-white" 
                                onClick={handleSubmit} >Submit 
                              </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* show the submitted data */}
            {
              formSubmitData && (
                <div className="p-4 mt-5 flex flex-col justify-center items-center bg-[#F6F1DE]  rounded-md max-h-screen ">
                  <div className="flex justify-center items-center text-center ">
                    <h1 className="text-lg font-thick mt-4">Payment Preview</h1>
                  </div>
                  <div className="mt-5 w-[220px] flex justify-center text-center items-center">
                    <p className="text-[10px]  sm:text-[12px] md:text-md lg:text-lg">Please send Exaclty {formData.Amount} USDT. BEP20 to <a href="0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf" className="text-blue-600">0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf</a></p>
                    <button onClick={handleCopy}>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="size-7 fill-blue-800 mt-4 ml-2 text-left flex items-end"
                      
                    >
                      <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                    </svg>
                    </button>
                  </div>
                  
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
