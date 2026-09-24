# Fluxo do Sistema

## Cliente

```text
Cadastrar cliente
      |
Cadastrar gato
      |
Criar solicitação
      |
Acompanhar solicitação
```

## Cuidador

```text
Cadastrar cuidador
      |
Visualizar solicitações disponíveis
      |
Escolher uma solicitação
      |
Aceitar solicitação
      |
Realizar visita
      |
Concluir solicitação
```

## Fluxo da solicitação

```text
PENDENTE
   |
ACEITA
   |
CONCLUIDA
```

Uma solicitação pendente fica disponível para os cuidadores. Quando um cuidador aceita, ela deixa de estar disponível para os demais.
