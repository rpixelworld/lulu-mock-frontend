export const getRandomInt = max => {
	return Math.floor(Math.random() * max);
};

export const formatPhoneNumber = phoneNumber => {
	// Remove all non-digit characters from the input
	let cleaned = ('' + phoneNumber).replace(/\D/g, '');
	// Check if the input is of correct length
	if (cleaned.length !== 10) {
		throw new Error('Invalid phone number length');
	}
	// Capture the parts of the phone number
	let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	// Format and return the phone number
	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`;
	}
	return null;
};

export const generateOrderNumber = orderId => String(orderId).padStart(10, '0')

export const formatDate = dateString => {
	const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	return formattedDate
}

export const formatDateTime = dateTimeString => {
	const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
	});
	return formattedDate + ' ' + formattedTime
}

export const getStatus = status => {
	switch (status) {
		case 1: return 'Created'
		case 2: return 'Paid'
		case 3: return 'Shipped'
		case 9: return 'Cancelled'
		default: return
	}
}
