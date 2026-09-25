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

## Segurança

* **Senhas criptografadas** — senhas de clientes e cuidadores são salvas como hash `bcrypt` e nunca aparecem nas respostas da API.
* **Filtro de campos** — as rotas de atualização (`PUT`) só aceitam os campos editáveis de cada entidade. Campos protegidos, como `id`, `status`, `cuidadorId` e `clienteId`, são ignorados.
* **Exclusão de cuidador** — solicitações aceitas pelo cuidador excluído voltam para `PENDENTE`, ficando disponíveis para outros cuidadores.

## Testes

A coleção `docs/insomnia_testes_catsitter.json` pode ser importada no Insomnia e contém todas as requisições da API, além de testes de erro.
