import React from 'react';

function Table({ data, setTotalPage, setNoOfRows, setCheckedOrderID, resetTableColors }) {
      const orderIDs = [];
      const handleCheckbox = (checkedID) => {
            //console.log(checkedID);
            resetTableColors();
            document.getElementById(checkedID).style.backgroundColor = "#fc750020";
            setCheckedOrderID(checkedID);
      }
      const covertDateFormat = (date) => {
            try {
                  let dateInReceivedFormat = new Date(date);
                  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                  date = dateInReceivedFormat.getDate().toString();
                  if (date.length === 1) {
                        date = "0" + date;
                  }
                  return date +
                        "-" + month[dateInReceivedFormat.getMonth()] +
                        "-" + dateInReceivedFormat.getFullYear();
            }
            catch (err) {
                  return "null";
            }
      }
      const tableContent = () => {
            let keyVal = 0;
            const rows = Object.assign({}, data["data"]);
            const retVal = [];
            const len = parseInt(data.totalLength);
            setNoOfRows(len);
            let pageCount = Math.ceil(parseInt(data.totalLength) / 10);
            if (pageCount === 0) {
                  pageCount = 1;
            }
            setTotalPage(pageCount);
            let colorCount = 0;
            if (len > 0) {
                  let nullReplacer = (val) => {
                        if (val === "null") {
                              return "";
                        }
                        return val;
                  }
                  let fun = (entry) => {
                        orderIDs.push(entry.Order_ID);
                        return <tr id={entry.Order_ID} key={keyVal++} name={colorCount % 2 ? "even" : "odd"}
                              className={(colorCount++) % 2 ? "even-row" : "odd-row"}>
                              <input key={keyVal++} type="radio" name={"checkbox"} className="checkbox"
                                    value={entry.Order_ID} onClick={() => handleCheckbox(entry.Order_ID)} />
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(covertDateFormat(entry.Order_Date))}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Approved_By)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Order_ID)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Customer_Name)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Customer_ID)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Order_Amount)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Approval_Status)}</td>
                              <td className={"cell-style"} key={keyVal++} >{nullReplacer(entry.Notes)}</td>
                        </tr >
                  };

                  Object.keys(rows).forEach((rowNo) => {
                        retVal.push(fun(Object.assign({}, rows[rowNo])));
                  });
            }
            return retVal;
      }
      return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: "0.5%", width: "100%" }} />
                  <table cellspacing="0" cellpadding="0" className="table-style">
                        <tbody>
                              <tr>
                                    <td className={"cell-style"}></td>
                                    <td className={"cell-style"}>Order Date</td>
                                    <td className={"cell-style"}>Approved By</td>
                                    <td className={"cell-style"}>Order ID</td>
                                    <td className={"cell-style"}>Company Name</td>
                                    <td className={"cell-style"}>Company ID</td>
                                    <td className={"cell-style"}>Order Amount</td>
                                    <td className={"cell-style"}>Approval Status</td>
                                    <td className={"cell-style"}>Notes</td>
                              </tr>
                              <td colSpan={9}><hr width="100%" color="#fc7500" /></td>
                              {tableContent()}
                        </tbody >
                  </table>
            </div >
      );
}

export default Table;
