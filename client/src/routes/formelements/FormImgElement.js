import { StyledColumn, StyledImage } from '../FormStyles';

//this is the function for image element in create outpass page

function FormImgElement(props){
    return <StyledColumn>
              <StyledImage src={props.src} alt="Student Image" />
    </StyledColumn>
}

export default FormImgElement;