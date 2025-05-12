import { INodeProperties } from 'n8n-workflow';

export const processOperations: INodeProperties[] = [
	{
		displayName: 'Processes Operations',
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
				routing: {
					request: {
						method: 'GET',
						url: '=/process/2/{{$credentials["accountId"]}}/admin/{{$parameter["processId"]}}/{{$parameter["instanceId"]}}', //'={{ "/process/2/" + $credentials["accountId"] + "/admin/" + $parameter["processId"] + "/" + $parameter["instanceId"] }}',
					},
				},
			},
		],
		default: 'getItemDetails',
	},
];

const getItemDetailsOperation: INodeProperties[] = [
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

export const processFields: INodeProperties[] = [...getItemDetailsOperation];
