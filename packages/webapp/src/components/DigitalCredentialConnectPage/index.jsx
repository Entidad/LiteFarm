import PropTypes from 'prop-types';
import { ConnectCard } from '../Card//DigitalCredentialCard/ConnectCard';
import Button from '../Form/Button';
import { useTranslation } from 'react-i18next';
import styles from '../../components/CustomSignUp/styles.module.scss';
export default function PureDigitalCredentialConnectPage({
  title,
  onGoBack
}) {
  const { t } = useTranslation(['translation', 'common', 'gender']);
  return (
	  <div className={styles.lander}>
        	<div className={styles.greetContainer}>
			<ConnectCard style={{ marginTop: '32px', maxWidth: '320px', marginBottom:'8px'}} />
			<Button onClick={onGoBack} color={'secondary'} type={'button'} >
				{t('common:BACK')}
			</Button>
	  	</div>
	  </div>
  );
}
PureDigitalCredentialConnectPage.prototype = {
	title: PropTypes.string,
	onGoBack: PropTypes.func.isRequired
};
