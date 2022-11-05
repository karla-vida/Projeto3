## PROJETO LABCAR

## INTRODUÇÃO
Esse projeto visa desenvolver o back-end de um aplicativo para solicitar transporte de carros.

## REQUISITOS DA APLICAÇÃO
Desenvolvido utilizando a linguagem Node com NestJS;

## ROTEIRO DA APLICAÇÃO
O aplicativo tem um back-end de administração, ou seja, um programa que através dele seja possível controlar quem são os motoristas, os passageiros e as corridas realizadas.

# ENDPOINTS DO MOTORISTA
- Listar motoristas
- Detalhes motorista
- Criar um motorista
- Atualizar os dados cadastrais de um motorista
- Bloquear motorista
- Exclusão de motorista

# ENDPOINTS DO PASSAGEIRO
- Listar passageiros
- Detalhes passageiro
- Criar um passageiro
- Atualizar os dados cadastrais de um passageiro
- Exclusão de um passageiro

# ENDPOINTS DE VIAGENS
- Solicitar uma viagem
- Viagens próximas do motorista

# DESAFIO EXTRA
A integração com a API do Google para obter de forma real as viagens próximas ao motorista utilizado a API Directions.
Documentação: https://developers.google.com/maps/documentation/directions/start


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).