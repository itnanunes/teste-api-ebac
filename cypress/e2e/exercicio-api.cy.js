/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
  
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
  })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request ({
      method: 'POST',
      url: 'usuarios',
      body: {

        "nome": "Fulano da Silva",
        "email": "beltrano@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
     expect(response.status).equal(201)
     expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    });
  });

  it.only('Deve validar um usuário com email inválido', () => {
    cy.request ({
      method: 'POST',
      url: 'usuarios',
      body: {

        "nome": "Fulano da Silva",
        "email": "beltrano@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }, failOnStatusCode: false
    }).should((response) => {
     expect(response.status).equal(400)
     expect(response.body.message).to.equal('Este email já está sendo usado')
    }); 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});
