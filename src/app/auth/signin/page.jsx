"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();

    console.log("form data:",formData)
  }


  return (
    <div className="relative">
      <div className="font-calibri relative z-10 ">
        <div className="bg-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 min-h-screen">
            <div style={{ backgroundImage: "url('/reg.jpg')" }} className="flex relative justify-center object-cover bg-cover min-h-scree ">
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-2 gap-4">
                <h1 className="text-[32px] text-white font-bold">Daimond Galaxy</h1>
                <p className="text-center text-white text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                </p>
                <button className="bg-[#22405c] p-2 text-white w-[200px] rounded-[50px] font-bold text-sm">
                  <Link href="/auth/signup">
                  Register Now
                  </Link>
                </button>
              </div>
            </div>
            <div className="mx-auto flex justify-center items-center">
              <form>
                <div className="p-3 m-4">
                  <div className="flex justify-center items-center text-center">
                    <h3 className="text-[#22405c] font-calibri text-3xl font-extrabold mb-6 text-center">
                      Login<br></br>
                      <span className="text-sm text-center">Continue to your account</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-4 ">
                    <div className="flex gap-4">
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4">
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                        </svg>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="email"
                          
                        />
                        
                      </div>
                      
                    </div>
                    
                    <div className="flex  gap-4">
                      <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5">
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                      </svg>
                        <input
                          name="password"
                          type={showPassword ? "text":"password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="password"
                        />
                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5" onClick={()=>setShowPassword(!showPassword)}>
                        {
                          showPassword ?  "👁️" : "👁‍🗨"
                        }
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      // type="submit"
                      className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-[#22405c] text-white focus:outline-none"
                      onClick={handleSubmit}
                      
                    >
                      Login
                    </button>
                  </div>
                  <p className="text-sm mt-3 text-gray-800 ">
                    If you don't have an account?{" "}
                    <a
                      href="/auth/login"
                      className="text-[#22405c] font-semibold hover:underline ml-1"
                    >
                      Register here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
