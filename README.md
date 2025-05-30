### API de Gerenciamento de Tarefas

Este projeto implementa uma API HTTP simples para gerenciamento de tarefas, construída com Node.js. Ela oferece suporte à criação, listagem, atualização, remoção e marcação de tarefas como concluídas, além de importação em massa por meio de arquivo CSV utilizando streams.

---

## Índice

* [Funcionalidades](#funcionalidades)
* [Requisitos](#requisitos)
* [Instalação](#instalação)
* [Executando o Servidor](#executando-o-servidor)
* [Endpoints da API](#endpoints-da-api)

  * [GET /tasks](#get-tasks)
  * [POST /tasks](#post-tasks)
  * [PUT /tasks/\:id](#put-tasksid)
  * [PATCH /tasks/\:id/complete](#patch-tasksidcomplete)
  * [DELETE /tasks/\:id](#delete-tasksid)
  * [POST /tasks/files/upload-csv](#post-tasksfilesupload-csv)
* [Formato do CSV](#formato-do-csv)
* [Validação e Tratamento de Erros](#validação-e-tratamento-de-erros)
* [Sugestões / Próximos Passos](#sugestões--próximos-passos)

---

## Funcionalidades

* **Operações CRUD** para tarefas:

  * Criar, listar, atualizar, excluir tarefas
  * Marcar tarefas como concluídas/não concluídas
* **Importação em massa** de tarefas via CSV com upload por HTTP usando stream
* Modelo de dados inclui timestamps de criação, atualização e conclusão

---

## Requisitos

* Node.js 18+ (ou compatível)
* npm ou yarn

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositório>
   cd <pasta-do-projeto>
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

---

## Executando o Servidor

Inicie o servidor HTTP:

```bash
npm start
# ou
yarn start
```

Por padrão, o servidor escuta na porta **3000**. Você pode alterar isso definindo a variável de ambiente `PORT`.

---

## Endpoints da API

Todos os endpoints utilizam `application/json` para os corpos das requisições e respostas, exceto onde indicado.

### GET /tasks

Lista todas as tarefas. É possível filtrar por `title` e/ou `description` via parâmetros de query.

**Exemplo de requisição**

```http
GET /tasks?title=relatorio&description=mensal HTTP/1.1
Host: localhost:3000
```

**Resposta**

* `200 OK` com array JSON das tarefas.

### POST /tasks

Cria uma nova tarefa.

**Exemplo de requisição**

```http
POST /tasks HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Comprar mantimentos",
  "description": "Leite, ovos, pão"
}
```

**Resposta**

* `201 Created` com a tarefa criada contendo `id`, `created_at`, `updated_at` e `completed_at: null`.

### PUT /tasks/\:id

Atualiza o `title` e/ou `description` de uma tarefa pelo `id`.

**Exemplo de requisição**

```http
PUT /tasks/123e4567 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Comprar itens do mercado"
}
```

**Resposta**

* `200 OK` com a tarefa atualizada
* `404 Not Found` se o `id` não existir

### PATCH /tasks/\:id/complete

Alterna o status de conclusão de uma tarefa. Se estiver incompleta, será marcada como concluída e `completed_at` será definido; se já concluída, será revertida para normal.

**Exemplo de requisição**

```http
PATCH /tasks/123e4567/complete HTTP/1.1
Host: localhost:3000
```

**Resposta**

* `200 OK` com a tarefa atualizada
* `404 Not Found` se o `id` não existir

### DELETE /tasks/\:id

Remove uma tarefa pelo `id`.

**Exemplo de requisição**

```http
DELETE /tasks/123e4567 HTTP/1.1
Host: localhost:3000
```

**Resposta**

* `204 No Content` em caso de sucesso
* `404 Not Found` se o `id` não existir

### POST /tasks/files/upload-csv

Importa tarefas em massa a partir de um arquivo CSV. Envie o arquivo como `multipart/form-data` com o campo `file`.

**Exemplo usando curl**

```bash
curl -X POST http://localhost:3000/tasks/files/upload-csv \
  -F "file=@tasks.csv"
```

**Resposta**

* `201 Created` com um resumo das tarefas importadas
* `400 Bad Request` se o CSV estiver inválido ou ausente

---

## Formato do CSV

O arquivo CSV deve conter uma linha de cabeçalho com as seguintes colunas (ordem não importa):

```csv
title,description
Escrever relatório,Finalizar relatório trimestral
Planejar reunião,Agendar sessão de planejamento da equipe
```

* **title**: Título da tarefa (string)
* **description**: Descrição da tarefa (string)

As tarefas serão lidas com stream e salvas uma a uma.

---

## Validação e Tratamento de Erros

* As rotas **POST /tasks** e **PUT /tasks/\:id** exigem os campos `title` e `description` no corpo da requisição.
* Requisições com campos obrigatórios ausentes retornam `400 Bad Request` com mensagem de erro.
* Operações com `id` inexistente retornam `404 Not Found` com mensagem descritiva.

---

## Sugestões / Próximos Passos

* Adicionar middleware de validação de requisições (ex: `zod`, `Joi`)
* Implementar persistência em banco de dados (ex: SQLite, PostgreSQL)
* Adicionar autenticação e autorização (JWT, OAuth)
* Expandir importação via CSV para suportar mais campos e relatórios de erro

---

la flame 🔥🔥🔥
