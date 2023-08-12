import {
  Background,
  ModalContent,
  CloseModalButton,
} from "./modalStyles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchOutpassRecords } from "../../api-calls";
import moment from "moment";
import { FormField } from "./viewPage";
import FormDateElement from "../formelements/FormDateElement";
import { StyledButton } from "../FormStyles";
import Notification from "../others/NotificationElement";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledText = styled.p`
font-size: 24px;
padding-left: 20px;
`;

export const ModalWrapper = styled.div`
  width: 500px;
  max-height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #DAFFFB;
  color: #001C30;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding-top: 50px;
  padding-right: 20px;
  padding-left: 10px;
  padding-bottom: 20px;
`;

const formatDate = (date) => {
  var formattedDate = moment(date).format("DD/MM/YYYY");
  return formattedDate;
};

export default function ExtendPage(props) {
  const [returnDate, setReturnDate] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchOutpassRecords(props.outNo)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.outNo]);
  const submitDate = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/extend?out_no=" + props.outNo,
        {
          returnDate: returnDate,
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      throw error;
    }
  };
  const submitData = async () => {
    const goDate = moment(data[0]?.go_date).format("YYYY-MM-DD");
    if (moment(returnDate).isBefore(goDate)) {
      Notification({
        type: "warning",
        message: "Enter valid return date!",
      });
      return;
    }
    if (!returnDate) {
      Notification({
        type: "warning",
        message: "Enter a return date!",
      });
      return;
    }
    const response = await submitDate();
    if (response.success) {
      Notification({
        type: "success",
        message: "Records updated successfully!",
        close: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <>
      {props.showModal1 ? (
        <>
          <Background>
            <ModalWrapper showModal1={props.showModal1}>
              <ModalContent>
                {data.map((c) => (
                  <>
                    <FormField>
                      <StyledText>
                        Your current leave date is: {formatDate(c.go_date)}
                      </StyledText>
                      <StyledText>
                        Your current return date is: {formatDate(c.return_date)}
                      </StyledText>
                      <StyledText>Enter updated return date: </StyledText>
                      <FormDateElement
                        name="Return Date"
                        selectedDate={returnDate}
                        onDateChange={setReturnDate}
                      />
                      <StyledButton type="submit" onClick={submitData}>
                        SUBMIT
                      </StyledButton>
                    </FormField>
                  </>
                ))}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => props.setShowModal1((prev) => !prev)}
              />
            </ModalWrapper>
          </Background>
          <ToastContainer />
        </>
      ) : null}
    </>
  );
}
