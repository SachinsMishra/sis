export const configureAppInterceptor=():void=>{
    cy.intercept('GET', '/api/Security/UserRole').as('userRole');
    cy.intercept('GET', '/api/CaseCoordination/Requests/Unacknowledged/Count/User').as('user');
    cy.intercept('GET', '/api/InsuranceCarrierObject/GetInsuranceCarriers').as('GetInsuranceCarriers');
}