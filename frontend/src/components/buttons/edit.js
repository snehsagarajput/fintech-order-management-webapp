import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";


const EditButton = ({ editModalVisible, setEditModalVisible, username,
      checkedOrderID, DATA, UPPER_ORDER_AMOUNT, LOWER_ORDER_AMOUNT }) => {
      const [orderAmount, setOrderAmount] = useState("");
      const [oldOrderAmount, setOldOrderAmount] = useState("");
      const [notes, setNotes] = useState("");
      const [approvedBy, setApprovedBy] = useState("");

      const [invalidOrderAmount, setInvalidOrderAmount] = useState(false);


      const handleClose = () => {
            setEditModalVisible(false);
      }

      const handleEdit = () => {
            if (orderAmount == "" || orderAmount < LOWER_ORDER_AMOUNT || orderAmount > UPPER_ORDER_AMOUNT) {
                  setInvalidOrderAmount(true);
                  return;
            }
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                  if (this.readyState === 4 && this.status === 200) {
                        const dataReceived = this.responseText;
                        if (dataReceived === "0") { //SQL Error
                              alert("Data might be Incorrect");
                        }
                        else if (dataReceived === "1") { //Success
                              setEditedValues();
                              handleClose();
                        }
                        else { // Something Unexpected
                              alert("Something Unexpected :(");
                        }
                  }
            }
            req.open("POST", DATA.SOURCE + "UpdateData", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            const param = (name, value, addAmpersand = "&") => {
                  console.log(name + " : " + value);
                  return (addAmpersand + name + "=" + value);
            }
            req.send(param("order_id", checkedOrderID, "") +
                  param("order_amount", orderAmount) +
                  param("approval_status", orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "Awaiting Approval" : "Approved") +
                  param("approved_by", orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "NULL_NONE" : username.split("_").join(" ")) +
                  param("notes", notes === "" ? "NULL_NONE" : notes) +
                  param("changed", orderAmount == oldOrderAmount ? "0" : "1"));
      }

      const setEditedValues = () => {
            document.getElementById(checkedOrderID).children[8].textContent = notes;
            if (orderAmount != oldOrderAmount) {
                  document.getElementById(checkedOrderID).children[6].textContent = orderAmount;
                  document.getElementById(checkedOrderID).children[2].textContent =
                        (orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "" : username.split("_").join(" "));
                  document.getElementById(checkedOrderID).children[7].textContent =
                        (orderAmount > DATA.LEVEL_1_APPROVAL_AMOUNT ? "Awaiting Approval" : "Approved");
            }
      }

      const getStates = () => {
            if (editModalVisible) {
                  setOrderAmount(document.getElementById(checkedOrderID).children[6].textContent);
                  setOldOrderAmount(document.getElementById(checkedOrderID).children[6].textContent);
                  setNotes(document.getElementById(checkedOrderID).children[8].textContent);
                  setApprovedBy(document.getElementById(checkedOrderID).children[2].textContent);
            }
      }

      useEffect(() => {
            getStates();
      }, [editModalVisible]);

      useEffect(() => {
            invalidOrderAmount && setInvalidOrderAmount(false);
      }, [orderAmount]);


      return (
            <Modal show={editModalVisible} onHide={handleClose} backdrop={'static'} keyboard={false}>
                  <Modal.Header closeButton>
                        <Modal.Title>EDIT ORDER</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <table className="add-table-style" cellpadding="10px" cellspacing="5px">
                              <tr>
                                    <td>
                                          <label htmlFor="order-id" >Order ID</label>
                                    </td>
                                    <td>
                                          <input className={"add-input-box readonly-input"}
                                                value={checkedOrderID} readOnly />
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="order-amount" >Order Amount</label>
                                    </td>
                                    <td>
                                          <OverlayTrigger show={invalidOrderAmount}
                                                overlay={<Tooltip >
                                                      {orderAmount == "" ? "Required" : "Enter a Valid Amount"}
                                                </Tooltip>}>
                                                <input className={"add-input-box"} type="number" id="order-amount"
                                                      value={orderAmount} min="0" onChange={(e) => setOrderAmount(e.target.value)} required />
                                          </OverlayTrigger>
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="notes" >Notes</label>
                                    </td>
                                    <td>
                                          <input className={"add-input-box"} type="text"
                                                value={notes} onChange={(e) => setNotes(e.target.value)} />
                                    </td>
                              </tr>
                              <tr>
                                    <td>
                                          <label htmlFor="approved_by" >Approved By</label>
                                    </td>
                                    <td>
                                          <input className={"add-input-box readonly-input"} type="text"
                                                value={approvedBy === "" ? "Approval Awaiting" : approvedBy}
                                                onChange={(e) => setApprovedBy(e.target.value)}
                                                readOnly />
                                    </td>
                              </tr>
                        </table>
                        <button className="add-edit-button" style={{ marginLeft: "35%", marginTop: "3%" }}
                              onClick={() => { handleEdit() }}>
                              <span className="button-text">
                                    Edit
                                    </span>
                        </button>
                  </Modal.Body>
            </Modal >
      );
};

export default EditButton;