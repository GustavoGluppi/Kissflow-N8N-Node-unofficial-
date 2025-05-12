import { IAuthenticateGeneric, Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class KissflowApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'KissflowApi';
	displayName = 'Kissflow API';
	icon: Icon = 'file:Kissflow-Credential-Icon.png';
	//documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Account ID',
			name: 'accountId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'X-Access-Key-Id',
			name: 'keyId',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'X-Access-Key-Secret',
			name: 'keySecret',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Access-Key-Id': '={{$credentials.keyId}}',
				'X-Access-Key-Secret': '={{$credentials.keySecret}}',
			},
		},
	};
}
