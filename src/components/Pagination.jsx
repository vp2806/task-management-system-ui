import { useState } from "react";

export default function Pagination({
  data,
  recordPerPage,
  limitOfData,
  handleLimitOfData,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const lastPageNumber = Math.ceil(data?.length / recordPerPage);
  function handlePagination(event) {
    if (event.target.id === "moveToFirstPage") {
      handleLimitOfData({
        lowerLimitOfData: 0,
        upperLimitOfData: recordPerPage,
      });
      setPageNumber(1);
    } else if (event.target.id === "pageDecrement") {
      handleLimitOfData({
        lowerLimitOfData: (pageNumber - 1) * recordPerPage - recordPerPage,
        upperLimitOfData: limitOfData.lowerLimitOfData,
      });
      setPageNumber(pageNumber - 1);
    } else if (event.target.id === "pageIncrement") {
      handleLimitOfData({
        lowerLimitOfData: (pageNumber + 1) * recordPerPage - recordPerPage,
        upperLimitOfData: limitOfData.upperLimitOfData + recordPerPage,
      });
      setPageNumber(pageNumber + 1);
    } else if (event.target.id === "moveToLastPage") {
      handleLimitOfData({
        lowerLimitOfData: lastPageNumber * recordPerPage - recordPerPage,
        upperLimitOfData: data.length,
      });
      setPageNumber(lastPageNumber);
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <nav>
        <ul className="inline-flex -space-x-px text-base h-10">
          <li
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-500 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer  ${
              pageNumber <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
            id="moveToFirstPage"
            onClick={handlePagination}
          >
            &lt;&lt;
          </li>
          <li
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-500  hover:bg-gray-100 hover:text-gray-700 cursor-pointer ${
              pageNumber <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
            id="pageDecrement"
            onClick={handlePagination}
          >
            &lt;
          </li>
          <li
            id="pageNumber"
            className={
              "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border  border-gray-500  hover:bg-gray-100 hover:text-gray-700 pointer-events-none"
            }
          >
            {pageNumber}
          </li>
          <li
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-500  hover:bg-gray-100 hover:text-gray-700 cursor-pointer ${
              pageNumber >= lastPageNumber
                ? "pointer-events-none opacity-50"
                : ""
            }`}
            id="pageIncrement"
            onClick={handlePagination}
          >
            &gt;
          </li>
          <li
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-500 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer ${
              pageNumber >= lastPageNumber
                ? "pointer-events-none opacity-50"
                : ""
            }`}
            id="moveToLastPage"
            onClick={handlePagination}
          >
            &gt;&gt;
          </li>
        </ul>
      </nav>
    </div>
  );
}
