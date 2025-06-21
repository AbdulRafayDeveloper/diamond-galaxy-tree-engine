"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const EducationTable = () => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [educations, setEducations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalEducations, setTotalEducations] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [fullDescription, setFullDescription] = useState("");

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      const isClickInsideDropdown = dropdownRefs.current.some((ref) =>
        ref?.contains(event.target)
      );
      if (!isClickInsideDropdown) {
        setOpenDropdownIndex(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchEducations = async (search = "", pageNumber = 1) => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      const response = await axios.get("/api/admin/education", {
        params: {
          search,
          pageNumber,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        const data = response.data.data;
        setEducations(data.educations); // ✅ set fetched entries
        setTotalEducations(data.totalEducations);
        setCurrentPage(data.pageNumber);
      } else {
        console.error("API error:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching education:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const deleteCourse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = Cookies.get("token");
          const response = await axios.delete(`/api/admin/education/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status == 200) {
            Swal.fire("Deleted!", "The course has been deleted.", "success");
            fetchEducations(searchTerm, currentPage);
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleDescriptionClick = (desc) => {
    setFullDescription(desc);
    setShowModal(true);
  };

  return (
    <div className="relative overflow-x-auto scrollbar-none ">
      <div className="flex flex-col sm:flex-row gap-4 w-full pt-1 justify-end items-center">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-[5px] w-full border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#FF9100] text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/education/add">
            <button className="p-2 bg-[#22405c] text-white rounded-md w-[80px]">
              ➕ Add
            </button>
          </Link>
          {/* <Link href="/admin/education/edit">
                <button className="p-2 bg-[#22405c] flex gap-2 text-white rounded-md w-[80px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-3 ml-2 mt-1" stroke="white" fill="white">
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                  Edit</button>
              </Link> */}
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 p-3">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="px-6 py-3">Course Name</th>
            <th className="px-6 py-3">Link</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-gray-500 text-sm">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-[#22405c] rounded-full animate-spin mb-2"></div>
                  Loading...
                </div>
              </td>
            </tr>
          ) : educations.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8">
                No courses found.
              </td>
            </tr>
          ) : (
            educations.map((edu, index) => (
              <tr
                key={edu._id || index}
                className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
              >
                <td className="px-6 py-4">{edu.name}</td>
                <td className="px-6 py-4">
                  <Link href={edu.url} target="_blank">
                    <button className="bg-[#22405c] text-white px-4 py-2 rounded">
                      Open
                    </button>
                  </Link>
                </td>
                <td
                  className="px-6 py-4 text-black cursor-pointer "
                  onClick={() => handleDescriptionClick(edu.description)}
                >
                  {edu.description.length > 60
                    ? edu.description.slice(0, 60) + "..."
                    : edu.description}
                </td>

                <td>
                  <div className="flex justify-center items-center gap-2">
                    <Link href={`/admin/education/edit/${edu._id}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        ✏️
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteCourse(edu._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {totalEducations > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalEducations / pageSize)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <h2 className="text-lg font-bold mb-4">Full Description</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {fullDescription}
            </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationTable;
