import React from "react";
import "./style.css";

function Pagination({ totalPage, currentPage, setCurrentPage, noOfRows }) {
      let startRow = 1 + (currentPage - 1) * 10;
      let endRow = (startRow + 9) < noOfRows ? (startRow + 9) : noOfRows;
      if (noOfRows === 0) {
            startRow = 0;
      }
      let setCurrentPageValue = (val) => { //safe-method
            if (val > 0 && val <= totalPage) {
                  setCurrentPage(val);
            }
      }
      return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }} >
                  <button disabled={currentPage === 1} className={"page-button"}
                        onClick={() => { setCurrentPageValue(1); }}>
                        {"<<"}
                        <span className="tooltip-text">
                              First Page
                        </span>
                  </button>
                  <button disabled={currentPage === 1} className={"page-button"}
                        onClick={() => { setCurrentPageValue(currentPage - 1); }}>
                        {"<"}
                        <span className="tooltip-text" style={{ width: "62px" }}>
                              Previous Page
                        </span>
                  </button>
                  <span className={"pagination-style"}>Page</span>
                  <input type="number" min="1" max={totalPage} className={"pageno-input arrow-hidden"}
                        id="current-page" value={currentPage}
                        onChange={(e) => {
                              setCurrentPageValue(e.target.value);
                        }} autoComplete="off" />
                  <span className={"pagination-style"}>of</span>
                  <span className={"pagination-style"}>{totalPage}</span>
                  <button disabled={currentPage === totalPage} className={"page-button"}
                        onClick={() => { setCurrentPageValue(parseInt(currentPage) + 1); }}>
                        {">"}
                        <span className="tooltip-text">
                              Next Page
                        </span>
                  </button>
                  <button disabled={currentPage === totalPage} className={"page-button"}
                        onClick={() => { setCurrentPageValue(totalPage); }
                        }>
                        {">>"}
                        <span className="tooltip-text">
                              Last Page
                        </span>
                  </button>
                  <div style={{ marginLeft: "63vw" }}>
                        Customer <span>{startRow}</span>
                        <span>{"-" + endRow + " of " + noOfRows}</span>
                  </div>
            </div >);

};

export default Pagination;
