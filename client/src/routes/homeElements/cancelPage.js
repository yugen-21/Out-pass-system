import styled from "styled-components";
import {Background, CloseModalButton} from "./modalStyles";
import { StyledButton } from "../FormStyles";
import Axios from "axios";
import Notification from "../others/NotificationElement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalWrapper = styled.div`
  width: 600px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #DAFFFB;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;

  p {
    margin-bottom: 10px;
    font-size: 20px;
  }
  div{
    display : flex;
  }
`;

export default function CancelPage(props){
  const cancelOutpass = async()=>{
    try{
      const response = await Axios.put("http://localhost:3001/cancel?out_no=" + props.outNo);
      return { success: true, data: response.data};
    }
    catch(error){
      throw error;
    }
  };
  const cancelProcess = async()=>{
    const response = await cancelOutpass();
    if(response.success){
      Notification({
        type: "success",
        message: "Outpass ID#"+props.outNo+" cancelled successfully!",
        close: 1000,
      });
      setTimeout(()=>{
        window.location.reload();
      },1000);
    }
  };
  const doNothing = ()=>{
    setTimeout(()=>{
      window.location.reload();
    },1000);
  };
    return(
        <>
        {props.showModal2 ? 
        <>
        <Background>
          <ModalWrapper showModal2={props.showModal2}>
            <ModalContent>
              <p>ARE YOU SURE YOU WANT TO CANCEL OUTPASS ID #{props.outNo}?</p>
              <p>This action is irreversible.</p>
              <div>
              <StyledButton onClick={cancelProcess}>YES</StyledButton>
              <StyledButton onClick={doNothing}>NO</StyledButton>
              </div>
            </ModalContent>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => props.setShowModal2(prev => !prev)}
            />
          </ModalWrapper>
      </Background>
      <ToastContainer />
      </>
        : null}
        </>
    )
}