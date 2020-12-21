import React, { useState, useEffect } from 'react';
import hrcLOGO from "./assests/hrc-logo.svg";
import abcLOGO from "./assests/abc-logo.png";
import Table from "./table.js";
import Pagination from "./pagination.js";
import AddButton from "./buttons/add.js";
import EditButton from "./buttons/edit.js";

const DATA = {
      SOURCE: "", //               http://localhost:8080/1704389/ 
      LEVEL_1_APPROVAL_AMOUNT: 10000
};

const UPPER_ORDER_AMOUNT = 10000000;
const LOWER_ORDER_AMOUNT = 1;

function Dashboard({ cookies }) {
      const [tableData, setTableData] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPage, setTotalPage] = useState(1);
      const [searchValue, setSearchValue] = useState("");
      const [noOfRows, setNoOfRows] = useState(0);
      const [checkedOrderID, setCheckedOrderID] = useState(null);
      const [addModalVisible, setAddModalVisible] = useState(false);
      const [editModalVisible, setEditModalVisible] = useState(false);

      document.title = "Dashboard";
      const level = cookies.get("level");
      const username = cookies.get("username");


      const handleSignout = () => {
            if (cookies.get("level") !== null) {
                  cookies.remove("level", { path: '/' });
            }
            if (cookies.get("username") !== null) {
                  cookies.remove("username", { path: '/' });
            }
      }

      const retriveData = (search = "", skip = 0) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                  if (this.readyState === 4 && this.status === 200) {
                        const dataReceived = this.responseText;
                        const parsedData = JSON.parse(dataReceived);
                        setTableData(parsedData);
                  }
            }
            req.open("POST", DATA.SOURCE + "FetchTable", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send("search=" + searchValue + "&skip=" + (10 * skip) + "&level=" + level);
      };

      const unsetCheckBox = () => {
            setCheckedOrderID(null);
            if (document.querySelector('.checkbox:checked') !== null) {
                  document.querySelector('.checkbox:checked').checked = false;
            }
      }

      const resetTableColors = () => {
            if (checkedOrderID !== null) {
                  let resetColor = (element, colorName) => {
                        for (let i = 0; i < element.length; ++i) {
                              element[i].style.backgroundColor = colorName;
                        }
                  }
                  resetColor(document.getElementsByName("odd"), "#fff");
                  resetColor(document.getElementsByName("even"), "#F3FBFE");
            }
      }

      const handleApproveReject = (approved) => {
            if (checkedOrderID === null) { // Exception : Button disable failed
                  alert("Select a row first!");
                  return;
            }
            const approvalStatus = approved === false ? "Rejected" : "Approved";
            if (document.getElementById(checkedOrderID).children[7].textContent === approvalStatus) {
                  alert("Order already " + approvalStatus);
                  return;
            }
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                  if (this.readyState === 4 && this.status === 200) {
                        const dataReceived = this.responseText;
                        if (dataReceived === "0") { //SQL Error
                              alert("Request Failed");
                        }
                        else if (dataReceived === "1") { //Success
                              document.getElementById(checkedOrderID).children[2].textContent =
                                    (username.split("_").join(" "));
                              document.getElementById(checkedOrderID).children[7].textContent =
                                    approvalStatus;
                              setTimeout(() => alert("Order " + approvalStatus), 20);
                        }
                        else { // Something Unexpected
                              alert("Something Unexpected :(");
                        }
                  }
            }
            req.open("POST", DATA.SOURCE + "ApproveReject", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            const param = (name, value, addAmpersand = "&") => {
                  return (addAmpersand + name + "=" + value);
            }
            req.send(param("order_id", checkedOrderID, "") +
                  param("approval_status", approvalStatus) +
                  param("approved_by", username.split("_").join(" ")));
      }


      useEffect(() => {
            retriveData(searchValue, currentPage - 1);
            unsetCheckBox();
            resetTableColors();
      }, [currentPage]);

      useEffect(() => {
            retriveData(searchValue, currentPage - 1);
            setCurrentPage(1);
            unsetCheckBox();
            resetTableColors();
      }, [searchValue]);

      return (
            <>
                  {level == 1 ?
                        <><AddButton addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible}
                              username={username} DATA={DATA} UPPER_ORDER_AMOUNT={UPPER_ORDER_AMOUNT} LOWER_ORDER_AMOUNT={LOWER_ORDER_AMOUNT} />
                              {checkedOrderID !== null ?
                                    <EditButton editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible}
                                          username={username} checkedOrderID={checkedOrderID} DATA={DATA}
                                          UPPER_ORDER_AMOUNT={UPPER_ORDER_AMOUNT} LOWER_ORDER_AMOUNT={LOWER_ORDER_AMOUNT} />
                                    : null}</>
                        : null
                  }
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "10px", marginRight: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                              <img src={hrcLOGO} alt="hrc-logo" className={"logos"} />
                              <img src={abcLOGO} alt="abc-logo" className={"logos"} />
                              <button className="signout-button" value="Sign out" onClick={() => { handleSignout() }}>
                                    <span className="signout-button-text">{"Sign out (" + username.split("_").join(" ") + ")"}</span></button>
                        </div>
                        <br />
                        <div style={{ display: "flex", flexDirection: "column" }} className={"dashboard"}>
                              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                    {level == 1 ?
                                          <div>
                                                <button className="add-edit-button"
                                                      onClick={() => { setAddModalVisible(true); }}>
                                                      <span className="button-text">
                                                            Add
                                          </span>
                                                </button>
                                                <button disabled={checkedOrderID === null} className="add-edit-button"
                                                      onClick={() => { setEditModalVisible(true); }}>
                                                      <span className="button-text">
                                                            Edit
                                                      </span>
                                                      <span className="tooltip-text">
                                                            Select a record to edit
                                                      </span>
                                                </button>
                                          </div> : null}
                                    {(level == 2 || level == 3) ?
                                          <div>
                                                <button disabled={checkedOrderID === null ||
                                                      document.getElementById(checkedOrderID).children[7].textContent !== "Awaiting Approval"}
                                                      className="add-edit-button"
                                                      onClick={() => { handleApproveReject(true); }}>
                                                      <span className="button-text">
                                                            Approve
                                                      </span>
                                                      <span className="tooltip-text">
                                                            Select a pending order to Approve
                                                      </span>
                                                </button>
                                                <button disabled={checkedOrderID === null ||
                                                      document.getElementById(checkedOrderID).children[7].textContent !== "Awaiting Approval"}
                                                      className="add-edit-button"
                                                      onClick={() => { handleApproveReject(false); }}>
                                                      <span className="button-text">
                                                            Reject
                                                      </span>
                                                      <span className="tooltip-text">
                                                            Select a pending order to Reject
                                                      </span>
                                                </button>
                                          </div> : null}
                                    <input type="number" min="0" className={"search-box arrow-hidden"} placeholder=" Search"
                                          id="search" onChange={(e) => {
                                                setTimeout(() => {
                                                      setSearchValue(e.target.value);
                                                }, 800);
                                          }} autoComplete="off" />

                              </div>
                              <Table data={tableData} setTotalPage={setTotalPage}
                                    setNoOfRows={setNoOfRows} setCheckedOrderID={setCheckedOrderID}
                                    resetTableColors={resetTableColors} />
                        </div>
                        <br />
                        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}
                              noOfRows={noOfRows} />
                  </div>
            </>
      );
}

export default Dashboard;
