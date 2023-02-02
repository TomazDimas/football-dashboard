# Boas vindas ao repositório do FootBall Dashboard :soccer:! 
Projeto criado por Tomaz Dimas durante o curso de Desenvolvimento Web da Trybe.

# Descrição

O FootBall Dashboard é um site informativo sobre partidas e classificações de futebol, onde por meio de um CRUD em uma API é possível registar, ler, atualizar e deletar jogos, onde posteriormente são analisados e inseridos em um ranking de times!

Esse projeto foi contruido um back-end dockerizado utilizando modelagem de dados através do Sequelize.
  ![Exemplo app front](assets/football-dashboard-image.png)

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Onde toda API vai funcionar.

3️⃣ **Front-end:**
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - A interface do site.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;

</details>

# Instalação e Inicialização

Por se tratar de um projeto desenvolvido em containers, é necessário o Docker para fazer a instalação e inicialização do projeto.

- O projeto contêm um arquivo `docker-compose.yml` que é utilizado pelo avaliador para realizar o _build_ da aplicação.
- O arquivo `docker-compose.yml` é utilizado para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` na raiz do projeto.
