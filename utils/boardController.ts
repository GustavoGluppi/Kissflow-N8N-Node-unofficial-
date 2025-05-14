import {
	ICredentialDataDecryptedObject,
	IDataObject,
	IExecuteFunctions,
	IRequestOptions,
} from 'n8n-workflow/dist/Interfaces.js';

export async function getCardDetails(
	this: IExecuteFunctions,
	caseId: string,
	itemId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'GET',
		url: `https://${credentials['subdomain']}.kissflow.com/case/2/${credentials['accountId']}/${caseId}/view/${caseId}_all/${itemId}`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}

export async function createCard(
	this: IExecuteFunctions,
	caseId: string,
	itemDetails: { [key: string]: string },
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'POST',
		body: JSON.stringify(itemDetails),
		url: `https://${credentials['subdomain']}.kissflow.com/case/2/${credentials['accountId']}/${caseId}`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}
