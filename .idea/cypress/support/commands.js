Cypress.Commands.add("mobileNavDisplay", (viewport, url, hamburgerlocator, submenulocator, timedelay) => {
    const click = $el => $el.click()
    cy.viewport(viewport)
    cy.visit(url)
    cy.get(hamburgerlocator).pipe(click).wait(Number(timedelay)).should($el => {
        expect($el).to.have.attr('aria-expanded','true')
      })
    var i=0;
    cy.get(submenulocator).each(($element,index,$list)=>{
            i=i+1
            const backbutton = $element => cy.wrap($element).parent().should('be.visible').click().wait(Number(timedelay)).get($element).should('be.visible')
            cy.wrap($element).pipe(backbutton)
            //cy.percySnapshot("Mobile-Menu-Handling-"+i);
            cy.get($element).click()
    })
})
