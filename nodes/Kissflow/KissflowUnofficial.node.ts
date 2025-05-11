import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { processOperations, processFields } from './ProcessesDescription';

export class Kissflow implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kissflow (unofficial)',
		name: 'kissflowUnofficial',
		icon: 'file:Kissflow.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Kissflow API',
		description: 'Post and Get data from Kissflow API',
		defaults: {
			name: 'Kissflow Pics',
		},
		inputs: ['main'],
		outputs: ['main'],
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
				],
				default: 'process',
			},

			...processOperations,
			...processFields,
		],
	};
}
