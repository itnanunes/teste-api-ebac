/// <reference types="cypress" />
import contrato from '../contracts/user.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach (() =>{
    cy.token('it@qa.com.br', 'teste').then(tkn => {token = tkn})
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios')
    .then(response =>{
      return contrato.validateAsync(response.body)
   });
 });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  })
  
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

        "nome": "It e Dk",
        "email": 5,
        "password": "teste",
        "administrador": "true"
      // Validar statuscode de erro
      }, failOnStatusCode: false
    }).should((response) => {
     expect(response.status).equal(400)
     expect(response.body.email).to.equal('email deve ser uma string')
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let usuario =  'Usuário editado ' + Math.floor(Math.random() * 100)
    cy.cadastrarUser(token, 'It Malia', 'usuario@teste.com', 'teste')
    .then(response=> {
      let id = response.body._id
        cy.request ({
          method: 'PUT',
          url: `usuarios/${id}`,
          headers: {authorization: token},
          body: {
            "nome": usuario,
            "email": "usuarioeditado2@teste.com",
            "password": "teste",
            "administrador": "true"
          }

        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body.message).to.equal('Registro alterado com sucesso')
     })
    })
  })
  
  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUser(token, '"Usuário editado 101', 'usuarioeditado21@teste.com', 'teste')
    .then(response=> {
      let id = response.body._id
        cy.request ({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: {authorization: token},     
          }
        )}).should(resp => {
            expect(resp.body.message).to.equal('Registro excluído com sucesso')
            expect(resp.status).to.equal(200)
       })
    }) 
  });
