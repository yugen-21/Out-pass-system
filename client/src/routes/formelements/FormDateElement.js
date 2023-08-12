import { StyledLabel, StyledColumn, StyledDatePicker } from '../FormStyles';

//this is the function for the date picker element in create outpass form

function FormDateElement({ name, selectedDate, onDateChange }){
    const item = `${name.replace(/\s/g, "")}`;

    return <StyledColumn>
        <StyledLabel htmlFor={item}>
                {name}
            </StyledLabel>
            <StyledDatePicker
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat="yyyy-MM-dd"
                isClearable
              />
    </StyledColumn>
}

export default FormDateElement;