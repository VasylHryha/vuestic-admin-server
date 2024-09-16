const fs = require('node:fs');
const path = require('node:path')
const mockUsers = require('../mockData/users.json');
const { v4: uuidv4 } = require('uuid');

/*

insert into users
  (id, email, username, role, projects, avatar, fullname, is_active)
values
  ('76d28d8f-eceb-4419-aeef-5e9e5bfce4d1', 'jane@example.com', 'janesmith', 'ADMIN', '{}', 'null', 'Jane Smith', true),
  ('47310221-b3c0-47e6-9284-c9dfea07043b', 'magicpan@example.gg', 'janesmith', 'USER', '{"Toolset landing","Design team","Mood board"}', 'null', 'Patrik Radkow', false),
  ('7a99e67d-d56e-48da-88e8-4fa6cda40649', 'ebrown@gmail.com', 'ebrown', 'USER', '{"Springfield media","Sky High Architecture"}', 'null', 'Liz Macintosh', true);

*/

function seedDbUsers (mockUsers) {
	const values = mockUsers.map(({ id, email, username, role, projects, avatar, fullName, isActive }) => {
		const _values = [id, email, username, role, projects, avatar, fullName, isActive].map(value => {
			if (Array.isArray(value)) {
				return JSON.stringify(value)
					.replace('[', '\'{')
					.replace(']', '}\'');
			}

			if (value === null) {
				return "'null'";
			}

			return `'${value}'` ;
		})

		_values.splice(0, 1, `'${uuidv4()}'`);

		return '(' + _values.join(', ') + ')'
	});

	return `insert into users
  (id, email, username, role, projects, avatar, fullname, is_active)
values
  ${values.join(',\n  ')}`
}

fs.writeFileSync(path.resolve(__dirname, '..', 'supabase/seed.sql'), seedDbUsers(mockUsers));
