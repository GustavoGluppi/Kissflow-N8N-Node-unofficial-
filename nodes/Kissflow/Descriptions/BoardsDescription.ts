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
			{
				name: 'Update the Status of an Item',
				value: 'updateStatusCard',
				description: 'Changes the status of a specific item in the board',
				action: 'Update card status',
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
export const updateCardStatusOperation: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['board'],
				boardsOperations: ['updateStatusCard'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		default: '',
		description: 'The unique identifier for a status in the board',
		displayOptions: {
			show: {
				resource: ['board'],
				boardsOperations: ['updateStatusCard'],
			},
		},
		type: 'string',
		required: true,
	},
];

// Exporting all fields
export const boardFields: INodeProperties[] = [
	...boardDefaultFields,
	...getCardDetailsOperation,
	...createCardOperation,
	...updateCardStatusOperation,
];

// TODO: "Update the status of an item" operation (auto complete?)
// TODO: "Update custom form field" operation
// TODO: "Get all items" operation
// TODO: "Download an attachment from an attachment field" operation
// TODO: "Upload an attachment to an attachment field" operation
// TODO: Pull form fields
