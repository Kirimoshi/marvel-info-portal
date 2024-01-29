import errorImg from './error.gif'
import './errorMessage.css';

const ErrorMessage = () => {
  return (
      <img className="error-img" src={errorImg} alt="error"/>
  )
}
export default ErrorMessage;