# Desafio Gama - Desenvolvimento de Aplicação com JHipster

Este repositório contém a solução para o desafio proposto pela Gama, que consiste no desenvolvimento de uma aplicação CRUD utilizando a ferramenta JHipster. A aplicação tem como objetivo permitir o cadastro de metas de notas para alunos, com base nas áreas do ENEM.

## Tecnologias Utilizadas

- **Backend**: Java
- **Frontend**: Angular
- **Banco de Dados**: PostgreSQL

## Funcionalidades

- **Login de Administrador**: A aplicação permite o login de um administrador com as credenciais padrão (admin/admin).
- **Cadastro de Alunos**: O administrador pode cadastrar novos alunos.
- **Definição de Metas**: O administrador pode definir metas de notas para cada aluno, com base nas áreas do ENEM.

## Modelo JDL

O modelo JDL utilizado para gerar a aplicação é o seguinte:

```jdl
enum AreaDoEnem {
    LINGUAGENS_CODIGOS_E_SUAS_TECNOLOGIAS,
    CIENCIAS_HUMANAS_E_SUAS_TECNOLOGIAS,
    CIENCIAS_DA_NATUREZA_E_SUAS_TECNOLOGIAS,
    MATEMATICA_E_SUAS_TECNOLOGIAS
}

entity Alunos {
    nome String
    cpf Integer
    matricula Integer
    nascimento LocalDate
    anoLetivo Integer
}

entity Meta {
    notaAnterior Double
    valor Double
    area AreaDoEnem
    aluno Alunos  // Referência para Alunos
}

relationship OneToMany {
    Alunos{metas} to Meta{aluno}
}
