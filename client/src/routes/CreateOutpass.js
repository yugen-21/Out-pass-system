import FormTextElement from "./formelements/FormTextElement";
import FormImgElement from "./formelements/FormImgElement";
import FormDateElement from "./formelements/FormDateElement";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import Notification from "./others/NotificationElement";
import {
  MainContainer,
  StyledForm,
  StyledRow,
  StyledButton
} from "./FormStyles";
import  {fetchExistingOutPassRecords} from "../api-calls";

export default function CreateOutpass(props) {
    //imported from react-router-dom to help us go to another page
    const navigate = useNavigate();
  
    //these 4 are the components that i will be entering myself
    const [leaveDate, setLeaveDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [reason, setReason] = useState("");
    const [transport, setTransport] = useState("");
  
    //these are the components that will auto fill
    const [Img, setImg] = useState("");
    const [studentName, setName] = useState("");
    const [regNo, setRegNo] = useState(0);
    const [hostelNo, setHostelNo] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState(0);
  
    
  
    const formatDate = (dateString) => {
      // Ensure dateString is a string
      const formattedDateString = dateString.toString();
  
      const [day, month, year] = formattedDateString.split("/");
      // Construct a new Date object with the correct format (yyyy-mm-dd)
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return formattedDate.toISOString().split("T")[0];
    };
  
    const formattedLeaveDate = leaveDate ? formatDate(leaveDate) : null;
    const formattedReturnDate = returnDate ? formatDate(returnDate) : null;
  
    //this function takes the records and checks if there is any overlap of dates
    const checkDateOverlap = (existingRecords) => {
      for (const record of existingRecords) {
        const recordLeaveDate = new Date(record.go_date);
        const recordReturnDate = new Date(record.return_date);
  
        if (
          (leaveDate <= recordReturnDate && returnDate >= recordLeaveDate) ||
          (leaveDate >= recordLeaveDate && leaveDate <= recordReturnDate) ||
          (returnDate >= recordLeaveDate && returnDate <= recordReturnDate)
        ) {
          return true; // Overlap found
        }
      }
  
      return false; // No overlap found
    };
  
    //this function submits the stuff from the form to the database
  const submitFormToServer = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/insert?email=" + props.email,
        {
          goDate: formattedLeaveDate,
          returnDate: formattedReturnDate,
          reason: reason,
          transport: transport,
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      throw error;
    }
  };
  
    const submitData = async (event) => {
      event.preventDefault();
  
      // Check if any of the required fields are empty
      if (!leaveDate || !returnDate || !reason || !transport) {
        // Set an error state or display a validation message for the empty fields
        Notification({
          type: "warning",
          message: "Field(s) cannot be empty!",
        });
        return;
      }
  
      if (returnDate < leaveDate) {
        Notification({
          type: "warning",
          message: "Enter valid return date!",
        });
        return;
      }
  
      try {
        const existingRecords = await fetchExistingOutPassRecords(props.email);
  
        // Perform date overlap check
        const isOverlap = checkDateOverlap(existingRecords);
        if (isOverlap) {
          Notification({
            type: "warning",
            message: "Leave dates overlap with existing records!",
          });
          return;
        }
  
        // If no overlap, proceed with submitting the form data
        const response = await submitFormToServer();
        if (response.success) {
          Notification({
            type: "success",
            message: "Records updated successfully!",
            close: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          Notification({
            type: "error",
            message: "An error occurred while submitting form data.",
          });
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        Notification({
          type: "error",
          message: "An error occurred while submitting form data.",
        });
      }
    };
  
    // Fetch existing outpass records when the component initializes
    useEffect(() => {
      const fetchRecords = async () => {
        try {
          const existingRecords = await fetchExistingOutPassRecords(props.email);
        } catch (error) {
          console.error("Error fetching existing records:", error);
        }
      };
  
      fetchRecords();
    }, []); // Empty dependency array ensures the effect runs only once during initialization
  
    //this posts info from my database to the form for prefill data
    useEffect(() => {
      const url = "http://localhost:3001/select?email=" + props.email;
      Axios.get(url).then((response) => {
        const data = response.data;
        //console.log(data);
        data.map((part) => {
          setImg(part.image);
          setName(part.name);
          setRegNo(part.regno);
          setHostelNo(part.hostel_no);
          setRoomNo(part.room_no);
          setBranch(part.branch);
          setYear(part.year);
        });
      });
    }, [props.email]);

  return (
    <>
      <MainContainer>
        <StyledForm>
        <StyledRow>
        <h2>Create Outpass</h2>
        </StyledRow>
          <StyledRow>
            <FormImgElement src={Img} />
            <FormTextElement name="Name" value={studentName} readOnly={true} />
            <FormTextElement
              name="Register Number"
              value={regNo}
              readOnly={true}
            />
          </StyledRow>

          <StyledRow>
            <FormTextElement
              name="Hostel No"
              value={hostelNo}
              readOnly={true}
            />
            <FormTextElement name="Room No" value={roomNo} readOnly={true} />
          </StyledRow>

          <StyledRow>
            <FormTextElement name="Branch" value={branch} readOnly={true} />
            <FormTextElement name="Year" value={year} readOnly={true} />
          </StyledRow>

          <StyledRow>
            <FormTextElement
              name="Reason of leaving"
              onChange={(value) => setReason(value)}
            />
            <FormTextElement
              name="Mode of transport"
              onChange={(value) => setTransport(value)}
            />
          </StyledRow>

          <StyledRow>
            <FormDateElement
              name="Leave Date"
              selectedDate={leaveDate}
              onDateChange={setLeaveDate}
            />
            <FormDateElement
              name="Return Date"
              selectedDate={returnDate}
              onDateChange={setReturnDate}
            />
          </StyledRow>
          <StyledRow>
          <StyledButton type="submit" onClick={submitData}>
            Submit
          </StyledButton>
          </StyledRow>
        </StyledForm>
      </MainContainer>
      <ToastContainer />
    </>
  );
}








  
