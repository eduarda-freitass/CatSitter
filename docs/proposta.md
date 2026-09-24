# Proposta do CatSitter

## 1. Problema

Pessoas que possuem gatos podem ter dificuldades para encontrar alguém disponível e confiável para cuidar dos animais quando precisam se ausentar.

O CatSitter propõe uma forma simples de conectar essas pessoas a cuidadores freelancers que realizam visitas para atender às necessidades dos gatos.

## 2. Público-alvo

O sistema possui dois públicos principais:

**Clientes:** pessoas que possuem gatos e precisam solicitar cuidados para eles.
**Cuidadores:** pessoas que oferecem serviços de cuidados para gatos.

## 3. Objetivo

Desenvolver uma aplicação que permita aos clientes cadastrar seus gatos e solicitar serviços de cuidados, enquanto os cuidadores podem visualizar e aceitar solicitações disponíveis.

## 4. Funcionalidades

### Cliente

 Cadastrar conta.
 Cadastrar gatos.
 Criar solicitações de visita.
 Consultar suas solicitações.

### Cuidador

 Cadastrar-se como cuidador.
 Visualizar solicitações disponíveis.
 Aceitar uma solicitação.
 Visualizar solicitações aceitas.
 Concluir uma visita.

## 5. Fluxo principal

```text
Cliente
   |
Cadastra gato
   |
Cria solicitação
   |
Solicitação fica PENDENTE
   |
Cuidador visualiza
   |
Cuidador aceita
   |
Solicitação fica ACEITA
   |
Visita é realizada
   |
Solicitação fica CONCLUIDA
```

## 6. Relação com a API

As principais funcionalidades do aplicativo serão integradas à API por meio de endpoints relacionados às entidades Cliente, Cuidador, Gato e Solicitação.

A documentação detalhada dos endpoints será apresentada no arquivo `docs/endpoints.md`.
