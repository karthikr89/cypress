/// <reference types = "cypress"/>

import {article} from '../support/pages/articlePage'

describe('Api test', () => {

    beforeEach(() => {
        cy.server()
        cy.route('GET', '**/tags', 'fixture:tags.json')
        cy.login()
    })

    it.skip('Validate login', () => {

        cy.server()
        cy.route('POST', '**/articles').as('newArticle')
        article.createNewArticle('sample Article', 'This is my article', 'This is article body', 'cypress')

        cy.wait('@newArticle')
        cy.get('@newArticle').then(artRes => {
            expect(artRes.status).to.equal(200)
        })
    })

    it('Mocking responses', () => {
        cy.get('.tag-list').then(tagList => {
            console.log(tagList.text())
        })
    })

    it('Mocking responses for articles and feeds', () => {
        cy.route('GET', '**/articles/feed*', '{"articles":[],"articlesCount":0}')
        cy.route('GET', '**/articles*', 'fixture:articles.json')
        cy.contains('Global Feed').click()


        cy.fixture('articles.json').then(file => {
            const articleRef = file.articles[1].slug
            cy.route('POST', `**/articles/${articleRef}/favorite`, file)
        })

        cy.get('app-article-list button').eq(1).click()
        .should('contain', `801`)
    })

    it.skip('API request', () => {
        
        const newArticleURL = `${Cypress.env('apiUrl')}api/articles/`

        const articlePayload = {
            "article":{
                "tagList":[],
                "title":"TEST Article 3",
                "description":"TESTING",
                "body":"GREAT"
            }
        }

        cy.get('@token').then(token => {

            cy.request({
                url: newArticleURL,
                headers: {'Authorization': `Token ${token}` },
                method: 'POST',
                body: articlePayload
            }).then(response => {
                expect(response.status).to.equal(200)
            })

            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().find('h1').click()

            cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: `${Cypress.env('apiUrl')}api/articles?limit=10&offset=0`,
                headers: {'Authorization': `Token ${token}`},
                method: 'GET'
            }).its('body').then( body => {
                expect(body.articles[0].title).to.equal('TEST Article 3')
            })
        })

    })
})