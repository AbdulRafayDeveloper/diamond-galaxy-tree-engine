"use client";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
// import "react-big-calendar/lib/css/react-big-calendar.css";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [showPackages,setShowPackages]=useState(false);
  const [formData,setFormData]=useState({
    slot1Commission:"",
    slot1Price:"",
    slot2Commission:"",
    slot2Price:"",
    slot3Commission:"",
    slot3Price:"",
    slot4Commision:"",
    slot4Price:"",
    slot5Commission:"",
    slot5Price:"",
    slot6Commission:"",
    slot6Price:"",
    slot7Commission:"",
    slot7Price:"",
    slot8Commission:"",
    slot8Price:"",
    slot9Commission:"",
    slot9Price:"",
    slot10Commission:"",
    slot10Price:"",
    slot11Commission:"",
    slot11Price:"",

  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  
  const handlePackage=()=>{
    setShowPackages(true);
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


  const section = "Slots";

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
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
           Slots
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true}  />
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
          <SideBar section={section}/>
        </aside>
      </div>

      <div className="sm:ml-64">
      <div className="p-4 max-w-8xl flex flex-col justify-center items-center ">
            <div className="bg-[#F6F1DE] p-2 rounded-md">
              <div className="flex flex-col justify-center items-center text-center p-5">
                <h1 className="text-4xl text-[#22405c] font-bold">Create Packages</h1>
                <p>Set the price as per your requirement</p>
              </div>
              <div className="flex justify-center items-center p-4">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
                  {/* Gold */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px] rounded-md">
                    <div>
                      <p className="text-2xl font-bold">Slot 1 </p>
                    </div>
                    <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot3Commission" value={formData.slot3Commission} onChange={handleChange} className=" w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot3Price" value={formData.slot3Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2  min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/* Diamond */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 2</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot1Commission" value={formData.slot1Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot1Price" value={formData.slot1Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2  min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                      
                    </div>
                  </div>
                  {/* Silver */}
                  <div className="flex flex-col">
                    
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                      <div>
                        <p className="text-2xl font-bold">Slot 3</p>
                      </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot2Commission" value={formData.slot2Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot2Price" value={formData.slot2Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2  min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/* Star */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 4</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot4Commision" value={formData.slot4Commision} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot4Price" value={formData.slot4Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2  min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                      
                    </div>
                  </div>
                  {/* Royal */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 5</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot5Commission" value={formData.slot5Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot5Price" value={formData.slot5Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 6</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot6Commission" value={formData.slot6Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot6Price" value={formData.slot6Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 7</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot7Commission" value={formData.slot7Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot7Price" value={formData.slot7Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 8</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot8Commission" value={formData.slot8Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot8Price" value={formData.slot8Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 9</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot9Commission" value={formData.slot9Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot9Price" value={formData.slot9Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 10</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot10Commission" value={formData.slot10Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot10Price" value={formData.slot10Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col">
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[400px]">
                    <div>
                      <p className="text-2xl font-bold">Slot 11</p>
                    </div>
                      <div>
                        <p className="mb-3">Company Commission</p>
                        <input type="number" name="slot11Commission" value={formData.slot11Commission} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md" />
                      </div>
                      <div>
                        <p>Price</p>
                        <input type="number" placeholder="$" name="slot11Price" value={formData.slot11Price} onChange={handleChange} className="w-[180px] border border-gray-400 outline-none rounded-md"  />
                      </div>
                      <div>
                        <button className="p-2 min-w-[200px] bg-[#22405c] text-white rounded-md">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg"
                // onClick={(e) => handleFormAction("cancel", e)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-[#22405c] text-white rounded-lg"
                onClick={()=>console.log(formData)}
>
                Save
              </button>
              {/* <Link
                href="/owner/appliance_management/appliance"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Save
              </Link> */}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
