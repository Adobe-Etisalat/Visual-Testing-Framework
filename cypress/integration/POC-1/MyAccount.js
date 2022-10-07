let scrollToBottom = require("scroll-to-bottomjs");
describe("visual test of My Account-Consumer index page",function(){
    it("open-page-for visual validation for My Account-Consumer index page",function(){
cy.visit('https://qanew.etisalat.ae/en/consumer/index.html#');
cy.get('#container-c3ef56d76e > .aem-Grid').click();

cy.get('#accountNumber').click();
cy.get('#continueSignIn').click();
cy.get('#accountNumber').type('0506430125');
cy.get('#continueSignIn').click();
cy.get('#loginform').submit();
 
cy.get('#digit-1').type('1');

cy.get('#digit-2').type('2');
cy.get('#digit-3').type('3');
cy.get('#digit-4').type('4');
cy.get('#digit-5').type('5');
cy.get('#digit-6').type('6');
cy.get('#signWithOTP').click();
cy.get('#verify-your-otp-code').submit();
cy.url().should('contains', 'https://qanew.etisalat.ae/b2c/dashboard.html');
cy.wait(20000);
cy.percySnapshot("My Account");
cy.get('#accountName').click();

cy.get('.sub-account-menu > li:nth-child(4) > a').click();
})

}) 

