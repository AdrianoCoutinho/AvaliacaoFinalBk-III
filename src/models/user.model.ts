import { v4 as createUuid } from "uuid";
import { Note } from "./note.model";

export class User {
  private _id: string;
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _notes?: Note[]
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public get notes() {
    return this._notes || [];
  }

  public set notes(note: Note[]) {
    this._notes = note;
  }

  public set email(email: string) {
    this._email = email;
  }

  public set password(password: string) {
    this._password = password;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      notes: this._notes,
    };
  }

  public static create(
    id: string,
    name: string,
    email: string,
    password: string,
    notes?: Note[]
  ) {
    const user = new User(name, email, password, notes);
    user._id = id;

    return user;
  }
}
