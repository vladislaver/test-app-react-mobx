'use strict';

import { observable } from 'mobx';
import Guid from 'guid';


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

function getByGuid(mateGuid) {
	let mate = null;

	this.db.forEach((item) => {
		if (item.guid === mateGuid) {
			mate = item;
		}
	});

	return mate;
}

function create(newMate) {
  this.db.push({
    "guid": Guid.create().value,
    "age": newMate.age,
    "name": {
      "first": newMate.firstName,
      "last": newMate.lastName
    },
    "email": newMate.email
  });

  return true;
}

function update(mateGuid, changedMate) {
  const mate = this.getByGuid(mateGuid);

  if (mate) {
		mate.age = changedMate.age;
		mate.name.first = changedMate.firstName;
		mate.name.last = changedMate.lastName;
		mate.email = changedMate.email;

		return true;
	}
}

function remove(id) {
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
