import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { processOperations, processFields } from './ProcessesDescription';

export class KissflowUnofficial implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kissflow (unofficial)',
		name: 'kissflowUnofficial',
		icon: 'file:Kissflow.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Kissflow API',
		description: 'Post and Get data from Kissflow API',
		defaults: {
			name: 'Kissflow',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: ['main' as NodeConnectionType],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main' as NodeConnectionType],
		credentials: [
			{
				name: 'KissflowApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{ "https://" + $credentials["subdomain"] + ".kissflow.com"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
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
			},

			...processOperations,
			...processFields,
		],
	};
}
