import react from 'react';
import { StyledColumn, StyledInput, StyledLabel } from '../FormStyles';

//this is the code for text element in the create outpass page 

function FormTextElement({ name, onChange,value,readOnly }) {
    const inputName = name.replace(/\s/g, "");
  
      const handleInputChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <StyledColumn>
        <StyledLabel htmlFor={inputName}>{name}</StyledLabel>
        <StyledInput type="text" name={inputName} onChange={handleInputChange} value={value} readOnly={readOnly}/>
      </StyledColumn>
    );
  }
  

export default FormTextElement;