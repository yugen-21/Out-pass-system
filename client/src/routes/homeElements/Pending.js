import "../../styles.css";
import Extend from "./Extend";
import Cancel from "./Cancel";
import moment from"moment";
import ZeroMessage from "./zeroMessage";

const formatDate = (date)=>{
  var formattedDate = moment(date).format("DD/MM/YY");
  return formattedDate;
}
const getDay = (date)=>{
  var day = moment(date).format('dddd').substring(0,3);
  return day;
}
export default function Pending(props) {
  if(props.data.length === 0){
    return(
      <>
      <ZeroMessage message="No outpasses in waiting!"/>
      </>
    );
  }
  else{
  return (
    <div className="main-container">
      <h2>Waiting out-passes:</h2>
      <hr/>
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
            {props.data.map((c) => (
              <tr key={c.out_no}>
                <th scope="row">{c.out_no}</th>
                <td>{formatDate(c.go_date)} {getDay(c.go_date)}</td>
                <td>{formatDate(c.return_date)}  {getDay(c.return_date)}</td>
                <td>{c.reason}</td>
                <td><Extend showModal1={props.showModal1} setShowModal1={props.setShowModal1} outNo={c.out_no} setKey={props.setKey}/></td>
                <td><Cancel showModal2={props.showModal2} setShowModal2={props.setShowModal2} outNo={c.out_no} setKey={props.setKey}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
}

