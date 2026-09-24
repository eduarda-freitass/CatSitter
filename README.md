# CatSitter 

API REST do CatSitter, um sistema que conecta clientes que precisam de cuidados para seus gatos a cuidadores freelancers.

## Tecnologias

* Node.js
* Express
* Sequelize
* SQLite
* JavaScript

## Como executar

Instale as dependências:

```bash
npm install
```

Execute em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Entidades

* **Cliente** — pessoa que solicita o serviço.
* **Cuidador** — profissional que realiza as visitas.
* **Gato** — animal cadastrado pelo cliente.
* **Solicitação** — pedido de visita para um gato.

Relacionamentos:

```text
Cliente 1 ─── N Gato
Gato 1 ─── N Solicitação
Cuidador 1 ─── N Solicitação
```

## Principais endpoints

| Método | Rota                         | Função                          |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/clientes`                  | Listar clientes                 |
| POST   | `/clientes`                  | Cadastrar cliente               |
| GET    | `/cuidadores`                | Listar cuidadores               |
| POST   | `/cuidadores`                | Cadastrar cuidador              |
| GET    | `/gatos`                     | Listar gatos                    |
| POST   | `/gatos`                     | Cadastrar gato                  |
| GET    | `/solicitacoes`              | Listar solicitações disponíveis |
| POST   | `/solicitacoes`              | Criar solicitação               |
| PATCH  | `/solicitacoes/:id/aceitar`  | Aceitar solicitação             |
| PATCH  | `/solicitacoes/:id/concluir` | Concluir solicitação            |

## Fluxo principal

```text
Cliente cadastra gato
        ↓
Cria solicitação
        ↓
Solicitação PENDENTE
        ↓
Cuidador aceita
        ↓
Solicitação ACEITA
        ↓
Visita realizada
        ↓
Solicitação CONCLUIDA
```

O projeto utiliza SQLite para persistência dos dados.
