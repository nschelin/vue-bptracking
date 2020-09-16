const { Db } = require('mongodb');
db.createUser({
	user: 'admin',
	pwd: 'secret',
	roles: [
		{
			role: 'readWrite',
			db: 'bptracking',
		},
	],
});
