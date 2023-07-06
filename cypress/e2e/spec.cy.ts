import { IUser } from "../interfaces/user";
import { CustomPageObjects } from "./customobject";
import { configureAppInterceptor } from "./interceptor";

describe('SIS Enterprise Complete Login', () => {

  before(() => {
    configureAppInterceptor();
  })

  // it('SIS Portal Navigation & See Landing Page Text', () => {
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doGetElement("lc-ama2-cr").invoke('text').then((result) => {
  //     expect(result).to.contains(` Fee schedules, relative value units, conversion factors and/or related
  //     components are not assigned by the AMA, are not part of CPT, and the AMA
  //     is not recommending their use. The AMA does not directly or indirectly
  //     practice medicine or dispense medical services. The AMA assumes no
  //     liability for data contained or not contained herein. `);
  //   });
  // })

  // it('Login with Invalid Credentials', () => {
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doLogin('test', 'test');
  //   customObjects.doGetElement("lc-error-messages").invoke('text').then((result) => {
  //     expect(result).to.contains('Incorrect Username or Password');
  //   });
  // })


  // it('Login with correct Credentials', () => {
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doLogin(customObjects.username, customObjects.password);
  //   customObjects.doGetElement("org-selection-popup").invoke('text').then((result) => {
  //     expect(result).to.contains('Select Login Location');
  //   });
  // })

  // it('Check for the Popup post login and selection location', () => {
  //   const searchChar = 'AM';
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doLogin(customObjects.username, customObjects.password);
  //   cy.get('.p-listbox-filter.p-inputtext.p-component').type(searchChar);
  //   cy.get('.p-listbox-list')
  //     .find('li')
  //     .each((li) => {
  //       const text = li.text();
  //       // Use the extracted text as needed
  //       console.log(text);
  //       // Or perform assertions on the text
  //       expect(text.toLocaleLowerCase()).to.contain(searchChar.toLocaleLowerCase());
  //     });
  //   customObjects.doGetElement('org-modal-close').click();
  // })

  // it('Select Ambulatory Surgery Center East Side from the popup', () => {
  //   const searchChar = 'AM';
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doLogin(customObjects.username, customObjects.password);
  //   cy.get('.p-listbox-filter.p-inputtext.p-component').type(searchChar);
  //   cy.contains(' Ambulatory Surgery Center East Side ').click();
  //   cy.get('.desktop-section-header.submenu-item.desktop-nav-button.active').invoke('text').then((text) => {
  //     expect(text).to.contains('Schedule Grid'); // checking here default selected option should be schedule grid
  //   })
  // })

  // it('check for the number of cases', () => {

  //   const searchChar = 'AM';
  //   customObjects.doNavigationSISPortal();
  //   customObjects.doLogin(customObjects.username, customObjects.password);
  //   cy.get('.p-listbox-filter.p-inputtext.p-component').type(searchChar);
  //   cy.contains(' Ambulatory Surgery Center East Side ').click();
  //   cy.wait('@userRole');
  //   cy.wait('@user');
  //   customObjects.doGetElement('crIconAddDay').click();
  //   customObjects.doGetElement('crIconLeft').click();
  //   cy.wait(100);
  //   customObjects.doGetElement('crTotalCasesCnt').invoke('text').then((text) => {
  //     cy.wrap(parseInt(text)).should('be.gte', 0);
  //   })
  // })



  it('SIS ENterprise Login Form', () => {
    const mockData: IUser = new CustomPageObjects().getMockData();
    cy.doNavigationSISPortal();
    cy.doLogin(mockData.validCred.username, mockData.validCred.password);
    cy.contains(mockData.surgeryOption).click();

    //cy.get('div#crDatePickerContainer').click();
    cy.get('[data-test-id="crDatePickerContainer"]').click();

    // cy.get('input.p-datepicker-input').click(); // Open the datepicker

    // Find and click on the desired date
    cy.get('button.p-datepicker-year').contains(mockData.date.year).click(); // Locate and click the year
    cy.get('span.p-ripple.p-element.p-yearpicker-year.p-highlight').contains(mockData.date.year).click(); // Locate and click the year
    cy.get('span.p-ripple.p-element.p-monthpicker-month').contains(mockData.date.month).click(); // Locate and click the year
    cy.get('.p-datepicker-calendar td:not(.p-datepicker-other-month) span').contains(mockData.date.date).click(); // Click on the date 20


    cy.get('.fc-timegrid-slot.fc-timegrid-slot-lane').first().click();

    // Add New Patient informartion
    cy.get('[data-test-id="btnNewPatient"]').click();

    // Fill User Information and save the data
    cy.get('input[id="txtFirstName"]').type(mockData.invalidCred.username);
    cy.get('input[id="txtLastName"]').type(mockData.invalidCred.password);
    cy.get('#btnDone').click();

    const result = document.getElementsByClassName('.duplicate-patient-warning-text')
    if (result != null) {
      cy.get('#btnCreatePatient').click();
    }

    //patient details
    cy.doGetElement("sbtnGender").contains('Female').click()
    cy.doGetElement("zip_code_patient_details").type('12345')
    //Insurance need to be added
    //   customObjects.doGetElement("btnAdd").click();
    //   cy.get('.p-dropdown-trigger').click(
    //     {multiple:false}
    //   );

    /**
     * <==================== Start of the Adding the insurance criteria code =====================> 
     */
    cy.doGetElement('btnAdd').click();
    cy.wait("@GetInsuranceCarriers");
    cy.doGetElement('insuranceCarriersDropdown').click();
    cy.doClickByText(cy.get('.p-ripple.p-element.p-dropdown-item'), mockData.insuranceCriteria, 0)

    cy.doGetElement('relationshipToSubscriberDropdown').click();
    cy.get('.p-dropdown-items').contains('Self').click();
    cy.doGetElement('txtDisplayName').type('DisplaySubId');
    cy.doClickByText(cy.doGetElement('btnDone'), 'Done', 1); // Want to click on second button
    /**
     * <================================End of Code=================================================>
     */


    cy.doGetElement('btnPrevious').should('be.disabled')
    cy.doGetElement('btnDone').should('be.disabled')
    cy.doGetElement('btnNext').click().should('be.visible')

    //  Case Details: Switching operating room, date of start time, CPT and Physician and Appoitnment type.

    cy.doGetElement('operatingRoomsDropdown').click()

    cy.get('span.limittext-container').contains('OR 3 East').click()
    cy.doGetElement('txtMaskStartTime').type('11:00')
    cy.get('#dateOfService').find('input').clear().type('07042023');
    const codeandDescriptionsearch = "Knee"
    cy.doGetElement('procedureAutoComplete').type(codeandDescriptionsearch)
    cy.wait(5000)
    // cy.get('.procedure-item').click()
    cy.doGetElement("staffSingleSelectphyscianDropdown_0").click()
    cy.get(".limittext-container").contains('Elizabeth Cuddy, MD').click()
    const searchchar = 'gi'
    cy.doGetElement('specialtiesDropdown').click()
    cy.get('.p-dropdown-filter.p-inputtext.p-component').type(searchchar)
    cy.get('.p-dropdown-items')
      .find('li')
      .each((li) => {
        const matchedlist = li.text()
        expect(matchedlist.toLocaleLowerCase()).to.contains(searchchar.toLocaleLowerCase())
      }
      )
    cy.get('.limittext-container').contains('GI & Endoscopy ').click()

    // customObjects.doGetElement('btnPrevious').should('be.enabled')
    // customObjects.doGetElement('btnDone').should('be.disabled')
    // customObjects.doGetElement('btnNext').click().should('be.enabled')

    // //Billing Details
    // customObjects.doGetElement('sbtnSelfPayOption').contains('Yes').click();


    // /**
    //  * <================ Checking all the field have been checked in left hand side===================>
    //  */
    // // starts checking the all the tabs have been checked
    // let checkedValues = [];
    // cy.get('.p-tabview-panels .p-tabview-panel .form-doc-states > i').then((x: any) => {

    //   x.toArray().forEach(element => {
    //     checkedValues.push(element.className);
    //   });
    // });

    // const firstValue: string = 'fa fa-check-circle'; // checking each of them shoiuld have checked cirlce in tab
    // const areAllSame: boolean = checkedValues.every(value => value === firstValue);
    // cy.log('Checking all the tabs have been checked'); // log the value in cypress console
    // cy.wrap(areAllSame).should('be.true');
    // // ends checking the all the tabs have been checked
    // /**
    //  * <================================== End of Test Cases =========================================>
    //  */
    // customObjects.doGetElement('btnPrevious').should('be.enabled')
    // customObjects.doGetElement('btnDone').should('be.enabled')
    // customObjects.doGetElement('btnNext').click().should('be.enabled')

    // //Case Coordination:
    // customObjects.doGetElement('case-coordination').type("case is coordinated by Surgeon, Physicians, Nurses and few attendees")
    // customObjects.doGetElement('btn_cc_request_send').click()
    // customObjects.doGetElement('btnAcknowledgement').click()

  })
})


