// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

import "cypress-real-events/support";
import '@percy/cypress'
import 'scroll-to-bottomjs'
import { loggable } from 'cypress-pipe'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  Cypress.Commands.add("mobileNavDisplay", ( hamburgerlocator, submenulocator, timedelay) => {
    const click = $el => $el.click()
    cy.get(hamburgerlocator).pipe(click).should($el => {
        expect($el).to.have.attr('aria-expanded','true')
      })
    var i=0;
    cy.get(submenulocator).each(($element,index,$list)=>{
            i=i+1
            const backbutton = $element => cy.wrap($element).parent().should('be.visible').click().wait(Number(timedelay)).get($element).should('be.visible')
            cy.wrap($element).pipe(backbutton)
            cy.percySnapshot("Mobile-Menu-Handling-"+i);
            cy.get($element).click()
    })
})

Cypress.Commands.add("mobileNavDisplayBackButton", ( hamburgerlocator, submenulocator, menubackbutton, timedelay) => {
  const click = $el => $el.click()
  cy.get(hamburgerlocator).pipe(click).should($el => {
        expect($el).to.have.attr('aria-expanded','true')
      })
    var i=0;
    cy.get(submenulocator).each(($element,index,$list)=>{
            i=i+1
            const backbutton = $element => cy.wrap($element).parent().should('be.visible').click().wait(Number(timedelay)).get(menubackbutton).should('be.visible')
            cy.wrap($element).pipe(backbutton)
            cy.percySnapshot("Mobile-Menu-Handling-backbutton-"+i);
            cy.get(menubackbutton).click()
  })
})
