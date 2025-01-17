# Desafio Backend - LAComp Ufal

## Objetivo

O objetivo desse desafio é avaliar e nivelar o nível de desenvolvimento do time que cuidara da frente Backend da LAComp, avaliando pontos especificos como:

- Git/Github
- Arquitetura
- Rotas
- Injeção de dependências

<b>Opcionais:</b>

- Integração com o banco de dados [PostgreSql](https://www.postgresql.org/)
- TypeORM

Lembre-se, você não precisa saber fazer TUDO que esta descrito para ser avaliado, faça o seu melhor

## Desafio

O desafio consiste no desenvolvimento de uma API em [NestJS](https://nestjs.com/) que lide com postagens de noticias.

Essas noticias consistem em:

- Título
- Subtítulo
- Conteúdo da postagem 
- Nome do atutor
- Data da postagem
- Ultima alteração

O controller de noticias deve conter os seguintes verbos: GET, POST, PUT, DELETE

Lembre-se de criar um GET que lista todas as postagnes e um outro GET que devolva apenas uma das noticias baseado no ID da notícia enviado pelos parametros da requisição.

## Instruções para avaliação

Crie um [Fork](https://docs.github.com/pt/get-started/quickstart/fork-a-repo) desse repositório onde você deverá publicar seu projeto, junto com as instruções de execução. Lembre-se de deixa-lo público.

## Instruções para execução

Primeiramente é necessário que se altere o arquivo typeorm.config.ts, alterando para seu usuário e senha utilizados no postgresql.

O arquivo está localizado dentro do diretório da API, no seguinte path: ./src/configs

Após isso, instale as dependências do projeto usando o package.json 

```
npm install
```

O mesmo instalará as dependências do projeto em seu diretório.

Após isso, basta abrir o terminal e navegar até o diretório da API(api-teste-lacomp) e digitar o seguinte comando:

```
npm run start:dev
```

E a API estará em execução. 

A mesma executará na porta 3000 e se conectará ao postgresql pela porta de comunicação 5432.

A documentação da API é gerada utilizando Swagger/OpenAPI 3.0, para visualiza-la basta acessar localhost:3000/api, aqui você visualizará com detalhes as definições de cada endpoint e os respectivos comportamentos esperados de cada um dos verbos HTTP utilizados, além da possibilidade de visualizar as entidades na ba de "Schemas", localizada ao final da página.

