describe('User-Onboarding App', () => {

    beforeEach(() => {
        cy.visit('localhost:3000/pizza')
    })

    const nameInput = () => cy.get('input[name="name"]');
    const pepperoni = () => cy.get('input[name="pepperoni"]');
    const sausage = () =>  cy.get('input[name="sausage"]');
    const ham = () => cy.get('input[name="ham"]');
    const sizeInput = () => cy.get('select[name="size"]');
    const submitBtn = () => cy.get('button');

    it('can add text into the box', () => {
        nameInput()
            .should('exist')
            .type('Daniel')
            .should('have.value', 'Daniel')
    })

    it('can check multiple toppings', () => {
        pepperoni()
            .click()
            .should('be.checked')
        sausage()
            .click()
            .should('be.checked')
        ham()
            .click()
            .should('be.checked')
    })

    it('can submit the form', () => {
        nameInput()
            .should('exist')
            .type('Daniel')
            .should('have.value', 'Daniel')
        sizeInput()
            .should('exist')
            .select('small')
        pepperoni()
            .click()
            .should('be.checked')
        submitBtn()
            .should('not.be.disabled')
            .click()
        
    })

})