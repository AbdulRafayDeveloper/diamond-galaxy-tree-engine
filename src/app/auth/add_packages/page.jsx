"use client"; // Required for Next.js 13+ App Router

import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import DatePicker from "react-datepicker";
import Link from "next/link";

const steps = ["Packages", "Payment", "Add Property"];

// Custom Step Icon Component
const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
  width: 60, // Increase circle size
  height: 60, // Increase circle size
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: `2px solid ${ownerState.completed ? "#1976D2" : "#ccc"}`,
  backgroundColor: ownerState.active ? "#1976D2" : "#fff",
  color: ownerState.active ? "#fff" : "#000",
  fontWeight: "bold",
  fontSize: "20px", // Increase text size
}));


const Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United States",
    postalCode: "",
    propertyName: "",
    propertyImage: null,
    address: "",
    phone: "",
    purchaseDate: "",
    yearBuilt: "",
    squareFeet: "",
    propertyPrice: "",
    interestRate: "",
    propertyColor: "#2563eb",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isFormValid = () => {
    return formData.cardNumber && formData.expiry && formData.cvc && formData.postalCode;
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
  const handleBuyNow = () => {
    if (selectedPackage) {
      setActiveStep(1);
    } else {
      alert("Please select a package before proceeding to payment.");
    }
  };
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = "Property name is required.";
    } else if (formData.propertyName.length < 3) {
      newErrors.propertyName = "Property name must be at least 3 characters.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required.";
    }

    if (!formData.yearBuilt.trim()) {
      newErrors.yearBuilt = "Year built is required.";
    } else if (!/^\d{4}$/.test(formData.yearBuilt)) {
      newErrors.yearBuilt = "Year built must be a 4-digit number.";
    }

    if (!formData.squareFeet.trim()) {
      newErrors.squareFeet = "Square feet is required.";
    } else if (isNaN(formData.squareFeet) || formData.squareFeet <= 0) {
      newErrors.squareFeet = "Square feet must be a valid positive number.";
    }

    if (!formData.propertyPrice.trim()) {
      newErrors.propertyPrice = "Property price is required.";
    } else if (isNaN(formData.propertyPrice) || formData.propertyPrice <= 0) {
      newErrors.propertyPrice = "Property price must be a valid number.";
    }

    if (!formData.interestRate.trim()) {
      newErrors.interestRate = "Interest rate is required.";
    } else if (
      isNaN(formData.interestRate) ||
      formData.interestRate < 0 ||
      formData.interestRate > 100
    ) {
      newErrors.interestRate = "Interest rate must be between 0 and 100.";
    }

    if (!formData.propertyImage) {
      newErrors.propertyImage = "Property image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        propertyImage: file,
      }));
    }
  };

  const handleFormAction = (event) => {
    // event.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully:", formData);
    } else {
      console.log("Validation Failed:", errors);
    }
  };
  const packagesDetail = [
    {
      id: "01",
      name: "Basic",
      dollar: "5$",
      property: "1 property included",
      time: "One time payment",
    },
    {
      id: "02",
      name: "Standard",
      dollar: "15$",
      property: "1 property included",
      time: "One time payment",
    },
    {
      id: "03",
      name: "Premium",
      dollar: "40$",
      property: "1 property included",
      time: "One time payment",
    },
  ];
  return (
    <div className='container-fluid'>
      <div className='container p-5'>
        <div className='flex flex-col justify-center items-center p-1'>
          <div>
            <h1 className='lg:text-[40px] text-[#00288E] font-bold text-[40px] sm:text-[40px]'>Packages</h1>
          </div>
          <div className='mt-1'>
            <p className='text-md'>
              Pick the right plan for your home management needs
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            <Box>
              {/* Stepper */}
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  display: "flex", // Enables flexbox
                  justifyContent: "center", // Centers horizontally
                  alignItems: "center", // Centers vertically
                  width: "50%", // Takes full width
                  height: "40px", // Fixed height
                  margin: "auto", // Centers within the parent container
                  padding: 2,
                  marginTop: 4

                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{
                      "& .MuiStepIcon-root": {
                        fontSize: "2.5rem",  // Increase circle size
                      },
                    }}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>


              {/* Form Content */}
              <Box sx={{ mt: 5 }}>
                {activeStep === 0 && (
                  <div className="flex justify-center items-center">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-2 bg-gray-200 p-5 rounded-lg ">
                      {packagesDetail.map((el, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-lg justify-center text-center items-center gap-3 h-[300px] w-[250px]">
                          <button className="text-[30px] font-bold mt-2" onClick={() => setSelectedPackage(`${el.name}`)}>{el.name}</button>
                          <h4 className="text-[40px] text-[#FF9202] font-bold mt-3">{el.dollar}</h4>
                          <p className="mt-3 flex text-center justify-center">
                            <img src="/icons/home.png" className="w-[24px] h-[24px]" alt="property" />
                            <span className="ml-2 text-center items-center">{el.property}</span>
                          </p>
                          <p className="mt-3 flex text-center justify-center">
                            <img src="/icons/time.png" className="w-[24px] h-[24px]" alt="time" />
                            <span className="ml-2">{el.time}</span>
                          </p>
                          <button
                            className="bg-[#FF9202] p-1 w-[150px] text-white text-lg rounded-lg mt-3"
                            onClick={handleBuyNow}
                          >
                            Buy Now
                          </button>

                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 bg-[#F8F8F8]">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Payment Details</h2>

                      {/* Payment Method Button */}
                      <div className="w-full flex justify-center md:justify-start">
                        <button
                          className={`p-2 rounded-lg border w-[120px] h-[60px] text-left bg-white flex items-center gap-2 ${paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                            }`}
                          onClick={() => setPaymentMethod("card")}
                        >
                          <img src="/icons/card.png" className="w-6 h-6" />
                          <p className="text-blue-600 font-bold text-sm">Card</p>
                        </button>
                      </div>

                      {/* Card Number Input */}
                      <div className="mt-4">
                        <label className="block text-md font-bold">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          className="w-full border rounded-md p-2 text-sm"
                          placeholder="1234 1234 1234 1234"
                          onChange={handleChange}
                        />
                      </div>

                      {/* Expiry & CVC Fields */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="w-full sm:w-1/2">
                          <label className="block text-md font-bold">Expiry</label>
                          <input
                            type="text"
                            name="expiry"
                            className="w-full border rounded-md p-2 text-sm"
                            placeholder="MM/YY"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="block text-md font-bold">CVC</label>
                          <input
                            type="text"
                            name="cvc"
                            className="w-full border rounded-md p-2 text-sm"
                            placeholder="CVC"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Country & Postal Code Fields */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="w-full sm:w-1/2">
                          <label className="block text-md font-bold">Country</label>
                          <select
                            name="country"
                            className="w-full border rounded-md p-2 text-sm"
                            onChange={handleChange}
                            value={formData.country}
                          >
                            <option className="text-sm">United States</option>
                            <option className="text-sm">Canada</option>
                            <option className="text-sm">United Kingdom</option>
                          </select>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="block text-md font-bold">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            className="w-full border rounded-md p-2 text-sm"
                            placeholder="90210"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                        <button className="p-2 border rounded-md text-gray-500 bg-gray-200 w-full sm:w-[130px]">Cancel</button>
                        <button
                          className={`p-2 rounded-md w-full sm:w-[130px] ${isFormValid() ? "bg-[#FF9202] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          disabled={!isFormValid()}
                          onClick={() => setActiveStep(2)}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="flex justify-center items-center">
                    <div className="w-full max-w-lg rounded-xl bg-[#F9F9F9] p-2">
                      <div className="flex flex-col justify-center items-center p-2 mb-5">
                        <div className="flex justify-center items-center">
                          <div className="relative m-4">
                            <img src="/icons/ph_house-fill.png" alt="add property" className="w-[68px] h-[68px]" />
                            <div className="absolute inset-0 z-50 ml-11 mt-4">
                              <img src="/icons/Group.png" className="h-[20px] w-[20px]" />
                            </div>
                          </div>
                        </div>
                        <div className="max-w-[290px]">
                          <p className="text-center text-md">Enter your property details to start managing your home systems</p>
                        </div>
                        <div className="flex mt-4">
                          <Link
                            href="/auth/property/add_property"
                            // onClick={()=>setActiveStep(3)}
                            className="bg-[#FB9105] text-white p-2 w-full sm:w-[450px] text-sm rounded-lg hover:bg-[#FB9105] shadow-lg"
                          >
                            <div className="flex flex-row justify-center items-center">
                              <img src="/icons/material-symbols_add.png" className="w-6 h-6 sm:w-8 sm:h-8" alt="" />
                              <p className="text-lg sm:text-[22.63px]">Add Property</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

