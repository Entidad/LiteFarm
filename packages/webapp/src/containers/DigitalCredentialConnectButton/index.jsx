import { useDispatch } from 'react-redux';
import Button from '../../components/Form/Button';
import history from '../../history';
import { DIGITAL_CREDENTIAL_CONNECT_PAGE } from '../CustomSignUp/constants';

function DigitalCredentialConnectButton({ disabled }) {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
  };
  const onFailure = (res) => {
    console.log(res);
  };
  return (
    <Button 
	color='secondary'
	buttonText="Connect"
	data-cy="continueDigitialCredentialConnect"
	onSuccess={onSuccess}
	onFailure={onFailure}
	onClick={(e)=>{
		e.nativeEvent.stopPropagation();
		e.nativeEvent.preventDefault();
		history.push(
			{
			  pathname: '/',
			},
			{
			  component: DIGITAL_CREDENTIAL_CONNECT_PAGE ,
			},
		);
      }}
      disabled={disabled}
      text="continue_with"
      width={812}
    >
      Didcomm Connect
    </Button >
  );
}


export default DigitalCredentialConnectButton;
