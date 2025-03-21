import React from 'react'

const Pagination = () => {
  return (
    <div className="p-6 mt-7">
              <div className="flex flex-row justify-end items-end">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-8 text-sm rounded-xl">
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white hover:bg-[#FB9105] border border-e-0 border-blue-400 rounded-s-lg bg-[#00288E] hover:text-white ">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-gray-200 border border-blue-400 hover:bg-blue-700 hover:text-white ">1</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-blue-400 hover:bg-blue-700 hover:text-white ">2</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-400 hover:bg-blue-700 hover:text-white ">3</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-blue-400 hover:bg-blue-700 hover:text-white ">4</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-blue-400 hover:bg-blue-700 hover:text-white ">5</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-white hover:bg-[#FB9105] border border-blue-400 rounded-e-lg bg-[#00288E] ">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
  )
}

export default Pagination;