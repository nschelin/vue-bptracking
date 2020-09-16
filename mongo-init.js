const { Db } = require('mongodb');
db = db.db.createUser({
	user: 'admin',
	pwd: 'secret',
	roles: [
		{
			role: 'readWrite',
			db: 'bptracking',
		},
	],
});
