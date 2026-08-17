# Black Friday Shop

## Sobre o projeto

Este projeto é um estudo de um monorepo para simular o fluxo de checkout de um e-commerce, organizado em serviços independentes com foco em integração entre aplicações, observabilidade e infraestrutura moderna.

A ideia central é representar um ambiente de loja digital com dois serviços principais:

- Carrinho: responsável por receber e manter os itens selecionados pelo cliente, controlar quantidades e preparar o pedido.
- Catálogo: responsável por representar o estoque e os produtos disponíveis, simulando a fonte de dados do inventário.

O objetivo não é entregar uma solução completa ou pronta para produção, mas sim criar um ambiente de aprendizado para explorar como microsserviços podem conversar entre si, compartilhar responsabilidades e evoluir de forma modular.

Esse tipo de arquitetura ajuda a entender melhor conceitos como:

- separação de domínios por serviço;
- comunicação entre aplicações;
- uso de banco de dados por serviço;
- observabilidade com métricas, traces e logs;
- execução local via containers e docker-compose.

## Arquitetura

O projeto está organizado como um monorepo com dois serviços principais dentro da pasta src:

### 1. Serviço de carrinho

O serviço de carrinho é o ponto de entrada do cliente para o processo de compra. Ele representa a experiência de adicionar produtos, atualizar quantidades, calcular o total e preparar a etapa final do checkout.

Em um cenário mais completo, esse serviço poderia:

- receber itens do cliente;
- consultar informações do catálogo;
- validar disponibilidade;
- calcular subtotal e total;
- preparar a finalização do pedido.

### 2. Serviço de catálogo

O serviço de catálogo funciona como a camada de estoque e produto. Ele representa os dados de itens disponíveis para venda, como nome, preço, quantidade e disponibilidade.

Sua responsabilidade principal é simular o estoque do e-commerce e fornecer informações que o serviço de carrinho pode usar para validar ou enriquecer a experiência de compra.

### Estrutura de integração

A arquitetura foi pensada para aproximar o comportamento de um sistema distribuído, mesmo em um ambiente de estudo. A comunicação entre os serviços pode evoluir com:

- chamadas HTTP entre os serviços;
- modelos de dados separados por domínio;
- rotas e controladores específicos para cada responsabilidade;
- camada compartilhada para logging, instrumentação e acesso ao banco.

Além disso, o projeto também inclui infraestrutura para observabilidade, com o objetivo de monitorar traces, métricas e logs dos serviços em execução.

## Dependências e tecnologias

O projeto utiliza uma stack moderna para experimentação e aprendizado:

- TypeScript: tipagem e organização do código;
- Node.js 26: runtime principal da aplicação;
- Express: framework para criação dos serviços HTTP;
- Prisma ORM: modelagem e acesso ao banco de dados;
- PostgreSQL: banco relacional para persistência;
- Docker e Docker Compose: ambiente dos serviços e infraestrutura local;
- OpenTelemetry (OTel): instrumentação para tracing e observabilidade;
- Collector: coleta e exportação de dados de telemetria;
- Jaeger: visualização de traces distribuídos;
- Prometheus: coleta e monitoramento de métricas;
- tsx: execução rápida em ambiente de desenvolvimento.

## Visão geral

Este repositório funciona como uma base para aprender a montar um ambiente de e-commerce com múltiplos serviços, sem necessidade de implementar tudo de forma completa desde o início. A ideia é evoluir gradualmente, integrando conceitos de arquitetura, comunicação entre microsserviços, persistência e observabilidade em um projeto prático e didático.
