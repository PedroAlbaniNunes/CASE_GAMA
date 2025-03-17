import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Alunos e2e test', () => {
  const alunosPageUrl = '/alunos';
  const alunosPageUrlPattern = new RegExp('/alunos(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const alunosSample = {};

  let alunos;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/alunos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/alunos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/alunos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (alunos) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/alunos/${alunos.id}`,
      }).then(() => {
        alunos = undefined;
      });
    }
  });

  it('Alunos menu should load Alunos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('alunos');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Alunos').should('exist');
    cy.url().should('match', alunosPageUrlPattern);
  });

  describe('Alunos page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(alunosPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Alunos page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/alunos/new$'));
        cy.getEntityCreateUpdateHeading('Alunos');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunosPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/alunos',
          body: alunosSample,
        }).then(({ body }) => {
          alunos = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/alunos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [alunos],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(alunosPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Alunos page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('alunos');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunosPageUrlPattern);
      });

      it('edit button click should load edit Alunos page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Alunos');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunosPageUrlPattern);
      });

      it('edit button click should load edit Alunos page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Alunos');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunosPageUrlPattern);
      });

      it('last delete button click should delete instance of Alunos', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('alunos').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunosPageUrlPattern);

        alunos = undefined;
      });
    });
  });

  describe('new Alunos page', () => {
    beforeEach(() => {
      cy.visit(`${alunosPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Alunos');
    });

    it('should create an instance of Alunos', () => {
      cy.get(`[data-cy="nome"]`).type('while vary');
      cy.get(`[data-cy="nome"]`).should('have.value', 'while vary');

      cy.get(`[data-cy="cpf"]`).type('29023');
      cy.get(`[data-cy="cpf"]`).should('have.value', '29023');

      cy.get(`[data-cy="matricula"]`).type('660');
      cy.get(`[data-cy="matricula"]`).should('have.value', '660');

      cy.get(`[data-cy="nascimento"]`).type('2025-03-16');
      cy.get(`[data-cy="nascimento"]`).blur();
      cy.get(`[data-cy="nascimento"]`).should('have.value', '2025-03-16');

      cy.get(`[data-cy="anoLetivo"]`).type('31138');
      cy.get(`[data-cy="anoLetivo"]`).should('have.value', '31138');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        alunos = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', alunosPageUrlPattern);
    });
  });
});
