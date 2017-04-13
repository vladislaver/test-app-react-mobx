'use strict';

import { observable } from 'mobx';
import * as uuid  from 'uuid';


function load() {
	window.fetch('/mates.json')
    .then((response) => {
			return response.json();
		})
    .then((db) => {
			setTimeout(() => {
				this.db.replace(db);
			}, 300);
		})
    .catch((ex) => {
			console.error(ex);
		});
}

function getByGuid(mateGuid: string): any {
	let mate = null;

	this.db.forEach((item: any) => {
		if (item.guid === mateGuid) {
			mate = item;
		}
	});

	return mate;
}

function create(newMate: any) {
	this.db.push({
		"guid": uuid.v4(),
		"age": newMate.age,
		"name": {
			"first": newMate.firstName,
			"last": newMate.lastName
		},
		"email": newMate.email
	});

	return true;
}

function update(mateGuid: string, changedMate: any) {
	const mate = this.getByGuid(mateGuid);

	if (mate) {
		mate.age = changedMate.age;
		mate.name.first = changedMate.firstName;
		mate.name.last = changedMate.lastName;
		mate.email = changedMate.email;

		return true;
	}
}

function remove(id: string) {
	this.db.splice(id, 1);
}

export default {
	db: observable([]),
	load: load,
	getByGuid: getByGuid,
	create: create,
	update: update,
	remove: remove
};
