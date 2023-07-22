import { IUserLogin } from "../e2e/interfaces/IUserLogin";

export class UserLogin {

    public getMockData(): IUserLogin {
        return {
            surgeryOption: " Ambulatory Surgery Center East Side ",
            insuranceCriteria: "RedTest Cross",
            searchChar: 'ConsentTwo',
            searchCharId: 'con',
            ConsentsId: 'Consents',
            addButton: 'Add',
            consentTwoText: 'ConsentTwo',
            doneButton: 'Done',
            generalId: 'General',
            physicalText: 'Patient Surgery is complicated so we try our best in all ways',
            selectVariable: 'Select variable',
            diagnosis: 'Diagnosis',
            insert: 'Insert',
            mrnNumber: '8676941415',
            allText: 'All',
            logOutBtn: 'Logout',
            yesBtn: 'Yes',
            date: Date,
            validCred: validcred,
            invalidCred: invalidCred,
            trackers: trackersDescription,
            roles: UserRoles,
            consent: 'PatientConsent',
            security: 'SecuritySettings',
            colorId: 'rgba(0, 0, 0, 0)',
            addConsent: 'Add Consent',
            consentTwo: 'ConsentTwo',
            pain: 'Pain',
            colorIdTwo: 'rgb(249, 249, 249)',
            ConWarning: 'Template cannot be saved without specifying the number of days for the expiration date.',
            expiryDays: '45',
            conNotes: 'Copying and pasting in some content from Microsoft Word or other sources may not be supported when printing.',
            colorThree: 'rgb(36, 211, 153)',
            pntConsentNotes: 'Patient Surgery is complicated so we try our best in all',
            conNoteWarning: 'Continuing will cause this consent statement to be deleted. Are you sure you want to continue?',
            no: 'No'

        }
    }
}

let invalidCred =
{
    username: "dev",
    password: "dev"
}
let validcred =
{
    username: "developer",
    password: "Z6mEwN1UFq0k#pQ0"
}
let Date =
{
    year: 2023,
    month: "Jul",
    date: 24
}

let trackersDescription =
{
    FinancialTracker: 'Financial Clearance',
    CodingTracker: 'Coding/Charge Entry',
    InsuranceTracker: 'Insurance Billing',
    PatientTracker: 'Patient Statements',
    BalanceTacker: 'Balance/Reconciliation',
    InventoryTacker: 'Inventory Reconciliation',
    RevenueTracker: 'Revenue Cycle Management',
    ClinicalTracker: 'Clinical Documentation',
    RemittanceTracker: 'Remittance Posting'
}

let UserRoles =
{
    userRole: 'userRole',
    user: 'user'
}