// const { Db } = require('mongodb');
db.auth('admin', 'secretpassword');
db = db.getSiblingDB('bptracking')
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

db.createCollection('bpmeasurements')
