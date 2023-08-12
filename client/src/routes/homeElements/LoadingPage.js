import styled from "styled-components";

export default function LoadingPage()
{
    return(
        <>
        <MainContainer>
        <h1>Loading..</h1>
        </MainContainer>
        </>
    );

}

const MainContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  font-family: 'Outfit', sans-serif;
  justify-content: center; /* Align content horizontally */
  align-items: center; /* Align content vertically */
  height: 50vh; /* Increase the height to make it more visible */
  width: 80vw; /* Increase the width to make it more visible */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  font-size: 1rem; /* Increase the font size for a more prominent heading */
  color: #001C30;
  @media only screen and (max-width: 768px) {
    flex-direction: column; 
  }
`;