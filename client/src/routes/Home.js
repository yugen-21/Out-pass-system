import {
  fetchWaitingOutpassRecords,
  fetchApprovedOutpassRecords,
} from "../api-calls";
import React, { useState, useEffect } from "react";
import ZeroMessage from "./homeElements/zeroMessage";
import Pending from "./homeElements/Pending";
import Approved from "./homeElements/Approved";
import ExtendPage from "./homeElements/ExtendPage";
import CancelPage from "./homeElements/cancelPage";
import ViewPage from "./homeElements/viewPage";

export default function Home(props) {
  const [outNo,setKey] =useState(0);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [isWaitingLoading, setisWaitingLoading] = useState(true);
  const [isApprovedLoading, setisApprovedLoading] = useState(true);
  const [waitingData, setWaitingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);

  useEffect(() => {
    // Fetch waiting outpasses
    fetchWaitingOutpassRecords(props.email)
      .then((data) => {
        setWaitingData(data);
        setisWaitingLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching waiting outpass records:", error);
        setisWaitingLoading(false);
      });

    // Fetch approved outpasses
    fetchApprovedOutpassRecords(props.email)
      .then((data) => {
        setApprovedData(data);
        setisApprovedLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching approved outpass records:", error);
        setisApprovedLoading(false);
      });
  }, [props.email]);

  var isLoading = isApprovedLoading || isWaitingLoading;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (waitingData.length === 0 && approvedData.length === 0) {
    return <ZeroMessage message="You haven't submitted any outpasses!" />;
  } else {
    return (
      <>
        <Pending
          data={waitingData}
          showModal1={showModal1}
          setShowModal1={setShowModal1}
          showModal2={showModal2}
          setShowModal2={setShowModal2}
          showModal3={showModal3}
          setShowModal3={setShowModal3}
          outNo = {outNo}
          setKey={setKey}
        />
        <Approved
          data={approvedData}
          showModal1={showModal1}
          setShowModal1={setShowModal1}
          showModal2={showModal2}
          setShowModal2={setShowModal2}
          showModal3={showModal3}
          setShowModal3={setShowModal3}
          outNo = {outNo}
          setKey={setKey}
        />
        <ExtendPage showModal1={showModal1} setShowModal1={setShowModal1} outNo={outNo} setKey={setKey} email={props.email}/>
        <CancelPage showModal2={showModal2} setShowModal2={setShowModal2} outNo={outNo} setKey={setKey} email={props.email}/>
        <ViewPage showModal3={showModal3} setShowModal3={setShowModal3}  outNo={outNo} setKey={setKey} email={props.email}/>
      </>
    );
  }
}
