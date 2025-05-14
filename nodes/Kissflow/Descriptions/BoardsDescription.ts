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
				name: "Get Item's Details",
				value: 'getCardDetails',
				description: 'Retrieves the details of a specific item card from your board',
				action: 'Get card details',
			},
			{
				name: 'Create a New Item',
				value: 'createCard',
				description: 'Creates a new item in the board',
				action: 'Create card',
			},
		],
		default: 'getCardDetails',
	},
];

// operation's fields
export const boardDefaultFields: INodeProperties[] = [
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
];
export const getCardDetailsOperation: INodeProperties[] = [
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
export const createCardOperation: INodeProperties[] = [
	{
		displayName: 'Item Body',
		name: 'itemDetails',
		type: 'assignmentCollection',
		default: {},
		description: 'Input details of the item you want to create',
		displayOptions: {
			show: {
				resource: ['board'],
				boardsOperations: ['createCard'],
			},
		},
		required: true,
	},
];

// Exporting all fields
export const boardFields: INodeProperties[] = [
	...boardDefaultFields,
	...getCardDetailsOperation,
	...createCardOperation,
];

/*
 TO-DO:

 - "Update the status of an item" operation (auto complete?)
 - "Update custom form field" operation
 - "Get all items" operation
 - "Download an attachment from an attachment field" operation
 - "Upload an attachment to an attachment field" operation
 - Pull form fields
*/
