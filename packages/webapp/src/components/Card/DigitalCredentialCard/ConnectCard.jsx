import Card from '../index';
import { Semibold, Text } from '../../Typography';
import styles from './styles.module.scss';
import { QRCodeCanvas } from 'qrcode.react';
import { axios, getHeader } from '../../../containers/saga';
import {useEffect,useState} from "react";
import { url } from '../../../apiConfig';

const digitalCredentialUrl = (email) => `${url}/login/didconnect`;

export function ConnectCard({ style }) {
  const [invitationUrl, setInvitationUrl] = useState(null);
  useEffect(() => {
    async function getInvitationUrl() {
    	console.error("getInvitationUrl:beg");
	try{
  		const result=await axios.get(digitalCredentialUrl(''));
		setInvitationUrl(JSON.stringify(result.data.invitationUrl));
	}catch(e){
		setInvitationUrl(e.toString());
	}
    	console.error("getInvitationUrl:end");
    };
    if (!invitationUrl) {
        getInvitationUrl();
    }
  }, []);
  return(
    <Card color={'info'} style={{ ...style,...{padding:4,display:"unset",textAlign:"center"} }} className={styles.card}>
	  <div>
		<Semibold className={styles.updated}>
			  Connect using Wallet
		</Semibold>
	  </div>
	  <div>
		  <QRCodeCanvas
			value={invitationUrl}
			width={300}
			height={300}
			marginSize={0}
			includeMargin={false}
			bgColor="#028577"
			fgColor="#FFFFFF"
	  		style={{
				width:300,
				height:300,
				border:"8px solid #028577",
			}}
		  />
	  </div>
    </Card>
  );
}
