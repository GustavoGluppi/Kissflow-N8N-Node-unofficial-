import { INodeProperties } from 'n8n-workflow';

// Creating resource's operations
export const boardOperations: INodeProperties[] = [
	{
		displayName: '🛠️ Operation',
		name: 'boardsOperations',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['board'],
			},
		},
		options: [
			{
				name: 'Get Item Card Details',
				value: 'getCardDetails',
				description: 'Retrieves the details of a specific item card from your board',
				action: 'Get card details',
			},
		],
		default: 'getCardDetails',
	},
];

// operation's fields
export const getCardDetailsOperation: INodeProperties[] = [
	{
		displayName: 'Case ID',
		name: 'caseId',
		default: '',
		description: 'The unique identifier for each board',
		displayOptions: {
			show: {
				resource: ['board'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Item ID',
		name: 'itemId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['board'],
				boardsOperations: ['getCardDetails'],
			},
		},
		type: 'string',
		required: true,
	},
];

// Exporting all fields
export const boardFields: INodeProperties[] = [...getCardDetailsOperation];
