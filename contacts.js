import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = async dataArr => {
	await fs.writeFile(contactsPath, JSON.stringify(dataArr, null, 2));
};

// Returns array of contacts
export const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

// Returns object of contact with required ID / null
export const getContactById = async contactId => {
	const dataArr = await listContacts();
	const res = dataArr.find(item => item.id === contactId);
	return res || null;
};

// Returns object of deleted contact with required ID / null
export const removeContact = async contactId => {
	const dataArr = await listContacts();
	const requiredIndex = dataArr.findIndex(item => item.id === contactId);

	if (requiredIndex === -1) return null;

	const [res] = dataArr.splice(requiredIndex, 1);
	await updateContacts(dataArr);

	return res;
};

// Returns object of added contact
export const addContact = async (name, email, phone) => {
	const dataArr = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	dataArr.push(newContact);
	await updateContacts(dataArr);

	return newContact;
};
