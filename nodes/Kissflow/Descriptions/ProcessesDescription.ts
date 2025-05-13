import { INodeProperties } from 'n8n-workflow';

// Creating resource's operations
export const processOperations: INodeProperties[] = [
	{
		displayName: '🛠️ Operation',
		name: 'processesOperations',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['process'],
			},
		},
		options: [
			{
				name: 'Get Item Details',
				value: 'getItemDetails',
				description: 'Retrieves the details of a specific item from your process',
				action: 'Get item details',
			},
			{
				name: 'Create Item',
				value: 'createItem',
				description: 'Creates a new item request in your process',
				action: 'Create item',
			},
			{
				name: 'Submit Item',
				value: 'submitItem',
				description: 'Submits an item in a workflow step of your process',
				action: 'Submit item',
			},
		],
		default: 'getItemDetails',
	},
];

// operation's fields
export const processDefaultFields: INodeProperties[] = [
	{
		displayName: 'Process ID',
		name: 'processId',
		default: '',
		description: 'The unique identifier for each process',
		displayOptions: {
			show: {
				resource: ['process'],
			},
		},
		type: 'string',
		required: true,
	},
];
export const getItemDetailsOperation: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['getItemDetails'],
			},
		},
		type: 'string',
		required: true,
	},
];
export const createItemOperation: INodeProperties[] = [
	{
		displayName: 'Auto-Submit Item?',
		name: 'autoSubmit',
		type: 'boolean',
		default: false,
		description: 'Whether to auto-submit the item after creation',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['createItem'],
			},
		},
		required: true,
	},
	{
		displayName: 'Item Details',
		name: 'itemDetails',
		type: 'assignmentCollection',
		default: {},
		description: 'Input details of the item you want to create',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['createItem'],
			},
		},
		required: true,
	},
];
export const submitItemOperation: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['submitItem'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Activity Instance ID',
		name: 'activityInstanceId',
		default: '',
		description: 'The unique identifier for each process step',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['submitItem'],
			},
		},
		type: 'string',
		required: true,
	},
];

// Exporting all fields
export const processFields: INodeProperties[] = [
	...processDefaultFields,
	...getItemDetailsOperation,
	...createItemOperation,
	...submitItemOperation,
];
