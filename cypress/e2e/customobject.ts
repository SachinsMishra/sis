import { IUser } from "../interfaces/user";

export class CustomPageObjects {
    public getMockData(): IUser {
        return {
            surgeryOption: " Ambulatory Surgery Center East Side ",
            insuranceCriteria: "RedTest Cross",
            date: {
                year: 2023,
                month: "Jul",
                date: 18
            },
            validCred: {
                username: "developer",
                password: "Z6mEwN1UFq0k#pQ0"
            },
            invalidCred: {
                username: "TestFirstName",
                password: "TestLastName"
            }
        }
    }
};