export interface IUser {
  surgeryOption: string;
  insuranceCriteria: string;
  date: IDate;
  validCred: IValidCred;
  invalidCred: IValidCred;
}

export interface IValidCred {
  username: string;
  password: string;
}

export interface IDate {
  year: number;
  month: string;
  date: number;
}