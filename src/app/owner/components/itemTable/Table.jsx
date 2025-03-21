"use client";
import Link from "next/link";
import Swal from "sweetalert2";
const Table = ({ products }) => {
  const getStatusColor = (status) => {
    if (status === "Good") return "text-green-500 font-medium";
    if (status === "Upcoming Maintenance") return "text-yellow-400 font-medium";
    if (status === "Urgent Repair") return "text-red-400 font-medium";
    return "text-gray-600";
  };
  const DeleteRecorde = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626", // Red color for confirm button
      cancelButtonColor: "#6B7280", // Gray for cancel button
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Record has been deleted.",
          icon: "success",
        });
      }
    });
  };
	
  return (
    <div className="relative scrollbar-none overflow-x-auto lg:overflow-hidden  pt-12">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Name
            </th>
            <th className="text-center text-black px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Maintenance Status
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Last Service
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Purchase Date
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Warranty
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="odd:bg-[#F5F5F5] even:bg-white border-b border-gray-200 text-center"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                {product.name}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${getStatusColor(
                  product.status
                )}`}
              >
                {product.status}
              </td>
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                {product.service}
              </td>
              <td className="px-6 py-4 text-sm text-black">{product.date}</td>
              <td className="px-6 py-4">{product.warranty}</td>
              <td className="px-6 py-4 flex items-center justify-center gap-1">
                <button className="text-gray-800 hover:text-blue-800">
                  <Link href={`../owner/appliance_management/view_appliance/${index}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  </Link>

                  {/*<img
                    src="/icons/lets-icons_view-fill.png"
                    className="w-auto h-auto max-w-10 max-h-10 "
                    alt="View"
                  />*/}
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={DeleteRecorde}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  {/*<img
                    src="/icons/ic_baseline-delete.png"
                    className="w-auto h-auto max-w-10 max-h-10 "
                    alt="Delete"
                  />*/}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
