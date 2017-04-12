'use strict'

import { observable } from 'mobx';
import Guid from 'guid';

function load(callback) {
  $.get("mates.json")
    .done((data) => {
      this.db = observable(data);
      (typeof callback === 'function') && callback(this.db);
    })
    .fail((ex) => {
      alert("Ошибка при получении файла mates.json");
    });
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
}

function update(id, changedMate) {
  const mate = this.db[id];
  mate.age = changedMate.age;
  mate.name.first = changedMate.firstName;
  mate.name.last = changedMate.lastName;
  mate.email = changedMate.email;
}

function remove(id) {
  this.db.splice(id, 1);
}

export default {
  load: load,
  create: create,
  update: update,
  remove: remove
};
