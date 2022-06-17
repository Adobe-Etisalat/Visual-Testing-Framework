describe("visual test of walls site page",function(){



    beforeEach(function()
   {
        cy.fixture("/TopConsumer/production/urlcheck.json").then((data) =>{

            this.testdata=data

        })

    })



    it("openpage and check if valid",function(){

        let arrayOsPage=this.testdata.wallspage

        arrayOsPage.forEach(element => {

            var urls=element

            cy.request({url:urls,failOnStatusCode:false,followRedirect:false}).then(some=>{
                console.log('status code for the url:'+urls+" is :"+some.status)
            })

        });

    })

})