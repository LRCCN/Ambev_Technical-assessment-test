describe('Visitar a página', () => {
    beforeEach(() => {
        cy.visit('https://front.serverest.dev')
    })

    it('Página de Login deve ser visível', () => {
        cy.url().should('include', 'front.serverest.dev')
        cy.get('h1.font-robot').should('have.text', 'Login');
        cy.get('[data-testid="entrar"]').should('be.visible')
    })


    it('Login: Sem credenciais', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Email é obrigatório").should('be.visible')
        cy.contains('span', "Password é obrigatório").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })

    })

    it('Login: Credenciais inválidas', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@321');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Email e/ou senha inválidos").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        })
    })

    it('Login: Email válido e Senha inválida', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@321');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Email e/ou senha inválidos").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        })
    })

    it('Login: Email inválido e Senha válida', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@invalido.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Email e/ou senha inválidos").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        })
    })

    it('Login: Email válido e Sem Senha', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@invalido.com');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Password é obrigatório").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })
    })

    it('Login: Senha válida e Sem Email', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();
        cy.contains('span', "Email é obrigatório").should('be.visible')
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        })
    })

    it('Login Administrador com credenciais válidas', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginPostRequest');
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('loginGetRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="home"]').should('be.visible').and('contain', 'Home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible').and('contain', 'Cadastrar Usuários');
        cy.get('[data-testid="listar-usuarios"]').should('be.visible').and('contain', 'Listar Usuários');
        cy.get('[data-testid="cadastrar-produtos"]').should('be.visible').and('contain', 'Cadastrar Produtos');
        cy.get('[data-testid="listar-produtos"]').should('be.visible').and('contain', 'Listar Produtos');
        cy.get('[data-testid="link-relatorios"]').should('be.visible').and('contain', 'Relatórios');
        cy.contains('h1', "Bem Vindo Luiz Roberto").should('be.visible')
        cy.contains('p', "Este é seu sistema para administrar seu ecommerce.").should('be.visible')
        cy.wait('@loginPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        cy.wait('@loginGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        
    })

    it('Logout da conta', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginPostRequest');
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('loginGetRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="home"]').should('be.visible').and('contain', 'Home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible').and('contain', 'Cadastrar Usuários');
        cy.get('[data-testid="listar-usuarios"]').should('be.visible').and('contain', 'Listar Usuários');
        cy.get('[data-testid="cadastrar-produtos"]').should('be.visible').and('contain', 'Cadastrar Produtos');
        cy.get('[data-testid="listar-produtos"]').should('be.visible').and('contain', 'Listar Produtos');
        cy.get('[data-testid="link-relatorios"]').should('be.visible').and('contain', 'Relatórios');
        cy.contains('h1', "Bem Vindo Luiz Roberto").should('be.visible')
        cy.contains('p', "Este é seu sistema para administrar seu ecommerce.").should('be.visible')
        cy.wait('@loginPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); })
        cy.wait('@loginGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); })
       
       
        cy.get('[data-testid="logout"]').click();
        cy.url().should('include', 'front.serverest.dev')
        cy.get('h1.font-robot').should('have.text', 'Login');
        cy.get('[data-testid="entrar"]').should('be.visible')
    })

        it('Cadastrar Usuário Administrador - Dentro da Plataforma', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginPostRequest');
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('loginGetRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();
        cy.wait('@loginPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); })
        cy.wait('@loginGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); })
        cy.get('[data-testid="home"]').should('be.visible').and('contain', 'Home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible').and('contain', 'Cadastrar Usuários');
        cy.get('[data-testid="listar-usuarios"]').should('be.visible').and('contain', 'Listar Usuários');
        cy.get('[data-testid="cadastrar-produtos"]').should('be.visible').and('contain', 'Cadastrar Produtos');
        cy.get('[data-testid="listar-produtos"]').should('be.visible').and('contain', 'Listar Produtos');
        cy.get('[data-testid="link-relatorios"]').should('be.visible').and('contain', 'Relatórios');
        cy.contains('h1', "Bem Vindo Luiz Roberto").should('be.visible')
        cy.contains('p', "Este é seu sistema para administrar seu ecommerce.").should('be.visible')

        cy.get('[data-testid="cadastrar-usuarios"]').click();
        cy.contains('h1', "Cadastro de usuários").should('be.visible')
        
        cy.intercept('POST', 'https://serverest.dev/usuarios').as('CadastroInsideRequest');
        cy.get('[data-testid="nome"]').click();
        cy.get('[data-testid="nome"]').type('Luiz Roberto');
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow20@hotmail.com');
        cy.get('[data-testid="password"]').click();
        cy.get('[data-testid="password"]').type('Maker@123');
        cy.get('[data-testid="checkbox"]').check();
        cy.get('[data-testid="cadastrarUsuario"]').click();
        cy.contains ('span', "Este email já está sendo usado").should('be.visible')
        cy.wait('@CadastroInsideRequest').then((interception) => {
            cy.wait(5000); // waits for 5 segundos
            expect(interception.response.statusCode).to.eq(400);})

        cy.contains('span', "Este email já está sendo usado").should('be.visible')
        cy.get('[data-testid="home"]').click();
        cy.contains('h1', "Bem Vindo Luiz Roberto Carneiro da Cunha Neto").should('be.visible')
        
       
    })

        it('Listar Usuários: Administrador = true/false', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginPostRequest');
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('loginGetRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow20@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="home"]').should('be.visible').and('contain', 'Home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible').and('contain', 'Cadastrar Usuários');
        cy.get('[data-testid="listar-usuarios"]').should('be.visible').and('contain', 'Listar Usuários');
        cy.get('[data-testid="cadastrar-produtos"]').should('be.visible').and('contain', 'Cadastrar Produtos');
        cy.get('[data-testid="listar-produtos"]').should('be.visible').and('contain', 'Listar Produtos');
        cy.get('[data-testid="link-relatorios"]').should('be.visible').and('contain', 'Relatórios');
        cy.contains('h1', "Bem Vindo Luiz Roberto").should('be.visible')
        cy.contains('p', "Este é seu sistema para administrar seu ecommerce.").should('be.visible')
        cy.wait('@loginPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        cy.wait('@loginGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        cy.get('[data-testid="listar-usuarios"]').click();
        cy.contains('h1', "Lista dos usuários").should('be.visible')
        cy.get('tr').contains('td', 'luizitow20@hotmail.com') // Encontra a linha do e-mail.
        .parent() // verifica os elementos <tr>
        .within(() => {
            cy.contains('td', 'true').should('be.visible') // Verifique se 'true' está na mesma linha.
            
        })

        cy.get('tr').contains('td', 'luizitow10@hotmail.com') // Encontra a linha do e-mail.
        .parent() // verifica os elementos <tr>
        .within(() => {
            cy.contains('td', 'false').should('be.visible') // Verifique se 'true' está na mesma linha.

        })
    })

        it('Cadastrar produto', () => {
        cy.intercept('POST', 'https://serverest.dev/login').as('loginPostRequest');
        cy.intercept('GET', 'https://serverest.dev/usuarios').as('loginGetRequest');
        cy.visit('https://front.serverest.dev')
        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="email"]').type('luizitow@hotmail.com');
        cy.get('[data-testid="senha"]').type('Maker@123');
        cy.get('[data-testid="entrar"]').click();

        cy.get('[data-testid="home"]').should('be.visible').and('contain', 'Home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible').and('contain', 'Cadastrar Usuários');
        cy.get('[data-testid="listar-usuarios"]').should('be.visible').and('contain', 'Listar Usuários');
        cy.get('[data-testid="cadastrar-produtos"]').should('be.visible').and('contain', 'Cadastrar Produtos');
        cy.get('[data-testid="listar-produtos"]').should('be.visible').and('contain', 'Listar Produtos');
        cy.get('[data-testid="link-relatorios"]').should('be.visible').and('contain', 'Relatórios');
        cy.contains('h1', "Bem Vindo Luiz Roberto").should('be.visible')
        cy.contains('p', "Este é seu sistema para administrar seu ecommerce.").should('be.visible')
        cy.wait('@loginPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        cy.wait('@loginGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})

        cy.get('[data-testid="cadastrar-produtos"]').click();

        cy.get('[data-testid="nome"]').click();
        const randomName = 'Smart Watch ' + Math.random().toString(36).substring(2, 8);
        cy.get('[data-testid="nome"]').type(randomName);

        cy.get('[data-testid="preco"]').click();
        cy.get('[data-testid="preco"]').type('2000');
        cy.get('[data-testid="descricao"]').click();
        cy.get('[data-testid="descricao"]').type('LTE, GPS, WIFI');
        cy.get('[data-testid="quantity"]').clear().type('1');
        cy.get('[data-testid="cadastarProdutos"]').click();

        cy.intercept('POST', 'https://serverest.dev/produtos').as('ProductPostRequest');
        cy.intercept('GET', 'https://serverest.dev/produtos').as('ProductGetRequest');
        cy.wait('@ProductGetRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);})
        cy.wait('@ProductPostRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);})
        })
    });
