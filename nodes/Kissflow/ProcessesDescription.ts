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
		],
		default: 'getItemDetails',
	},
];

// operation's fields
export const getItemDetailsOperation: INodeProperties[] = [
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
	},
];

// Exporting all fields
export const processFields: INodeProperties[] = [...getItemDetailsOperation];
