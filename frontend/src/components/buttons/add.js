import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";



const AddButton = ({ addModalVisible, setAddModalVisible,
      username, DATA, UPPER_ORDER_AMOUNT, LOWER_ORDER_AMOUNT }) => {
      const [orderID, setOrderID] = useState("");
      const [orderDate, setOrderDate] = useState("");
      const [customerName, setCustomerName] = useState("");
      const [customerNumber, setCustomerNumber] = useState("");
      const [orderAmount, setOrderAmount] = useState("");
      const [notes, setNotes] = useState("");

      const [orderIDExist, setOrderIDExist] = useState(false);
      const [invalidData, setInvalidData] = useState(false);

      const currentDate = (minusOne = false) => {
            const today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            if (minusOne) {
                  yyyy -= 1;
            }
            if (dd < 10) {
                  dd = '0' + dd;
            }
            if (mm < 10) {
                  mm = '0' + mm;
            }
            return (yyyy + '-' + mm + '-' + dd);
      }

      const handleClose = () => {
            setOrderID("");
            setOrderDate(""); setCustomerName("");
            setCustomerNumber(""); setOrderAmount("");
            setNotes(""); setOrderIDExist(false);
            setInvalidData(false); setAddModalVisible(false);
      }

      const suggestOrderID = () => {
            if (addModalVisible) {
                  let req = new XMLHttpRequest();
                  req.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                              const dataReceived = this.responseText;
                              setOrderID(dataReceived);
                        }
                  }
                  req.open("GET", DATA.SOURCE + "SuggestNewOrderID", true);
                  req.send();
            }
      };

      useEffect(() => {
            orderIDExist && setOrderIDExist(false);
            invalidData && setInvalidData(false);
      }, [orderID, orderAmount, orderDate, customerName, customerNumber]);


      const handleAdd = () => {
            if (orderID == "" || (orderAmount == "" || orderAmount < 1) ||
                  orderDate == "" || customerName === "" ||
                  customerNumber == "") {
                  setInvalidData(true);
                  return;
            }
            let errorText = "";
            if (orderAmount > UPPER_ORDER_AMOUNT) {
                  errorText += ("Order Amount too large\n");
            }
            if (orderAmount < LOWER_ORDER_AMOUNT) {
                  errorText += ("Order Amount too small\n");
            }
            if (customerName.length < 3) {
                  errorText += ("Customer Name too short\n");
            }
            if (true) {
                  const selectedDate = new Date(orderDate).getTime();
                  const today = new Date().getTime();
                  let oneYearFromNow = new Date();
                  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
                  oneYearFromNow = oneYearFromNow.getTime();
                  console.log(Object.prototype.toString.call(new Date(orderDate)));
                  if (selectedDate > today || selectedDate <= oneYearFromNow) {
                        errorText += ("Date should be within last 1 year\n");
                  }
                  else if (Object.prototype.toString.call(new Date(orderDate)) != '[object Date]') {
                        errorText += ("Invalid Date\n");
                  }
            }
            if (errorText.length !== 0) {
                  alert(errorText);
                  return;
            }
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                  if (this.readyState === 4 && this.status === 200) {
                        const dataReceived = this.responseText;
                        if (dataReceived === "0") { //Duplicate Order_ID
                              //alert("Duplicate Order ID");
                              setOrderIDExist(true);
                              return;
                        }
                        else if (dataReceived === "1") { //Success
                              window.location.reload();
                        }
                        else if (dataReceived === "2") { // Data Invalid
                              alert("Data might be Incorrect");
                        }
                  }
            }
            req.open("POST", DATA.SOURCE + "AddData", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            const param = (name, value, addAmpersand = "&") => {
                  console.log(name + " : " + value);
                  if (value === "" || value === null) {
                        value = "NULL_NONE";
                  }
                  return (addAmpersand + name + "=" + value);
            }
            req.send(param("order_id", orderID, "") +
                  param("customer_name", customerName) +
                  param("customer_id", customerNumber) +
                  param("order_amount", orderAmount) +
                  param("approval_status", orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "Awaiting Approval" : "Approved") +
                  param("approved_by", orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "" : username.split("_").join(" ")) +
                  param("notes", notes) +
                  param("order_date", orderDate));
      }

      return (
            <Modal show={addModalVisible} onHide={handleClose} backdrop={'static'} keyboard={false}>
                  <Modal.Header closeButton>
                        <Modal.Title>ADD ORDER</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <table className="add-table-style" cellpadding="10px" cellspacing="5px">
                              <tr>
                                    <td>
                                          <label htmlFor="order-id" >Order ID</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={orderIDExist || (invalidData && orderID == "")}
                                                overlay={<Tooltip >{orderIDExist ?
                                                      "Order ID Already Exists" : "Invalid Order ID"}
                                                </Tooltip>}>
                                                <input className={"add-input-box arrow-hidden"} type="number"
                                                      id="order-id" min="0" value={orderID}
                                                      style={{ width: orderID === "" ? "110px" : "220px" }}
                                                      onChange={(e) => { setOrderID(e.target.value); }} />
                                          </OverlayTrigger>
                                          {orderID === "" ?
                                                <button className={"add-edit-button add-suggested-orderid"}
                                                      onClick={() => { suggestOrderID(); }}>
                                                      Autogenerate</button>
                                                : null}
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="order-date" >Order Date</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={invalidData && orderDate === ""}
                                                overlay={<Tooltip >Required</Tooltip>}>
                                                <input className={"add-input-box"} type="date" id="order-date"
                                                      onChange={(e) => setOrderDate(e.target.value)}
                                                      max={currentDate()} min={currentDate(true)} />
                                          </OverlayTrigger>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="customer-name" >Company Name</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={invalidData && customerName === ""}
                                                overlay={<Tooltip >Required</Tooltip>}>
                                                <input className={"add-input-box"} type="text" id="customer-name"
                                                      onChange={(e) => setCustomerName(e.target.value)} />
                                          </OverlayTrigger>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="customer-number" >Company Number</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={invalidData && customerNumber == ""}
                                                overlay={<Tooltip >Required</Tooltip>}>
                                                <input className={"add-input-box arrow-hidden"} type="number" id="customer-number"
                                                      min="0" onChange={(e) => setCustomerNumber(e.target.value)} />
                                          </OverlayTrigger>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="order-amount" >Order Amount</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={invalidData
                                                && (orderAmount == "" || orderAmount < 1)}
                                                overlay={<Tooltip >{orderAmount == "" ? "Required" : "Enter a Valid Amount"}</Tooltip>}>
                                                <input className={"add-input-box"} type="number" id="order-amount"
                                                      min="0" max={UPPER_ORDER_AMOUNT} onChange={(e) => setOrderAmount(e.target.value)} />
                                          </OverlayTrigger>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="notes" >Notes</label>
                                    </td>
                                    <td>
                                          <input className={"add-input-box"} type="text" id="notes"
                                                onChange={(e) => setNotes(e.target.value)} />
                                    </td>
                              </tr>
                        </table>
                        <button className="add-edit-button" style={{ marginLeft: "35%", marginTop: "3%" }}
                              onClick={() => { handleAdd() }}>
                              <span className="button-text">
                                    Add
                                    </span>
                        </button>
                  </Modal.Body>
            </Modal >
      );
};

export default AddButton;