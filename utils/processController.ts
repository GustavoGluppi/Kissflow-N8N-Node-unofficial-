import {
	ICredentialDataDecryptedObject,
	IDataObject,
	IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow/dist/Interfaces.js';

export async function getItemDetails(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'GET',
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/admin/${processId}/${instanceId}`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}
