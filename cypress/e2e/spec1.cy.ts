// import { CustomObjects } from "../support/CustomObjects"
import { IUserLogin } from "../e2e/interfaces/IUserLogin";
import { UserLogin } from "./UserLogin"
import { URLs } from "../urls";
import { CommonGetLocators, WaitMethods } from "../support/CoreConstants"
import { resolve } from "cypress/types/bluebird";
import { configureAppInterceptor } from "./interceptor";
// import { SisApis } from "./api/Apis.api";

/* instance variables */
const customObjects = new UserLogin();
// const sisApis = new SisApis();

describe('End to End testing on consents scenario', () => {

    const mockData: IUserLogin = customObjects.getMockData();
    //Before suite
    before('login', () => {
        configureAppInterceptor()
        cy.doLoginThroughtext(mockData.validCred.username, mockData.validCred.password)
        cy.doGetElementByTestId(CommonGetLocators.ambulatoryId, mockData.surgeryOption)
    })
    //After suite, actions to be performed
    after('logout', () => {
        // cy.doLogOut(CommonGetLocators.defaultImageId, CommonGetLocators.logoutid, CommonGetLocators.yesbtnId)
    })

    describe('Adding a new consent in Application settings', () => {

        it('Switching to Application settings', () => {
            //performing actions such as --Click on userIcon and switching to application settings and then choosing consent icon
            // cy.doGetElement(CommonGetLocators.iconuserid).click()
            // cy.doGetElementByTestId(CommonGetLocators.userSettingsMenuId, CommonGetLocators.settings)
            // cy.get(CommonGetLocators.adminSearchId).type(mockData.searchCode)
            // cy.getElementById(mockData.ConsentsId, CommonGetLocators.toggleId)
            cy.wait('@GetCaseRequestPendingRecordCount');
            // cy.get('#iconCasestoCodeCE').click();
            cy.get('.desktop-section-header').each((element) => {
                if (element[0].innerText === 'Coding/Charge Entry') {
                    element[0].click()
                }
            })

            cy.wait(100);


            cy.get('#periodDropdown').click();
            cy.doGetElement('ss-dropdownItem-130').click();

            cy.get('#batchDropdown').click();
            cy.doGetElement('ss-dropdownItem-1677').click();

            cy.get('table tbody')
                .find('tr')
                .each(($row, rowIndex) => {
                    cy.wrap($row)
                        .find('td')
                        .each(($cell) => {
                            if ($cell.text().trim() === '8676941076') {
                                $row.click();
                            }
                        })
                });
            // cy.get('.p-dialog-title ').invoke('text').should('contain', 'No Period Selected')
            // cy.findByText('OK').click();

            cy.wait('@transportationContact');
            cy.wait(200);
            // cy.doGetElement('header_checkbox').find('.p-checkbox-box').click();
            // cy.findByText('Add Selected to Performed').click()
        })

        /***No longer Not working**/
        xit('Assertion on Search bar', () => {
            cy.get('#txt_cs_').type('Ane');
            cy.get('[data-test-id=config-selector-list]')
                .find('li')
                .each((li) => {
                    const text = li.text().trim();
                    // Use the extracted text as needed
                    console.log(text);
                    // Or perform assertions on the text
                    expect(text).to.contains('Anesthesia Consent');
                });
        })

        xit('Assertions on consent Icon', () => {
            //CSS assertions on consent icon 
            cy.get(CommonGetLocators.consentBtnId).should(CommonGetLocators.havecssId, CommonGetLocators.bckgrndId, mockData.colorId)

            //Assertions on Add button and choosing Add button
            cy.get(CommonGetLocators.addId).then(($btn) => {
                if ($btn.is(':disabled')) {
                    cy.log('Button exists and is disabled!')
                    return
                } else {
                    cy.log('Button exists and is enabled!')
                    cy.wrap($btn).click()
                }
            })
        })

        xit('Assertions on Done button before adding a consent and Add New button for Add Consent popup', () => {
            cy.get('#accp_popup_done').then(($donebtn) => {
                cy.wrap($donebtn).should('be.disabled')
            })
            //**No longer Not able to add this assertion */
            //cy.doAssertionCheck('.active.col-md-6 btn','Add New')
            cy.get('.btn-group.col-md-12.segmented-label-fixedwidth .active').each((element) => {
                const activeButton = element.text().trim();
                cy.log(activeButton);
                expect(activeButton).to.contains('Add New');
            })
        })

        xit('Assertions on button icon', () => {
            //Assertion on Add Consent popup--Add Consent text is present or not
            cy.doAssertionCheck(CommonGetLocators.modalbndgId, mockData.addConsent)
            cy.get(CommonGetLocators.consentsId).type(mockData.consentTwoText + Math.random())
            //Assertion on consentName
            cy.get(CommonGetLocators.consentsId).should('be.visible').and(($input) => {
                const val = mockData.consentTwoText
                expect(val.length).greaterThan(0)
            })
            //Assertion and clicking on Done button
            cy.get(CommonGetLocators.buttonId).then(($btn) => {
                if ($btn.is(':disabled')) {
                    cy.log('Button exists and is disabled!')
                    return
                } else {
                    cy.log('Button exists and is enabled!')
                    cy.wrap($btn).click()
                }
            })
            //  cy.getElementById(mockData.doneButton, CommonGetLocators.buttonId)
        })

        xit('Assertion on ConsentName and choosing the speciality followed by Default for option', () => {
            //cy.get(CommonGetLocators.consentConfgId).should(CommonGetLocators.havevalueId, mockData.consentTwo)
            cy.get(CommonGetLocators.consentConfgId).should('be.empty')
            cy.getElementById(mockData.generalId, CommonGetLocators.generalId)
            cy.getElementById(mockData.generalId, CommonGetLocators.defaultId)
        })

        xit('Assertions on Available in and Default for', () => {
            const checkElement = [];
            cy.get('.spec-button.button-secondary-large.ng-binding.ng-scope.selected')
                .each((element) => {
                    checkElement.push(element[0].id);
                }).then(() => {
                    expect(checkElement.length).eq(2);
                })

        })

        xit('Assertion on Display ScheduleInformation should have physician button to be enabled', () => {
            cy.get('.sis-toggle-button.ng-binding.ng-scope').then(($btn) => {
                if ($btn.is(':enabled')) {
                    cy.log('Button exists and is enabled!')
                    return
                } else {
                    cy.log('Button exists and is enabled!')
                    cy.wrap($btn).click()
                }
            })
        })

        xit('Assertion on Yes toggle and assertion on Warning text', () => {
            cy.get(CommonGetLocators.allTxtId).contains(mockData.yesBtn).click()
            cy.doAssertionCheck(CommonGetLocators.tittlengbidgId, mockData.ConWarning)
        })

        xit('Adding the expiration days for consentTwo', () => {
            cy.get(CommonGetLocators.decminalTextId)
                .type(mockData.expiryDays)
                .then(() => {
                    //*No longer Assertion is failing I included 45days what I have provided
                    cy.get(CommonGetLocators.decminalTextId).then((res) => {
                        // Since inove text was not working chcnaged to value
                        expect(res.val()).eq(mockData.expiryDays);
                    });
                });
        })

        xit('Add a consent notes to a added ConsentTwo', () => {
            cy.get(CommonGetLocators.dashedBorderId).click()
            cy.doAssertionCheck(CommonGetLocators.errorId, mockData.conNotes)
        })

        xit('Assertion on Insert variable drop down should be disabled', () => {
            //Assertion on Insert variable drop down to be disabled
            //*no longer not working
            cy.get("#ssDiv_VP__ > div").then((response) => {
                //console.log(response[0].classList);
                expect(response[0].classList.contains('disabled-state')).to.be.true;
            })
        })

        xit('Assertion on insert button should be disabled', () => {
            cy.get('.button-primary-small').then(($btn) => {
                cy.wrap($btn).should('be.disabled')
            })
        })

        xit('Performing actions on Consent notes and doing functional assertions', () => {
            cy.get(CommonGetLocators.resultId).type(mockData.physicalText)
            // cy.get('.ng-isolate-scope').then(($btn) => {
            //     cy.wrap($btn).should('be.enabled')
            // })
            cy.getElementById(mockData.selectVariable, CommonGetLocators.selectVariableId)
            //* Need to write on assertion on dropdown values/
            cy.getElementById(mockData.diagnosis, CommonGetLocators.dicId)

        })

        //*Need to click on Yes toggle and choose any drop down values and perform assertions on the dropdown values/
        xit('Check all the selected values in dropdown after yes toggled', () => {
            cy.get('.signature-area #div_').findByText('Yes').click();

            cy.get('.sisMultiselectContainer').click();
            const option: string[] = ["Anesthesiologist", "Physician"];
            option.forEach((val) => {
                cy.get(`[title="${val}"]`).then((element) => {
                    element[0].click(); // have 2 elements clicking on first other is hidden
                })
            });
            // checking if the options have been checked
            const checkedItems = [];
            cy.wrap(
                option.forEach((val) => {
                    cy.get(`[title="${val}"] > .fa.fa-check`)
                        .then((element) => {
                            checkedItems.push(element[0]);
                        })
                })
            ).then(() => {
                expect(checkedItems.length).eq(option.length);
            })
        })

        xit('Upload File', () => {
            cy.get('#cke_27').then((element) => {
                element[0].click();
            })
            cy.findByText('Upload:').click();
            const fileName = 'pfi-briefings.txt';
            cy.get('input[type=file]').selectFile(fileName, { force: true });

        })

        //Add an attachment with some large file and showing an assertion that the file is too big

        xit('Assertion on Insert buton to be enabled', () => {
            cy.get('.button-primary-small').then(($btn) => {
                cy.wrap($btn).should('be.enabled')
            })
            cy.getElementById(mockData.insert, CommonGetLocators.inserId)
        })

        xit('Checking the API response for consent api', () => {
            cy.cIntercept(sisApis.ConsentApis()).then((res) => {
                expect(res.response.statusCode).to.eql(200)
            })
        })


        xit('Switching back to consent tab for validating the saved data', () => {
            cy.get(CommonGetLocators.ngBindId).contains(mockData.ConsentsId).click()
            cy.get(CommonGetLocators.flxGrwId).contains(mockData.searchChar).click()
            cy.get(CommonGetLocators.consentConfigId).should(CommonGetLocators.havevalueId, mockData.searchChar)
            cy.get(CommonGetLocators.generalId).contains(mockData.generalId).should(CommonGetLocators.havecssId, CommonGetLocators.bckgrndId, mockData.colorThree)
            cy.doAssertionCheck(CommonGetLocators.resultId, mockData.pntConsentNotes)
        })

        xit('Asertion on closing button of ConsentNotes', () => {
            cy.get(CommonGetLocators.deleteIconId).click()
            cy.doAssertionCheck(CommonGetLocators.errorBindId, mockData.conNoteWarning)
            cy.getElementById(mockData.no, CommonGetLocators.bttnScndryId)
        })

    })

})