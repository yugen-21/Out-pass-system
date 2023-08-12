import styled, { css } from "styled-components";
import DatePicker from "react-datepicker"; 
export const MainContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 40vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: black;
  @media only screen and (max-width: 320px) {
    width: 90vw;
    height: 220vh;
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 100%;
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 165vh;
  }
  @media only screen and (min-width: 768px) {
    width: 75vw;
    height: 100%;
  }
  @media only screen and (min-width: 1024px) {
    width: 60vw;
    height: 145vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 45vw;
    height: 115vh;
  }
`;
export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: 40px; 
`;

export const sharedStyles = css`
  margin: 10px 0 20px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 1rem;
  width: 90%;
  height: 3rem;
  border: black;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  ${sharedStyles}
`;

// export const StyledDatePicker = styled(DatePicker).attrs(() => ({
//   // Apply default styles to the StyledDatePicker component
//   style: {
//     display: 'inline-block', // Set the desired display property for the date-picker (e.g., block, inline-block, flex, etc.)
//   },
// }))`
//   ${sharedStyles}`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

export const StyledButton = styled.button`
  display: block;
  font-size: 0.9rem;
  padding: 0 20px;
  margin-left: 20px;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #384278 0%, #1851b5 79%);
  }
`;

export const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 20px;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  h2{
    padding-left: 20px;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column; 
  }
`;

export const StyledLabel = styled.label`
  margin-right: 10px;
`;