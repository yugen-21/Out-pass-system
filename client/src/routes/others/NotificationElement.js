import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification(props){
        const {close = 5000} = props;
    if(props.type==="success"){
            toast.success(props.message, {
            position: "top-center",
            autoClose: close,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    if(props.type === "warning"){
            toast.warn(props.message, {
            position: "top-center",
            autoClose: close,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    return null;
}

export default Notification;