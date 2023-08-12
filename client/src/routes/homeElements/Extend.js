import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 0.9rem;
  padding: 0 20px;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  height: 2rem;
  border: none;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #384278 0%, #1851b5 79%);
  }
`;


//this is the extend button
export default function Extend(props){
  const openModal = () =>{
    props.setShowModal1(prev => !prev);
    props.setKey(props.outNo);
  }
    return(
        <>
        <StyledButton onClick={openModal}>Extend</StyledButton>
        </> 
    );
}