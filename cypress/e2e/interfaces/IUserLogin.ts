export interface IValidCred {
    username: string;
    password: string
}

export interface IDate {
    year: number;
    month: string;
    date: number;
}

export interface IinvalidCred {
    username: string,
    password: string
}

export interface ITrackers {
    FinancialTracker: string,
    CodingTracker: string,
    InsuranceTracker: string,
    PatientTracker: string,
    BalanceTacker: string,
    InventoryTacker: string,
    RevenueTracker: string,
    ClinicalTracker: string,
    RemittanceTracker: string
}

export interface IUsers {
    userRole: string;
    user: string
}

export interface IServiceCheckDetails {
    serviceUrl: string;
    alias: string;
    tabName: string;
    className?: string
}
export interface IUserLogin {
    surgeryOption: string;
    insuranceCriteria: string;
    searchChar: string;
    searchCharId: string;
    ConsentsId: string;
    addButton: string;
    consentTwoText: string;
    doneButton: string;
    generalId: string;
    physicalText: string;
    selectVariable: string;
    diagnosis: string;
    insert: string;
    mrnNumber: string;
    allText: string;
    logOutBtn: string;
    yesBtn: string;
    date: IDate;
    validCred: IValidCred;
    invalidCred: IinvalidCred;
    trackers: ITrackers;
    roles: IUsers;
    consent:string;
    security:string;
    colorId: string;
    addConsent:string;
    consentTwo: string;
    pain: string;
    colorIdTwo: string;
    ConWarning: string;
    expiryDays: string;
    conNotes: string;
    colorThree: string;
    pntConsentNotes: string;
    conNoteWarning: string;
    no: string;
}