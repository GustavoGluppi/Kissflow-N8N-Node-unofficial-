import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
	NodeConnectionType,
} from 'n8n-workflow';
import { processFields, processOperations } from './ProcessesDescription';

// Creating node UI and logic
export class KissflowUnofficial implements INodeType {
	// Setting node infos, such as UI components
	description: INodeTypeDescription = {
		displayName: 'Kissflow (unofficial)',
		name: 'kissflowUnofficial',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:Kissflow-Node-Icon.png',
		group: ['transform'],
		version: 1,
		subtitle: 'Kissflow API',
		description: 'Post and Get data from Kissflow API',
		defaults: {
			name: 'Kissflow',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'KissflowApi',
				required: true,
			},
		],
		/*
		requestDefaults: {
			baseURL: '={{ "https://" + $credentials["subdomain"] + ".kissflow.com"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		*/
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Process',
						value: 'process',
					},
					{
						name: 'Board',
						value: 'board',
					},
				],
				default: 'process',
				required: true,
			},

			...processOperations,
			...processFields,
		],
	};

	// Adding node's backend (API requests)
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		const processesOperations = this.getNodeParameter('processesOperations', 0) as string;

		const credentials = await this.getCredentials('KissflowApi');

		// For each item, make an API call
		for (let i = 0; i < items.length; i++) {
			if (resource === 'process') {
				if (processesOperations === 'getItemDetails') {
					// Get inputs's values
					const processId = this.getNodeParameter('processId', i) as string;
					const instanceId = this.getNodeParameter('instanceId', i) as string;

					// Make HTTP request according to https://api.kissflow.com/
					const options: IRequestOptions = {
						method: 'GET',
						url: `https://${credentials['subdomain']}.kissflow.com/process/2/${credentials['accountId']}/admin/${processId}/${instanceId}`,
						encoding: 'arrayBuffer',
					};

					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'KissflowApi',
						options,
					);

					console.log(responseData);

					returnData.push(JSON.parse(responseData));
				}
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
