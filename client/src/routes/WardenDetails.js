import { fetchPersonalDetails,fetchWardenDetails } from "../api-calls"
import { useEffect, useState } from "react"
import styled from "styled-components";

const MainContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  font-family: 'Outfit', sans-serif;
  justify-content: center; /* Align content horizontally */
  align-items: center; /* Align content vertically */
  max-height: 100%; /* Increase the height to make it more visible */
  width: 30vw; /* Increase the width to make it more visible */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  font-size: 1rem; /* Increase the font size for a more prominent heading */
//   color: #074698;
  @media only screen and (max-width: 768px) {
    flex-direction: column; 
  }
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

export default function WardenDetails(props){
    const [data1,setData1]=useState([]);
    const [data2,setData2] = useState([]);
    useEffect(()=>{
        fetchPersonalDetails(props.email).then((data)=>{setData1(data[0])}).catch((error)=>{console.log(error)});
    },[props.email])
    useEffect(() => {
        if (data1.hostel_no) {
            fetchWardenDetails(data1.hostel_no)
                .then((data) => {
                    setData2(data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [data1.hostel_no]);
    return(
        <div>
            {data2.hostel? 
            <MainContainer>
                <FormField>
                <Image src={data2.image} alt="Warden image" />
                <Label>Warden for hostel:</Label>
                <Input type="text" value={data2.hostel} readOnly />
                <Label>Name:</Label>
                <Input type="text" value={data2.name} readOnly />
                <Label>Email:</Label>
                <Input type="text" value={data2.email} readOnly/>
                <Label>Phone:</Label>
                <Input type="text" value={data2.phone} readOnly/>
                </FormField>
            </MainContainer>
            : <h1>"Loading.."</h1>}
        </div>
    )
}
