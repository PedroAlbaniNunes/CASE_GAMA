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
entity Aluno {
    nome String
}

entity Meta {
    valor Integer
    area AreaDoEnem
}

relationship OneToMany {
    Aluno to Meta
}

enum AreaDoEnem {
    LINGUAGENS,
    CIENCIAS_HUMANAS,
    CIENCIAS_NATUREZA,
    MATEMATICA
}
