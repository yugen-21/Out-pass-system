import "../../styles.css";
import View from "./View";
import Cancel from "./Cancel";
import Extend from "./Extend";
import moment from "moment";
import ZeroMessage from "./zeroMessage";

const formatDate = (date) => {
  var formattedDate = moment(date).format("DD/MM/YY");
  return formattedDate;
};
const getDay = (date) => {
  var day = moment(date).format("dddd").substring(0, 3);
  return day;
};

export default function Approved(props) {
  const sortedData = [...props.data].sort((a, b) => {
    if (a.status === "In-use" && b.status !== "In-use") {
      return -1; // "In-use" rows come first
    } else if (a.status !== "In-use" && b.status === "In-use") {
      return 1; // "In-use" rows come first
    } else {
      return 0; // Preserve the order of other rows
    }
  });
  if (props.data.length === 0) {
    return (
      <>
        <ZeroMessage message="No outpasses are approved yet!" />
      </>
    );
  } else {
    return (
      <div className="main-container">
        <h2>Approved out-passes:</h2>
        <hr />
        <div className="tab table-responsive">
          <table>
            <thead>
              <tr>
                <th scope="col">Outpass ID</th>
                <th scope="col">Leave Date</th>
                <th scope="col">Return Date</th>
                <th scope="col">Reason</th>
                <th scope="col" className="None"></th>
                <th scope="col" className="None"></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {sortedData.map((c) => (
                <tr
                  style={{ color: c.status === "In-use" ? "green" : "inherit" }}
                >
                  {c.status === "In-use" ? (
                    <th scope="row">{c.out_no}</th>
                  ) : (
                    <th scope="row">{c.out_no}</th>
                  )}
                  <td>
                    {formatDate(c.go_date)} {getDay(c.go_date)}
                  </td>
                  <td>
                    {formatDate(c.return_date)} {getDay(c.return_date)}
                  </td>
                  <td>{c.reason}</td>
                  <td>
                    <View
                      showModal3={props.showModal3}
                      setShowModal3={props.setShowModal3}
                      outNo={c.out_no} setKey={props.setKey}
                    />
                  </td>
                  <td>
                    <Cancel
                      showModal2={props.showModal2}
                      setShowModal2={props.setShowModal2}
                      outNo={c.out_no} setKey={props.setKey}
                    />
                  </td>
                  {c.status === "In-use" ? (
                    <td style={{ display: "flex", marginRight: "0" }}>
                      <Extend
                        showModal1={props.showModal1}
                        setShowModal1={props.setShowModal1}
                        outNo={c.out_no} setKey={props.setKey}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
