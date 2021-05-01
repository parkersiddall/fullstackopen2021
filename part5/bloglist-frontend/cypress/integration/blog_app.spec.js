/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login functionality', function () {
    beforeEach(function() {

      const testUser = {
        username: 'testUser',
        name: 'Bob Dole',
        password: 'password'
      }

      cy.request('POST', 'http://localhost:3003/api/users', testUser)
    })

    it('Login with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('You are logged in as testUser')
    })

    it('Login with incorrect credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testUser')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('Login failed.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {

      const testUser = {
        username: 'testUser',
        name: 'Bob Dole',
        password: 'password'
      }

      cy.request('POST', 'http://localhost:3003/api/users', testUser)
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      // click button
      cy.contains('add blog').click()

      // check that the form is there
      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      // insert to form
      cy.get('#titleBlogForm').type('this is a test')
      cy.get('#authorBlogForm').type('hannah montana')
      cy.get('#urlBlogForm').type('https://www.youtube.com')

      cy.get('#submitBlogForm').click()

      cy.contains('Blog added successfully!')
      cy.contains('this is a test')
    })
  })

  describe('Interacting with blogs', function () {
    beforeEach(function() {

      const testUser = {
        username: 'testUser',
        name: 'Bob Dole',
        password: 'password'
      }

      cy.request('POST', 'http://localhost:3003/api/users', testUser)
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testUser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      // add a blog
      cy.contains('add blog').click()
      cy.get('#titleBlogForm').type('this is a test')
      cy.get('#authorBlogForm').type('hannah montana')
      cy.get('#urlBlogForm').type('https://www.youtube.com')
      cy.get('#submitBlogForm').click()
    })

    it('user can like blog', function () {
      cy.contains('view').click()
      cy.get('.likeBlogButton:first').click()
      cy.get('.likeCount:first').contains('1')
    })

    it('user can delete their post', function () {
      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.contains('this is a test').should('not.exist')

    })
  })
})