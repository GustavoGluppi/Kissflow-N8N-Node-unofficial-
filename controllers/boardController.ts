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

export async function updateCardStatus(
	this: IExecuteFunctions,
	caseId: string,
	itemId: string,
	statusId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/

	const cardDetails = await getCardDetails.call(this, caseId, itemId, credentials);
	const actualStatus = cardDetails._status_id;

	const options: IRequestOptions = {
		method: 'POST',
		body: JSON.stringify({ _status_id: statusId }),
		url: `https://${credentials['subdomain']}.kissflow.com/case/2/${credentials['accountId']}/${caseId}/${itemId}/${actualStatus}/move`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}
