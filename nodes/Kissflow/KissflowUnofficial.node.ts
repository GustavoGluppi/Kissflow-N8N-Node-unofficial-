import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { processFields, processOperations } from './Descriptions/ProcessesDescription';
import { getItemDetails } from '../../utils/processController';
import { getCardDetails } from '../../utils/boardController';
import { boardOperations, boardFields } from './Descriptions/BoardsDescription';

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
		// Creating node's fields
		properties: [
			// Resource (main) field
			{
				displayName: '🧭 Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: '📙 Process Action',
						value: 'process',
					},
					{
						name: '🔲 Board Action',
						value: 'board',
					},
				],
				default: 'process',
				required: true,
			},

			// "Process Action" fields
			...processOperations,
			...processFields,

			// "Board Action" fields
			...boardOperations,
			...boardFields,
		],
	};

	// Adding node's backend (API requests)
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();

		const returnData = [];

		// Gettin' parameters from GUI
		const resource = this.getNodeParameter('resource', 0) as string;
		const credentials = await this.getCredentials('KissflowApi');

		// For each item, make an API call
		for (let i = 0; i < items.length; i++) {
			switch (resource) {
				case 'process':
					// Gettin' operation from GUI
					const processesOperations = this.getNodeParameter('processesOperations', 0) as string;

					// Gettin' parameters from GUI
					const processId = this.getNodeParameter('processId', i) as string;
					const instanceId = this.getNodeParameter('instanceId', i) as string;

					if (processesOperations === 'getItemDetails') {
						const reqResponse = await getItemDetails.call(this, processId, instanceId, credentials);
						returnData.push(reqResponse);
					}

					break;
				case 'board':
					// Gettin' operation from GUI
					const boardsOperations = this.getNodeParameter('boardsOperations', 0) as string;

					// Gettin' parameters from GUI
					const caseId = this.getNodeParameter('caseId', i) as string;
					const itemId = this.getNodeParameter('itemId', i) as string;

					if (boardsOperations === 'getCardDetails') {
						const reqResponse = await getCardDetails.call(this, caseId, itemId, credentials);
						returnData.push(reqResponse);
					}

					break;
				default:
					break;
			}
		}

		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
