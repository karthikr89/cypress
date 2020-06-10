export class ArticlePage {
    createNewArticle(articleName, articleDesc, articleBody, articleTag) {
        cy.contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type(articleName)
        cy.get('[formcontrolname="description"]').type(articleDesc)
        cy.get('[formcontrolname="body"]').type(articleBody)
        cy.get('[placeholder="Enter tags"]').type(articleTag)
        cy.contains('button', 'Publish Article').click()
    }
}

export const article = new ArticlePage