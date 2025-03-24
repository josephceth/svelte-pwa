/**
 * Notification permission utility functions
 */

export enum NotificationPermissionStatus {
	GRANTED = 'granted',
	DENIED = 'denied',
	DEFAULT = 'default'
}

/**
 * Check if the browser supports notifications
 */
export function areNotificationsSupported(): boolean {
	return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Get the current notification permission status
 */
export function getNotificationPermission(): NotificationPermissionStatus {
	if (!areNotificationsSupported()) {
		return NotificationPermissionStatus.DENIED;
	}

	return Notification.permission as NotificationPermissionStatus;
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
	if (!areNotificationsSupported()) {
		return NotificationPermissionStatus.DENIED;
	}

	try {
		const permission = await Notification.requestPermission();
		return permission as NotificationPermissionStatus;
	} catch (error) {
		console.error('Error requesting notification permission:', error);
		return NotificationPermissionStatus.DENIED;
	}
}

/**
 * Check if notifications are currently allowed
 */
export function areNotificationsAllowed(): boolean {
	return getNotificationPermission() === NotificationPermissionStatus.GRANTED;
}
