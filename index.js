import { Command } from 'commander';
import {
	listContacts,
	getContactById,
	addContact,
	removeContact,
} from './contacts.js';

const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse();
// program.parse(process.argv) - outdated syntax

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			const allContacts = await listContacts();
			return console.table(allContacts);

		case 'get':
			const exactContact = await getContactById(id);
			return console.log(exactContact);

		case 'add':
			const newContact = await addContact(name, email, phone);
			return console.log(newContact);

		case 'remove':
			const deleteContact = await removeContact(id);
			return console.log(deleteContact);

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
};

invokeAction(argv);
