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

export async function createItem(
	this: IExecuteFunctions,
	processId: string,
	itemDetails: { [key: string]: string },
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'POST',
		body: JSON.stringify(itemDetails),
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/${processId}`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}

export async function submitItem(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	activityInstanceId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'POST',
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/${processId}/${instanceId}/${activityInstanceId}/submit`,
		encoding: 'arrayBuffer',
	};
	await this.helpers.requestWithAuthentication.call(this, 'KissflowApi', options);

	const newItemDetails = await getItemDetails.call(this, processId, instanceId, credentials);
	const currentContext = newItemDetails._current_context as IDataObject[] | undefined;
	if (!currentContext) {
		throw new Error('No current context found in the response');
	}
	const newActivityInstanceId = currentContext[0]._context_activity_instance_id as string;

	return {
		_id: instanceId,
		ModelId: processId,
		_activity_instance_id: newActivityInstanceId,
	} as IDataObject;
}

export async function updateItem(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	itemDetails: { [key: string]: string },
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'PUT',
		body: JSON.stringify(itemDetails),
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

export async function rejectItem(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	activityInstanceId: string,
	notes: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'POST',
		body: JSON.stringify({ Notes: notes }),
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/${processId}/${instanceId}/${activityInstanceId}/reject`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}

export async function getProgressDetails(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'GET',
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/${processId}/${instanceId}/progress`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}

export async function getAllItems(
	this: IExecuteFunctions,
	processId: string,
	pageNumber: number,
	pageSize: number,
	applyPreference: boolean,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'GET',
		url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/admin/${processId}/item?page_number=${pageNumber}&page_size=${pageSize}&apply_preference=${applyPreference}`,
		encoding: 'arrayBuffer',
	};

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'KissflowApi',
		options,
	);

	return JSON.parse(responseData) as IDataObject;
}

export async function deleteItem(
	this: IExecuteFunctions,
	processId: string,
	instanceId: string,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Make HTTP request according to https://api.kissflow.com/
	const options: IRequestOptions = {
		method: 'DELETE',
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
