import { useEffect, useState } from "react";
import { fetchHistoryDetails } from "../api-calls";
import ZeroMessage from "./homeElements/zeroMessage";
import "../styles.css";
import moment from "moment";

const formatDate = (date) => {
  var formattedDate = moment(date).format("DD-MM-YYYY");
  return formattedDate;
};
export default function ViewHistory(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchHistoryDetails(props.email)
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [props.email]);
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (data.length === 0) {
    return <ZeroMessage message="No history!" />;
  } else {
    return (
      <>
        <div className="main-container">
          <h2>History</h2>
          <hr />
          <div className="tab table-responsive">
            <table>
              <thead>
                <tr>
                  <th scope="col">Outpass ID</th>
                  <th scope="col">Leave Date</th>
                  <th scope="col">Return Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.map((c) => (
                  <tr key={c.out_no}>
                    <th scope="row">{c.out_no}</th>
                    <td>{formatDate(c.go_date)}</td>
                    <td>{formatDate(c.return_date)}</td>
                    <td>{c.reason}</td>
                    <td style={{color:"red"}}>{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
