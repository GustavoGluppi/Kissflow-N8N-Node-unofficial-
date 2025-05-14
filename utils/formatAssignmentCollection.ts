import { AssignmentCollectionValue } from 'n8n-workflow';

export const formatAssignmentCollection = (
	assignmentCollection: AssignmentCollectionValue,
): { [key: string]: string } => {
	let itemDetails: { [key: string]: string } = {};
	for (const obj of assignmentCollection.assignments) {
		itemDetails[obj.name as string] = obj.value as string;
	}

	return itemDetails;
};
