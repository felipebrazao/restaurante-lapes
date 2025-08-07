# API Restaurante - Spring Boot

Esta é uma API RESTful desenvolvida com **Java** e **Spring Boot** para gerenciar as operações de um restaurante. O sistema permite o cadastro e gerenciamento de **produtos**, **categorias**, **pedidos** e **itens de pedido**.

## Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database (ambiente de desenvolvimento)
- Lombok

## Funcionalidades

- **CRUD de Categorias** (`/categorias`)
- **CRUD de Produtos** (`/produtos`)
- **CRUD de Pedidos** (`/pedidos`)
- **Adição de Itens em Pedidos** (`/itens-pedido`)
- Relacionamentos entre entidades (ex: produtos pertencem a categorias)
- https://app.swaggerhub.com/templates/cesupa-04b/lapes/1.0(Swagger para a documentaçao da API)

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

   POST /categorias
Content-Type: application/json

{
  "nome": "Bebidas"
}




   
