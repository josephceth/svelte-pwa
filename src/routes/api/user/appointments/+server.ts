import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Mock appointments data
	const appointments = [
		{
			clientName: 'John Smith',
			locationName: 'Downtown Office Building',
			workOrderId: 'WO-2024-1234',
			startDateTime: '2024-03-20T09:00:00',
			endDateTime: '2024-03-20T11:00:00',
			title: 'HVAC Quarterly Maintenance',
			description:
				'Perform quarterly maintenance on rooftop HVAC units 1-4. Check filters, belts, and refrigerant levels. Clean condenser coils and verify proper operation of all units.',
			address: {
				street: '123 Business Ave',
				city: 'Downtown',
				state: 'NY',
				zipCode: '10001'
			}
		},
		{
			clientName: 'Sarah Johnson',
			locationName: 'Westside Mall',
			workOrderId: 'WO-2024-1235',
			startDateTime: '2024-03-20T13:00:00',
			endDateTime: '2024-03-20T15:00:00',
			title: 'Escalator Safety Inspection',
			description:
				'Conduct monthly safety inspection of main entrance escalators. Check drive chains, step tracks, and handrail systems. Test emergency stop mechanisms and verify proper speed control.',
			address: {
				street: '789 Mall Boulevard',
				city: 'Westside',
				state: 'NY',
				zipCode: '10002'
			}
		},
		{
			clientName: 'Mike Williams',
			locationName: 'North Station Complex',
			workOrderId: 'WO-2024-1236',
			startDateTime: '2024-03-20T16:00:00',
			endDateTime: '2024-03-20T18:00:00',
			title: 'Emergency Lighting System Test',
			description:
				'Perform annual emergency lighting system inspection. Test battery backup systems, replace failed bulbs, and verify proper coverage in all emergency exit routes.',
			address: {
				street: '456 Station Road',
				city: 'North City',
				state: 'NY',
				zipCode: '10003'
			}
		},
		{
			clientName: 'Emily Davis',
			locationName: 'Central Park Hotel',
			workOrderId: 'WO-2024-1237',
			startDateTime: '2024-03-21T09:00:00',
			endDateTime: '2024-03-21T11:00:00',
			title: 'Kitchen Exhaust Cleaning',
			description:
				'Complete quarterly cleaning of main kitchen exhaust system. Clean hood filters, ductwork, and exhaust fans. Inspect fire suppression system and verify proper airflow.',
			address: {
				street: '321 Park Avenue',
				city: 'Central City',
				state: 'NY',
				zipCode: '10004'
			}
		},
		{
			clientName: 'Robert Brown',
			locationName: 'Tech Plaza',
			workOrderId: 'WO-2024-1238',
			startDateTime: '2024-03-21T13:00:00',
			endDateTime: '2024-03-21T15:00:00',
			title: 'Access Control System Maintenance',
			description:
				'Perform scheduled maintenance on building access control system. Test card readers, update firmware, verify door sensors, and check backup power systems.',
			address: {
				street: '555 Tech Drive',
				city: 'Innovation',
				state: 'NY',
				zipCode: '10005'
			}
		}
	];

	return json(appointments);
};
