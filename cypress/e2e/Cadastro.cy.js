describe('Visitar a página', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev')
  })
  it('Cadastro Administrador', () => {
    cy.intercept('POST', 'https://serverest.dev/usuarios').as('CadastroRequest');
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('[data-testid="nome"]').click();
    cy.get('[data-testid="nome"]').type('Luiz Roberto');
    cy.get('[data-testid="email"]').click();
    cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
    cy.get('[data-testid="password"]').click();
    cy.get('[data-testid="password"]').type('Maker@123');
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains ('span', "Este email já está sendo usado").should('be.visible')
        cy.wait('@CadastroRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })
    })
    
    it('Cadastro Administrador', () => {
    cy.intercept('POST', 'https://serverest.dev/usuarios').as('CadastroRequest');
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('[data-testid="nome"]').click();
    cy.get('[data-testid="nome"]').type('Luiz Roberto');
    cy.get('[data-testid="email"]').click();
    cy.get('[data-testid="email"]').type('luizitow20@hotmail.com');
    cy.get('[data-testid="password"]').click();
    cy.get('[data-testid="password"]').type('Maker@123');
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains ('span', "Este email já está sendo usado").should('be.visible')
        cy.wait('@CadastroRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })

})

  it('Cadastro Não Administrador', () => {
    cy.intercept('POST', 'https://serverest.dev/usuarios').as('CadastroRequest');
    cy.get('[data-testid="cadastrar"]').click();
    cy.get('[data-testid="nome"]').click();
    cy.get('[data-testid="nome"]').type('Luiz Roberto');
    cy.get('[data-testid="email"]').click();
    cy.get('[data-testid="email"]').type('luizitow10@hotmail.com');
    cy.get('[data-testid="password"]').click();
    cy.get('[data-testid="password"]').type('Maker@123');
    cy.get('[data-testid="cadastrar"]').click();
    cy.contains ('span', "Este email já está sendo usado").should('be.visible')
         cy.wait('@CadastroRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })
})

});