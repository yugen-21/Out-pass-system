import Axios from "axios";

export const fetchExistingOutPassRecords = async (email) => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/dates?email=" + email
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchWaitingOutpassRecords = async(email) =>{
    try{
      const response = await Axios.get(
        "http://localhost:3001/waiting?email=" + email
      );
      console.log(response.data);
      return response.data;
    }catch(error){
      throw error;
    }
  }

  export const fetchApprovedOutpassRecords = async(email) =>{
    try{
      const response = await Axios.get(
        "http://localhost:3001/approved?email=" + email
      );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  export const fetchOutpassRecords = async(out_no) =>{
    try{
      const response = await Axios.get(
        "http://localhost:3001/everything?out_no=" + out_no
      );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  export const fetchPersonalDetails = async(email) =>{
    try{
      const response = await Axios.get(
        "http://localhost:3001/select?email=" + email
      );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  export const fetchHistoryDetails = async(email) =>{
    try{
      const response =  await Axios.get( "http://localhost:3001/history?email=" + email);
      return (response).data;
    }
    catch(error){
      throw error;
    }
  }