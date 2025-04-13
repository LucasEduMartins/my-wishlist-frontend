# Projeto Minhas Listas de Desejos (Frontend)

Este é um projeto desenvolvido com React e TypeScript, que permite a criação e gerenciamento de listas de desejos. Ele consome uma API backend para armazenar e recuperar dados de listas e produtos.

Projeto criado como MVP da sprint: Arquitetura de Software da pós-graduação em Engenharia de Software da PUC-Rio.

## 🚀 Funcionalidades

- **Gerenciamento de Listas de Desejos**: Crie, edite e remova listas de desejos.
- **Produtos**: Adicione ou remova produtos de uma lista de desejos.
- **Integração com API**: Consome dados de uma API backend para persistência.

Para esse projeto, fiz a utilização de uma API externa chamada [FakeStore](https://fakestoreapi.com/).

FakeStore é uma REST API grátis para utilização de informações de uma loja virtual, nesse caso em especifico, a [API de produtos](https://fakestoreapi.com/docs#tag/Products) foi utilizada para compor parte das funcionalidades desse projeto.

Rotas utilizadas:

- **Listar todos os produtos**: https://fakestoreapi.com/products

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Bootstrap**: Framework CSS para estilização.
- **Axios**: Biblioteca para requisições HTTP.
- **Vite**: Ferramenta de build para desenvolvimento rápido.

## 🗺️ Arquitetura do Projeto

Abaixo está um fluxograma representando a arquitetura do projeto, incluindo a interação entre o frontend, backend e o banco de dados:

![Arquitetura do Projeto](assets/archtecture_flow.png)

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior) instalado na máquina.
- **npm** (instalado junto com o Node.js) ou **yarn** para gerenciar pacotes.
- **Docker** e **Docker Compose** (opcional, caso deseje rodar o projeto com Docker).

### Passos

1. Faça o download ou clone este repositório:

   ```bash
   git clone https://github.com/LucasEduMartins/my-wishlist-frontend.git
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

   ou caso use yarn:

   ```bash
   yarn install
   ```

3. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

   ou caso use yarn:

   ```bash
   yarn dev
   ```

4. Acesse a aplicação no navegador em [http://localhost:5173](http://localhost:5173).

## 📦 Como Rodar com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Execute o comando abaixo para iniciar o container:

   ```bash
   docker-compose up
   ```

3. Acesse a aplicação no navegador em [http://localhost:5173](http://localhost:5173).

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](../LICENSE) para mais informações.
