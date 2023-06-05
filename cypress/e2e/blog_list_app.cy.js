const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'sekret',
}

const anotherUser = {
  name: 'Another User',
  username: 'anotheruser',
  password: 'anotherpassword',
}

describe('Blog app', () => {
  beforeEach(function () {
    cy.resetDatabase()

    cy.addUser(testUser)
    cy.addUser(anotherUser)

    cy.visit('/')
  })

  describe('when open app', () => {
    it('App is shown', function () {
      cy.contains('Blog list')
      cy.contains('Login')
    })

    it('Login form is shown', function () {
      cy.contains('Login').click()

      cy.get('#username')
      cy.get('#password')
      cy.get('#login-button')
      cy.get('.cancel-button')
    })

    it('Login form can be hidden', () => {
      cy.contains('Login').click()
      cy.get('.cancel-button').click()
      cy.get('#username').should('not.exist')
      cy.get('#password').should('not.exist')
      cy.get('#login-button').should('not.exist')
      cy.get('.cancel-button').should('not.exist')
    })
  })

  describe('when try login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()

      cy.contains(`Welcome ${testUser.name}!`)
      cy.contains('Logout')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type(testUser.username)
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Login')
      cy.contains('Incorrect username or password. Please try again.')

      cy.get('.notification-error p').should(
        'have.css',
        'color',
        'rgb(185, 56, 56)'
      )
      cy.get('.notification-error').should(
        'have.css',
        'background-color',
        'rgb(255, 235, 238)'
      )
    })
  })

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('A blog can be created', () => {
      cy.contains('New blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('http://test.com')
      cy.get('#create-blog-button').click()

      cy.get('.blog').contains('Test blog')
      cy.contains('Test author')
    })

    describe('and a blog exists', () => {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog',
          url: 'http://test.com',
          author: 'Test author',
        })
      })

      it('A blog detail cam be viewed', () => {
        cy.contains('Test blog')
          .parentsUntil('.blog')
          .find('.view-button')
          .click()
        cy.contains('Test author')
        cy.contains('URL: http://test.com')
        cy.contains('Likes: 0')
        cy.contains('Added by: Test User')
      })

      it('A blog can be liked', () => {
        cy.contains('Test blog').parentsUntil('.blog').as('blog')

        cy.get('@blog').find('.view-button').click()

        cy.get('@blog').find('.like-button').click()

        cy.contains('Likes: 1')
      })

      it('A blog can be liked by another user', () => {
        cy.contains('Logout').click()

        cy.login({
          username: anotherUser.username,
          password: anotherUser.password,
        })

        cy.contains('Test blog').parentsUntil('.blog').as('blog')

        cy.get('@blog').find('.view-button').click()

        cy.get('@blog').find('.like-button').click()

        cy.contains('Likes: 1')
      })

      it('A blog can be deleted', () => {
        cy.contains('Test blog').parentsUntil('.blog').as('blog')

        cy.get('@blog').find('.view-button').click()

        cy.get('@blog').find('.remove-button').click()

        cy.get('.blog').should('not.exist')
      })

      it('A blog can not be deleted by another user', () => {
        cy.contains('Test blog').parentsUntil('.blog').as('blog')

        cy.get('@blog').find('.view-button').click()

        cy.get('@blog').find('.remove-button')

        cy.contains('Logout').click()

        cy.login({
          username: anotherUser.username,
          password: anotherUser.password,
        })

        cy.get('@blog').find('.view-button').click()

        cy.get('@blog').find('.remove-button').should('not.exist')
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog 0',
          url: 'http://test0.com',
          author: 'Test author 0',
        })

        cy.createBlog({
          title: 'Test blog 1',
          url: 'http://test1.com',
          author: 'Test author 1',
        })

        cy.createBlog({
          title: 'Test blog 2',
          url: 'http://test2.com',
          author: 'Test author 2',
        })
      })

      it('Blogs are ordered by likes', () => {
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).as('blog0')
          cy.get('@blog0').find('.view-button').click()
          cy.get('@blog0').find('.like-button').click()
          cy.get('@blog0').find('.like-button').click()

          cy.wrap(blogs[1]).as('blog1')
          cy.get('@blog1').find('.view-button').click()
          cy.get('@blog1').find('.like-button').click()
          cy.get('@blog1').find('.like-button').click()
          cy.get('@blog1').find('.like-button').click()

          cy.wrap(blogs[2]).as('blog2')
          cy.get('@blog2').find('.view-button').click()
          cy.get('@blog2').find('.like-button').click()
        })

        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).contains('Test blog 1')
          cy.wrap(blogs[1]).contains('Test blog 0')
          cy.wrap(blogs[2]).contains('Test blog 2')
        })
      })
    })
  })
})
