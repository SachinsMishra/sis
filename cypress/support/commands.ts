/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//


Cypress.Commands.add('doNavigationSISPortal', () => {
  cy.visit('https://sisenterprisewebcypresstraining.azurewebsites.net/');
});


Cypress.Commands.add('setPCalendarDate', (date) => {
  cy.get('p-calendar').last().click(); // Open the p-calendar popup

  // Find the specific day element and click it
  cy.get('.ui-datepicker-calendar').contains('.ui-state-default', date).click();

  // Close the p-calendar popup
  cy.get('body').click();
});


Cypress.Commands.add('doLogin', (username: string, password: string) => {
  cy.get('input[id="username"]').type(username);// username
  cy.get('input[id="password"]').type(password);// password
  cy.get('#LoginButton').click();
});

Cypress.Commands.add('doGetElement', (elementid: string) => {
  return cy.get(`[data-test-id="${elementid}"]`);
});

Cypress.Commands.add('doClickByText', (
  element: Cypress.Chainable<JQuery<HTMLElement>>, textToBeClicked: string, index: number = 0) => {
  element.then((elem) => {
    elem.toArray().forEach((x, n) => {
      index == 0 && (x.innerText == textToBeClicked) && x.click();
      index != 0 && index == n && (x.innerText == textToBeClicked) && x.click();
    })
  })
});





declare namespace Cypress {
  interface Chainable<Subject = any> {
    setPCalendarDate(date: string): Chainable<any>;
    doLogin(username: string, password: string): Chainable<any>;
    doGetElement(elementid: string): Chainable<JQuery<HTMLElement>>;
    doNavigationSISPortal(): Chainable<JQuery<HTMLElement>>;
    doClickByText(element: Cypress.Chainable<JQuery<HTMLElement>>, textToBeClicked: string, index: number): Chainable<JQuery<HTMLElement>>;
  }
}
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
