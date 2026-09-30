# Endpoints da API

Base URL: `http://localhost:3000`

| Método | Rota                         | Função                          |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/clientes`                  | Listar clientes                 |
| POST   | `/clientes`                  | Cadastrar cliente               |
| PUT    | `/clientes/:id`              | Atualizar cliente               |
| DELETE | `/clientes/:id`              | Excluir cliente                 |
| GET    | `/cuidadores`                | Listar cuidadores               |
| POST   | `/cuidadores`                | Cadastrar cuidador              |
| PUT    | `/cuidadores/:id`            | Atualizar cuidador              |
| DELETE | `/cuidadores/:id`            | Excluir cuidador                |
| GET    | `/gatos`                     | Listar gatos                    |
| POST   | `/gatos`                     | Cadastrar gato                  |
| PUT    | `/gatos/:id`                 | Atualizar gato                  |
| DELETE | `/gatos/:id`                 | Excluir gato                    |
| GET    | `/solicitacoes`              | Listar solicitações disponíveis |
| POST   | `/solicitacoes`              | Criar solicitação               |
| PUT    | `/solicitacoes/:id`          | Atualizar solicitação           |
| DELETE | `/solicitacoes/:id`          | Excluir solicitação             |
| PATCH  | `/solicitacoes/:id/aceitar`  | Aceitar solicitação             |
| PATCH  | `/solicitacoes/:id/concluir` | Concluir solicitação            |

## Status das solicitações

 PENDENTE — aguardando cuidador.
 ACEITA — cuidador aceitou.
 CONCLUIDA — visita realizada.
 CANCELADA — solicitação cancelada.

## Códigos HTTP

200 = sucesso  
201 = criado  
204 = excluído  
400 = dados inválidos  
404 = não encontrado  
409 = conflito  
500 = erro interno
