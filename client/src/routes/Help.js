import styled from "styled-components";
import {TbPointFilled} from "react-icons/tb";

const MainContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  font-family: 'Outfit', sans-serif;
  justify-content: center; 
//   align-items: center; 
  height: 70vh; /* Increase the height to make it more visible */
  width: 40vw; /* Increase the width to make it more visible */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  font-size: 1rem; /* Increase the font size for a more prominent heading */
  color: #074698;
  @media only screen and (max-width: 768px) {
    flex-direction: column; 
    max-height: 100%;
  }

  h3{
    padding-right: 20px;
    padding-left: 20px;
    font-size: 1.42rem;
  }
  h1{
    display: flex;
    justify-content: center;
    padding-bottom: 5px;
  }
`;

export default function Help(){
    return(
        <MainContainer>
            <h1>Help:</h1>
            <h3><TbPointFilled/> To apply for out-pass, click on "Create outpass" section and click "Submit".</h3>
            <h3><TbPointFilled/> You can keep track of your out-passes in your dashboard through the "Approved" and "Pending" sections.</h3>
            <h3><TbPointFilled/> You can only view your out-pass if it is approved.</h3>
            <h3><TbPointFilled/> All outpasses that are out of use, denied or cancelled can be viewed in the "View History" section.</h3>
            <h3><TbPointFilled/> If your warden has not approved your out-pass, you can contact them with the help of details given under the "Warden details" section.</h3>
            <h3><TbPointFilled/> Outpass cancellation cannot be undone.</h3>
        </MainContainer>
    )
}
