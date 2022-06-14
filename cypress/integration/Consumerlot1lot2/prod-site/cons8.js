let scrollToBottom = require("scroll-to-bottomjs");

describe("visual test of walls site page",function(){

    before(() => {
        // Block newrelic js outright due to issues with Cypress networking code.
        cy.log("Blocking NewRelic scripts");
        //Will block 
        //  https://js-agent.newrelic.com/nr-spa-1208.js
        cy.intercept(/\.*newrelic.*$/, (req) => {
            console.log("NEW RELIC INTERCEPTED");
            req.reply("console.log('Fake New Relic script loaded');");
        });
    });

    beforeEach(function()
    {
        cy.fixture("/Consumerlot1lot2/production/cons-8").then((data) =>{
            this.testdata=data
        }) 
    })

    it("open-page-for visual validation for walls",function(){
        let arrayOsPage=this.testdata.wallspage
        let i=0
        arrayOsPage.forEach(element => {
           cy.log(i)
            cy.visit(element).wait(5000)
            cy.document().then(doc => {
                // create a new style tag
                let $style = doc.createElement("style");
                // add percy-specific css
                $style.innerHTML = "@media only percy { *[id='onetrust-banner-sdk'] { display: none !important; } };";
                // inject styles into the document
                doc.body.appendChild($style)
              });
            
           
             cy.window().then(cyWindow => scrollToBottom({frequency: 10, timing: 5000 ,remoteWindow: cyWindow }));
         i=i+1
         cy.log(i)
       cy.percySnapshot("Cons8-page-"+i);
        });
       })
}) 
