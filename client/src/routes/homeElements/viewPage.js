import {CloseModalButton} from "./modalStyles";
import styled from "styled-components";
import { useEffect,useState } from "react";
import { fetchOutpassRecords,fetchPersonalDetails } from "../../api-calls";
import moment from "moment";

const formatDate = (date)=>{
  var formattedDate = moment(date).format("DD/MM/YY");
  return formattedDate;
}
const ModalContent = styled.div`
  line-height: 1.9;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 3;
`;
const ModalWrapper = styled.div`
  width: 600px;
  max-height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #DAFFFB;
  color: #001C30;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  overflow: auto;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  top: 0;
`;
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 0.5px solid white;
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 1rem;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
  display: flex;
  margin-top: 10px;
  border-radius: 0.5rem;
`;

export const FormField = styled.div`
  padding-top: 10px;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
`;
export default function ViewPage(props){
  const [data,setData]=useState([]);
  const [personalData,setPersonalData]=useState([]);
  useEffect(() => {
    // Fetch approved outpasses
    fetchOutpassRecords(props.outNo)
      .then((data) => {
        setData(data);  
      })
      .catch((error) => {
        console.error("Error fetching approved outpass records:", error);
      });
    // Fetch personal data
    fetchPersonalDetails(props.email)
    .then((data) => {
      setPersonalData(data);
    })
    .catch((error) => {
      console.error("Error fetching approved outpass records:", error);
    });
  }, [props.outNo,props.email]);
    return(
        <>
        {props.showModal3 ? 
        <Background>
          <ModalWrapper showModal3={props.showModal3}>
            <ModalContent>
            {personalData.map((c) => (
                <FormField key={c.regno}>
                  <h1>Outpass ID #{props.outNo}</h1>
                  <Image src={c.image} alt="Profile Image" />
                  <Label>Name:</Label>
                  <Input type="text" value={c.name} readOnly />
                  <Label>Registration Number:</Label>
                  <Input type="text" value={c.regno} readOnly />
                  <Label>Branch:</Label>
                  <Input type="text" value={c.branch} readOnly />
                  <Label>Year:</Label>
                  <Input type="text" value={c.year} readOnly />
                  <Label>Hostel No:</Label>
                  <Input type="text" value={c.hostel_no} readOnly />
                  <Label>Room No:</Label>
                  <Input type="text" value={c.room_no} readOnly />
                </FormField>
              ))}

            {data.map((c) => (
                <FormField style={{marginTop:"455px"}}> 
                  <Label>Leave Date:</Label>
                  <Input value={formatDate(c.go_date)} readOnly />
                  <Label>Return date:</Label>
                  <Input value={formatDate(c.return_date)} readOnly />
                  <Label>Reason:</Label>
                  <Input type="text" value={c.reason} readOnly />
                  <Label>Transport:</Label>
                  <Input type="text" value={c.transport} readOnly />
                  <h3 style={{color: "green"}}>Status: {c.status}</h3>
                </FormField>
              ))}
            </ModalContent>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => props.setShowModal3(prev => !prev)}
            />
          </ModalWrapper>
      </Background>
        : null}
        </>
    )
}