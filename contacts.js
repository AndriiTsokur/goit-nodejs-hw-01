import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = 'db/contacts.json';

// Returns array of contacts
export const listContacts = async () => {
	const data = await fs.readFile(contactsPath, 'utf-8');
	const dataArr = JSON.parse(data);

	return dataArr;
};

// Returns object of contact with required ID / null
export const getContactById = async contactId => {
	const data = await fs.readFile(contactsPath, 'utf-8');
	const dataArr = JSON.parse(data);

	const res = dataArr.find(item => item.id === contactId);

	return res ? res : null;
};

// Returns object of deleted contact with required ID / null
export const removeContact = async contactId => {
	const data = await fs.readFile(contactsPath, 'utf-8');
	const dataArr = JSON.parse(data);

	const requiredIndex = dataArr.findIndex(item => item.id === contactId);

	if (requiredIndex === -1) return null;

	const res = dataArr.splice(requiredIndex, 1);
	await fs.writeFile(contactsPath, JSON.stringify(dataArr));

	return res;
};

// Returns object of added contact
export const addContact = async (name, email, phone) => {
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	const data = await fs.readFile(contactsPath, 'utf-8');
	const dataArr = JSON.parse(data);

	dataArr.push(newContact);
	fs.writeFile(contactsPath, JSON.stringify(dataArr));

	return newContact;
};
