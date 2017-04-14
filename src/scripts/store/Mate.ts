'use strict';

 class MateNames {
   public first: string;
   public last: string;

   constructor(firstName: string = "", lastName: string = "") {
     this.first = firstName;
     this.last = lastName;
   }
}

class Mate {
  [key:string]: any;
  public guid?: string;
  public age: number;
  public name: MateNames;
  public email: string;

  constructor(guid: string = "", age: number = 0, name: MateNames = new MateNames(), email: string = "") {
    this.guid = guid;
    this.age = age;
    this.name = name;
    this.email = email;
  }
}

export default Mate;