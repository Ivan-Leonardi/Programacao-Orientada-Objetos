# API de Usuários com POO e Clean Architecture

API REST desenvolvida em **TypeScript** e **Express** para praticar os fundamentos de **Programação Orientada a Objetos (POO)** e os conceitos iniciais de **Clean Architecture**.

O projeto implementa um CRUD de usuários e separa as responsabilidades entre domínio, casos de uso e infraestrutura. A persistência é feita em memória, permitindo estudar a arquitetura sem depender de um banco de dados.

## Objetivos do projeto

- Aplicar encapsulamento, classes, interfaces e injeção de dependência.
- Separar regras de negócio de detalhes externos, como HTTP e persistência.
- Utilizar DTOs para transportar dados entre as camadas.
- Implementar casos de uso independentes para cada operação.
- Criar uma API REST com operações de cadastro, consulta, atualização e remoção.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [tsx](https://tsx.is/) para execução e recarregamento em desenvolvimento

## Arquitetura

A organização do projeto foi inspirada nos princípios da Clean Architecture:

```text
src/
├── application/
│   ├── dtos/
│   │   ├── CreateUserDTO.ts
│   │   └── UpdateUserDTO.ts
│   └── use-cases/
│       ├── CreateUser.ts
│       ├── DeleteUser.ts
│       ├── FindUserById.ts
│       ├── GetAllUsers.ts
│       └── UpdateUser.ts
├── domain/
│   ├── entity/
│   │   └── User.ts
│   └── repository/
│       └── IUserRepository.ts
├── infra/
│   ├── controllers/
│   │   └── UserController.ts
│   ├── repository/
│   │   └── UserRepositoryInMemory.ts
│   └── routes/
│       └── userRoutes.ts
└── index.ts
```

### Responsabilidade das camadas

| Camada | Responsabilidade |
| --- | --- |
| `domain` | Contém a entidade `User` e o contrato do repositório. Não depende do Express. |
| `application` | Contém os DTOs e os casos de uso responsáveis pelas regras de cada operação. |
| `infra` | Implementa os detalhes externos, como rotas HTTP, controller e repositório em memória. |
| `index.ts` | Configura o Express, registra as rotas e inicializa o servidor. |

O contrato `IUserRepository` permite substituir a implementação em memória por PostgreSQL, MySQL, MongoDB ou outra tecnologia sem alterar os casos de uso.

## Como executar

### Pré-requisitos

- Node.js instalado
- npm instalado

### Instalação

```bash
git clone https://github.com/Ivan-Leonardi/concepts-poo.git
cd concepts-poo
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

URL base da API:

```text
http://localhost:3000/api/users
```

## Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/api/users` | Cria um usuário |
| `GET` | `/api/users` | Lista todos os usuários |
| `GET` | `/api/users/:id` | Busca um usuário pelo ID |
| `PUT` | `/api/users/:id` | Atualiza nome e e-mail de um usuário |
| `DELETE` | `/api/users/:id` | Remove um usuário |

## Exemplos de uso

Os exemplos abaixo utilizam `curl`, mas as requisições também podem ser realizadas pelo Postman, Insomnia ou outra ferramenta HTTP.

### Criar usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@email.com",
    "password": "123456"
  }'
```

Resposta com status `201 Created`:

```json
{
  "message": "Creating a new user",
  "data": {
    "_id": "uuid-gerado-automaticamente",
    "_name": "Maria Silva",
    "_email": "maria@email.com",
    "_password": "123456"
  }
}
```

### Listar usuários

```bash
curl http://localhost:3000/api/users
```

Resposta com status `200 OK`:

```json
{
  "message": "Fetching all users",
  "data": [
    {
      "_id": "uuid-do-usuario",
      "_name": "Maria Silva",
      "_email": "maria@email.com",
      "_password": "123456"
    }
  ]
}
```

### Buscar usuário por ID

```bash
curl http://localhost:3000/api/users/UUID_DO_USUARIO
```

### Atualizar usuário

```bash
curl -X PUT http://localhost:3000/api/users/UUID_DO_USUARIO \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Oliveira",
    "email": "maria.oliveira@email.com"
  }'
```

A senha atual é preservada durante a atualização. A resposta contém `data: true` quando a operação é concluída.

### Remover usuário

```bash
curl -X DELETE http://localhost:3000/api/users/UUID_DO_USUARIO
```

A resposta contém `data: true` quando o usuário é removido e `data: false` quando o ID não existe.

## Fluxo de uma requisição

Uma requisição percorre o projeto da seguinte forma:

```text
Rota HTTP → Controller → Caso de uso → Interface do repositório
                                      ↓
                            Repositório em memória
```

Por exemplo, ao criar um usuário:

1. A rota `POST /api/users` recebe a requisição.
2. O `UserController` transforma o corpo da requisição em um `CreateUserDTO`.
3. O caso de uso `CreateUser` cria a entidade e gera um UUID.
4. O usuário é armazenado pelo `UserRepositoryInMemory`.
5. O controller devolve a resposta HTTP.

## Regras e comportamento atual

- Nome, e-mail e senha são obrigatórios na criação.
- O ID do usuário é gerado com `randomUUID()`.
- A atualização permite alterar nome e e-mail.
- Os dados ficam armazenados somente enquanto a aplicação está em execução.
- Ao reiniciar o servidor, todos os usuários cadastrados são removidos.

## Limitações e próximos passos

Este é um projeto de estudo e ainda não possui os recursos necessários para uso em produção. Possíveis evoluções:

- Adicionar tratamento global de erros e respostas HTTP padronizadas.
- Validar formato de e-mail, tamanho dos campos e dados de entrada.
- Impedir o cadastro de e-mails duplicados.
- Armazenar senhas com hash e nunca retorná-las nas respostas.
- Adicionar um banco de dados e uma implementação persistente do repositório.
- Criar testes unitários para entidades e casos de uso.
- Criar testes de integração para os endpoints.
- Adicionar variáveis de ambiente e configuração de porta.
- Documentar a API com OpenAPI/Swagger.
- Implementar autenticação e autorização.

## Conceitos praticados

- Programação Orientada a Objetos
- Encapsulamento
- Interfaces e contratos
- Inversão e injeção de dependência
- Repository Pattern
- DTO (Data Transfer Object)
- Casos de uso
- Separação de responsabilidades
- API REST

## Autor

Desenvolvido por [Ivan Leonardi](https://github.com/Ivan-Leonardi) como projeto de estudo e consolidação de conhecimentos em POO, TypeScript e arquitetura de software.

## Licença

Este projeto utiliza a licença ISC.
