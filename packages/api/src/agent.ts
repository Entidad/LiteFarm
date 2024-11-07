//entidad - server singleton
import { Agent } from '@credo-ts/core'
import { agentDependencies } from '@credo-ts/node'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import { anoncreds } from '@hyperledger/anoncreds-nodejs'
import { AnonCredsModule } from '@credo-ts/anoncreds'
import { indyVdr } from '@hyperledger/indy-vdr-nodejs'
import { IndyVdrAnonCredsRegistry } from '@credo-ts/indy-vdr';
import { IndyVdrIndyDidResolver } from '@credo-ts/indy-vdr';
import { IndyVdrSovDidResolver } from '@credo-ts/indy-vdr';
import { IndyVdrModule } from '@credo-ts/indy-vdr';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConsoleLogger, LogLevel } from '@credo-ts/core'
import { KeyDerivationMethod } from '@credo-ts/core';
import { DidCommMimeType } from '@credo-ts/core';
import { AutoAcceptCredential } from '@credo-ts/core';
import { AutoAcceptProof } from '@credo-ts/core';
import { MediatorPickupStrategy } from '@credo-ts/core';
import { ConsoleLogger, LogLevel } from '@credo-ts/core';
import { ConnectionsModule } from '@credo-ts/core';
import { V2CredentialProtocol } from '@credo-ts/core';
import { KeyDidRegistrar } from '@credo-ts/core';
import { JwkDidRegistrar } from '@credo-ts/core';
import { WebDidResolver } from '@credo-ts/core';
import { KeyDidResolver } from '@credo-ts/core';
import { JwkDidResolver } from '@credo-ts/core';
import { MediationRecipientModule } from '@credo-ts/core';
import { DidsModule } from '@credo-ts/core';
import { V2ProofProtocol } from '@credo-ts/core';
import { CredentialsModule } from '@credo-ts/core';
import { ProofsModule } from '@credo-ts/core';
import { V1CredentialProtocol } from '@credo-ts/anoncreds';
import { V1ProofProtocol } from '@credo-ts/anoncreds';
import { LegacyIndyCredentialFormatService } from '@credo-ts/anoncreds';
import { LegacyIndyProofFormatService } from '@credo-ts/anoncreds';
import { AnonCredsProofFormatService } from '@credo-ts/anoncreds';
import { AnonCredsCredentialFormatService } from '@credo-ts/anoncreds';
import { AskarModule } from '@credo-ts/askar'
import{
	WsOutboundTransport,
	HttpOutboundTransport,
}from'@credo-ts/core'
function syncReadFile(filename){
	const result=readFileSync(join("./genesis/",filename),'utf-8');
	return result;
}
class ServerAgent {
	private static _instance:ServerAgent;
	private agent:null;
	private constructor() { }
	static getInstance() {
		if (this._instance) {
			return this._instance;
		}

		this._instance = new ServerAgent();
		this._instance.start();
		return this._instance;
	}
	private async start(){
		try{
			const genesisTransactions=syncReadFile('../genesis/candy.idlab.org.json');
			if(genesisTransactions==null||genesisTransactions.length==0){
				throw("Invalid genesis value");
			}
			const config: InitConfig = {
				id:'foo',
				key:'testkey000000000000000000000',
				label:'LiteFarm Cloud Agent',
				walletConfig: {
					id:'wallet-id',
					key:'testkey0000000000000000000000000',
				},
				logger:new ConsoleLogger(LogLevel.info),
				keyDerivationMethod:KeyDerivationMethod.Argon2IMod,
				didCommMimeType:DidCommMimeType.V1,
				autoAcceptCredentials:AutoAcceptCredential.Never,
				autoAcceptProofs:AutoAcceptProof.Never,
				clearDefaultMediator:false,
				mediatorPollingInterval:5000,
				mediatorPickupStrategy:MediatorPickupStrategy.PickupV2,
				maximumMessagePickup:10,
				useLegacyDidSovPrefix:false,
				autoUpdateStorageOnStartup:false,
				autoAcceptConnecitons:false,
			}
			this.agent = new Agent({
				config,
				dependencies: agentDependencies,
				modules: {
					askar: new AskarModule({
						ariesAskar,
					}),
					anoncreds: new AnonCredsModule({
						registries: [new IndyVdrAnonCredsRegistry()],
						anoncreds,
					}),
					indyVdr: new IndyVdrModule({
						indyVdr,
						networks: [
							{
								isProduction: false,
								indyNamespace: 'bcovrin:test',
								genesisTransactions: genesisTransactions,
								connectOnStartup: true,
							},
						],
					}),
					mediationRecipient:new MediationRecipientModule({
						mediatorInvitationUrl: 'https://some.mediator/invite?oob=some_oob'
					})
				},
			})
			this.agent.registerOutboundTransport(new WsOutboundTransport())
			this.agent.registerOutboundTransport(new HttpOutboundTransport())
			await this.agent.initialize()
		}catch(e){
			console.error(e.toString());
		}
	}
	public async invite(){
		let outOfBandRecord=await this.agent.oob.createInvitation();
		return({
			invitationUrl:outOfBandRecord.outOfBandInvitation.toUrl({domain:"test.com"}),
			outOfBandRecord,
		});
	}
	public async stop(){
		await this.agent.shutdown()
	}
}
export default ServerAgent;
