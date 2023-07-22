/// <reference types="cypress" />

import { WaitMethods } from "./CoreConstants";
import { UserLogin } from "../e2e/UserLogin";
import { IUserLogin } from "../e2e/interfaces/IUserLogin";
import { ApiEndpoint } from "./api-endpoints";

//#region constants
const customObjects = new UserLogin();
const mockData: IUserLogin = customObjects.getMockData();
//#endregion


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
Cypress.Commands.add('doNavigationSISPortal', () => {
  cy.visit('https://sisenterprisewebcypresstraining.azurewebsites.net/login.html')
})

Cypress.Commands.add('doNavigatingToSisCharts', () => {
  cy.visit('https://sisenterprisewebcypresstraining.azurewebsites.net/')
})

Cypress.Commands.add('doLogin', (username: string, password: string) => {
  cy.request({
    method: WaitMethods.post,
    url: 'https://sisenterpriseapicypresstraining.azurewebsites.net/api/Login/LoginUser',
    headers: {
    },
    body: {
      password: password,
      userName: username
    }
  }).then((response) => {
    //Assertion on API to get 200 status code
    expect(response.status).to.eql(200)
    //expect(response.body).to.have.property('id');
  })

})


Cypress.Commands.add('ServiceCheck',
  (method: WaitMethods, serviceUrl: string, alias: string, tabName: string, className?: string) => {
    cy.intercept(method, serviceUrl).as(alias);
    if (className != null) {
      cy.get(`${className}`).contains(tabName).click();
    }
    return cy.wait(`@${alias}`)
  })


Cypress.Commands.add('getElementById', (testData: string, Id: string) => {
  cy.get(`${Id}`).contains(testData).click()
})

// Cypress.Commands.add(
//   'findByTestId',
//   { prevSubject: 'element' },
//   (subject, selector) => {
//     return cy.wrap(subject).find(`[data-test=${selector}]`);
//   }
// )

Cypress.Commands.add('doPickOrganization', () => {
  const token = sessionStorage.getItem('ChartsApp')
  cy.request({
    method: 'POST',
    url: 'https://sisenterpriseapicypresstraining.azurewebsites.net/api/UserSession/UserSessionOrg/29',
    headers: {
      ChartsApp: token, token: token
    },
    body: {

    }
  }).then((response) => {
    expect(response.status).to.eql(200)
  })
})

Cypress.Commands.add('ccIntercept', (interceptCollection: ApiEndpoint[]) => {
  interceptCollection.forEach((endpoint) => {
    cy.intercept(endpoint.method, endpoint.serviceUrl).as(endpoint.alias);
    cy.wait(`@${endpoint.alias}`)
  });
})

Cypress.Commands.add('doGetElement', (elementId: string) => {
  cy.get(`[data-test-id="${elementId}"]`)
})

Cypress.Commands.add('countCheck', (className: string, conditionCheck: string) => {
  cy.get(`${className}`).invoke('text').then((result) => {
    cy.wrap(parseInt(result)).should(conditionCheck, 0)
  })
})

Cypress.Commands.add('doClickByText', (element: Cypress.Chainable<JQuery<HTMLElement>>, textToBeClicked: string, index: number = 0) => {
  element.then((elem) => {
    elem.toArray().forEach((x, n) => {
      index == 0 && (x.innerText == textToBeClicked) && x.click()
      index != 0 && index == n && (x.innerText == textToBeClicked) && x.click()
    })
  })

})


Cypress.Commands.add('doLoginThroughtext', (username: string, password: string) => {
  cy.visit('https://sisenterprisewebcypresstraining.azurewebsites.net/login.html')
  cy.get('[data-test-id="lc-username"]').type(username);
  cy.get('[data-test-id="lc-password"]').type(password);
  cy.get('[data-test-id="lc-login"]').click();
  
})

Cypress.Commands.add('doGetElementByTestId', (elementId: string, testId: string) => {
  cy.get(`[data-test-id="${elementId}"]`).contains(testId).click()
})



Cypress.Commands.add('doLogOut', (defaultImageId: string, logoutid: string, yesbtnId: string) => {
  cy.get(defaultImageId).click()
  cy.get(logoutid).contains(mockData.logOutBtn).click()
  cy.get(yesbtnId).contains(mockData.yesBtn).click()
})

Cypress.Commands.add('cIntercept', (interceptCollection: ApiEndpoint[]) => {
  interceptCollection.forEach((endpoint) => {
    cy.intercept(endpoint.method, endpoint.serviceUrl).as(endpoint.alias);
    cy.get(`${endpoint.className}`).contains(endpoint.tabName).click();
    cy.wait(`@${endpoint.alias}`)
  });
})

Cypress.Commands.add('doAssertionCheck', (Id: string, testData: string) => {
  cy.get(Id)
    .invoke('text')
    .then((result) => {
      expect(result).to.contains(testData)
    })
})

export { }
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      doNavigationSISPortal(): Chainable<JQuery<HTMLElement>>;
      doLogin(username: string, password: string): Chainable<JQuery<HTMLElement>>;
      doGetElement(elementId: string): Chainable<JQuery<HTMLElement>>;
      doClickByText(element: Cypress.Chainable<JQuery<HTMLElement>>, textToBeClicked: string, index?: number): Chainable<JQuery<HTMLElement>>;
      doLoginThroughtext(username: string, password: string): Chainable<JQuery<HTMLElement>>;
      doPickOrganization(): Chainable<JQuery<HTMLElement>>;
      ServiceCheck(method: WaitMethods, serviceUrl: string, alias: string, tabName: string, className?: string): Chainable<any>;
      ccIntercept(interceptCollection: ApiEndpoint[]): Chainable<any>;
      doNavigatingToSisCharts(): Chainable<JQuery<HTMLElement>>;
      // findByTestId(prevSubject?: string): Chainable<any>;
      getElementById(testData: string, Id: string): Chainable<JQuery<HTMLElement>>;
      countCheck(className: string, conditionCheck: string): Chainable<JQuery<HTMLElement>>;
      doGetElementByTestId(elementId: string, testId: string): Chainable<JQuery<HTMLElement>>;
      doLogOut(defaultImageId: string, logoutid: string, yesbtnId: string): Chainable<JQuery<HTMLElement>>;
      cIntercept(interceptCollection: ApiEndpoint[]): Chainable<any>;
      doAssertionCheck(Id: string, testData: string): Chainable<any>;
    }
  }
}