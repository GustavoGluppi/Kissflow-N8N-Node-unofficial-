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
				name: 'Create Item',
				value: 'createItem',
				description: 'Creates a new item request in your process',
				action: 'Create item',
			},
			{
				name: 'Delete Item',
				value: 'deleteItem',
				description: 'Deletes a specific item from your process',
				action: 'Delete item',
			},
			{
				name: 'Get All Items',
				value: 'getAllItems',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
				description:
					'Retrieves the list of all items from a process. Only Process Admins can call this endpoint',
				action: 'Get all items',
			},
			{
				name: 'Get Item Details',
				value: 'getItemDetails',
				description: 'Retrieves the details of a specific item from your process',
				action: 'Get item details',
			},
			{
				name: 'Get Progress Details',
				value: 'getProgressDetails',
				description: 'Retrieves the progress of a specific item in your process',
				action: 'Get progress details',
			},
			{
				name: 'Reject an Item',
				value: 'rejectItem',
				description: 'Rejects a specific item in a workflow step of your process',
				action: 'Reject an item',
			},
			{
				name: 'Submit Item',
				value: 'submitItem',
				description: 'Submits an item in a workflow step of your process',
				action: 'Submit item',
			},
			{
				name: 'Update Item Details',
				value: 'updateItem',
				// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
				description:
					'Updates the records of a specific item in your process. Only Process Admins can call this endpoint',
				action: 'Update item',
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
		displayName: 'Item Body',
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
export const updateItemOperation: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['updateItem'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Item Body',
		name: 'itemDetails',
		type: 'assignmentCollection',
		default: {},
		description: 'Input details of the item you want to create',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['updateItem'],
			},
		},
		required: true,
	},
];
export const rejectItemOperation: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['rejectItem'],
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
				processesOperations: ['rejectItem'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Note',
		name: 'note',
		default: '',
		description: 'Additional notes for rejection',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['rejectItem'],
			},
		},
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
	},
];
export const getProgressDetailsOperations: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['getProgressDetails'],
			},
		},
		type: 'string',
		required: true,
	},
];
export const getAllItemsOperations: INodeProperties[] = [
	{
		displayName: 'Page Number',
		name: 'pageNumber',
		default: 1,
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'The specific page number of an item list. It can be specified as 1, 2, 3, etc',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['getAllItems'],
			},
		},
		type: 'number',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		required: true,
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		default: 50,
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'The number of items that can be listed in a page. It can be assigned any integer',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['getAllItems'],
			},
		},
		type: 'number',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		required: true,
	},
	{
		displayName: 'Apply Preference',
		name: 'applyPreference',
		default: false,
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period, n8n-nodes-base/node-param-description-boolean-without-whether
		description:
			'The applied preferences like filters, show/hide fields, and number of rows per page',
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['getAllItems'],
			},
		},
		type: 'boolean',
		required: true,
	},
];
export const deleteItemOperation: INodeProperties[] = [
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		default: '',
		description: "The item's unique identifier",
		displayOptions: {
			show: {
				resource: ['process'],
				processesOperations: ['deleteItem'],
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
	...updateItemOperation,
	...rejectItemOperation,
	...getProgressDetailsOperations,
	...getAllItemsOperations,
	...deleteItemOperation,
];

// TODO: "Add attaachment to a form field (Admin)" operation
// TODO: "Download attachment from a form field" operation
// TODO: Pull form fields
