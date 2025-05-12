"use client";
import { id, se } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import { object } from "joi";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef=useRef();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [errors,setErrors]=useState({});
  const [selected,setSelected]=useState("Trust Wallet");

  const[formData,setFormData]=useState({
    coin:" CoinPayements - USDT",
    paymentGateway:"",
    Amount:"",
    Id:"",
    Address:""
  });
  const options=["Trust Wallet", "Binance"]
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    // Validation Apply 
    const newErrors={};
    if(!formData.Amount || isNaN(formData.Amount) || Number(formData.Amount)< 0){
      newErrors.Amount ="Please enter a valid amount";
    }
    if(selected=="Binance" && (!formData.Id || isNaN(formData.Id))){
      newErrors.Id="Please enter a valid Id for Binance";
    }
    if (selected === "Trust Wallet" && (!formData.Address || formData.Address.trim() === "")) {
      newErrors.Address = "Please enter a valid Address";
    }
    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return ;
    }
    console.log(formData);
    setErrors({});
  }

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

  const section = "Withdraw";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          {/* Mobile: Show sidebar toggle */}
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              />
            </svg>
          </button>

          {/* Title */}
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64">
            Withdraw
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
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
      {/* body part */}
      <div className="md:ml-64">
        <div className="bg-white">
          <div className="p-2">
          <div className="bg-[#22405c] flex flex-col  p-2 rounded-md h-[600px]">
              <div className="flex flex-row justify-between">
                <div className="flex mt-4">
                  <p className="text-2xl font-thick text-md text-white">Withdraw Funds</p>
                </div>
                <div className="flex mt-2 rounded-md">
                  <Link href="/users/withdraw/withdraw-history">
                    <Image src="/icons/historyLogo.png" alt="History Icon" width={40} height={40} />
                  </Link>
                </div>
              </div>
                <div className="mt-6 p-2 flex justify-center items-center gap-3" >
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 rounded-md gap-5 bg-[#F6F1DE]  p-5 h-[460px] lg:w-[500px] ">
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
                                <label htmlFor="" className="ml-1">Withdraw Gateways</label>
                              </div>
                              <div className="relative inline-block w-[230px] lg:w-[450px]" ref={dropdownRef}>
                                {/* Selected Option */}
                                <div
                                  className="p-1 rounded-md border border-gray-300 cursor-pointer flex items-center justify-between bg-white"
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  <span>{selected}</span>
                                  <svg
                                    className="fill-current h-4 w-4 text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 12l-5-5h10l-5 5z" />
                                  </svg>
                                </div>

                                {/* Dropdown Options */}
                                {isOpen && (
                                  <div className="absolute mt-1 z-50 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                                    {options.map((option, idx) => (
                                      <div
                                        key={idx}
                                        className="cursor-pointer p-2 hover:bg-gray-200"
                                        onClick={() => {
                                          setSelected(option);
                                          setIsOpen(false);
                                        }}
                                      >
                                        {option}
                                      </div>
                                    ))}
                                  </div>
                                )}
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
                                {errors.Amount && <p className="text-red-500 text-sm">{errors.Amount}</p>}
                            </div>
                            {/* Conditionally Render Id (for Binance) */}
                            {selected === "Binance" &&  (
                              <div>
                                <div>
                                  <label htmlFor="Id" className="ml-1">
                                    Id
                                  </label>
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    value={formData.Id}
                                    name="Id"
                                    placeholder="enter the id"
                                    className="p-1 rounded-md lg:w-[450px] w-[230px] outline-none pl-1"
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.Id && <p className="text-red-500 text-sm">{errors.Id}</p>}
                              </div>
                            )}

                            {/* Conditionally Render Address (for Trust Wallet) */}
                            {selected === "Trust Wallet" && (
                              <div>
                                <div>
                                  <label htmlFor="Address" className="ml-1">
                                    Address
                                  </label>
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={formData.Address}
                                    name="Address"
                                    placeholder="enter the address"
                                    className="p-1 rounded-md lg:w-[450px] w-[230px] outline-none pl-1"
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.Address && <p className="text-red-500 text-sm">{errors.Address}</p>}
                              </div>
                            )}

                            <div className="mt-3">
                              <button type="submit" className="p-2 flex w-full rounded-md justify-center items-center text-center bg-[#22405c] text-white">
                                Submit 
                              </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* show the submitted data */}
            {/* {formSubmitData && submittedData && (
              <div className="p-4 mt-5 flex flex-col justify-center items-center bg-[#F6F1DE] rounded-md max-h-screen">
                <div className="flex justify-center items-center text-center">
                  <h1 className="text-lg font-thick mt-4">Payment Preview</h1>
                </div>
                <div className="mt-5 w-[220px] flex justify-center text-center items-center">
                  <p className="text-[10px] sm:text-[12px] md:text-md lg:text-lg">
                    Please send exactly {submittedData.Amount} USDT to{" "}
                    <Link
                      href="0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf"
                      className="text-blue-600"
                    >
                      0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf
                    </Link>
                  </p>
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
