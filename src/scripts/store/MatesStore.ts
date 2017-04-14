'use strict';

import { observable } from 'mobx';
import * as uuid  from 'uuid';
import 'whatwg-fetch';
import Mate from './Mate';


class MatesStore {

  @observable
  private db: Array<Mate>;

  constructor() {
    this.db =  [];
  }

  public load = () => {
    fetch('/mates.json')
      .then((response: any) => {
        return response.json();
      })
      .then((db: Array<Mate>) => {
        this.db = db;
      })
      .catch((ex: any) => {
        toastr.error(ex, "Error", { timeOut: 2000 });
      });
  };

  public getList = (): Array<Mate> => {
    return this.db;
  };

  public getByGuid = (guid: string): Mate  => {
    let mate: any = null;

    this.db.forEach((item: Mate) => {
      if (item.guid === guid) {
        mate = item;
      }
    });

    return mate;
  };

  public create = (mate: Mate): boolean => {
    mate.guid = uuid.v4();
    this.db.push(mate);

    return true;
  };

  public update = (guid: string, mate: Mate): boolean => {
    const mateOld = this.getByGuid(guid);

    if (mateOld) {
      mateOld.age = mate.age;
      mateOld.name = mate.name;
      mateOld.email = mate.email;

      return true;
    }

    return true;
  };

  public remove = (id: number): boolean => {
    const spliced = this.db.splice(id, 1);

    if (spliced.length) {
      return true;
    }

    return false;
  };
}


export default new MatesStore();
