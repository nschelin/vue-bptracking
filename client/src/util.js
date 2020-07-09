import { format, parseISO } from 'date-fns';

const formatDate = date => {
	return date ? format(parseISO(date), 'MM/dd/yyyy') : '';
};

const getColor = (val, type) => {
	switch (type) {
		case 'sys':
			if (val <= 129) return 'green';
			else if (val < 139 && val > 129) return 'orange';
			else return 'red';
		case 'dia':
			if (val <= 80) return 'green';
			else if (val < 89 && val > 80) return 'orange';
			else return 'red';

		case 'bpm':
			if (val > 60 && val <= 100) return 'green';
			else return 'orange';
		default:
			break;
	}
};

export { formatDate, getColor };
