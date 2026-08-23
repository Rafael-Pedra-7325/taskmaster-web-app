# 📌 TaskMaster — Sistema Web de Gestão de Tarefas

> Aplicação Full Stack moderna e responsiva para gerenciamento dinâmico de tarefas e projetos com persistência de dados.

---

## 💻 Sobre o Projeto

O **TaskMaster** é um sistema web desenvolvido para simplificar a organização diária de tarefas. A aplicação permite criar, visualizar, atualizar e remover tarefas (CRUD) de forma intuitiva, contando com uma interface responsiva e consumo assíncrono de API.

Este projeto foi construído para demonstrar a integração completa entre um front-end dinâmico em JavaScript puro e um back-end robusto em Python utilizando o framework **FastAPI**.

---

## ✨ Funcionalidades

- **Gerenciamento Completo de Tarefas (CRUD):**
  - **Create:** Cadastro de tarefas com título, descrição, nível de prioridade e status.
  - **Read:** Listagem e exibição em tempo real das tarefas cadastradas.
  - **Update:** Atualização dinâmica do estado das tarefas.
  - **Delete:** Remoção de tarefas com confirmação de segurança.
- **Interface Responsiva:** Adaptável para dispositivos móveis, tablets e desktops (CSS Grid / Flexbox).
- **Persistência de Dados:** Integração com banco de dados SQLite via SQLAlchemy.
- **Arquitetura RESTful:** Comunicação assíncrona entre cliente e servidor via `Fetch API`.

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
- **HTML5:** Estruturação semântica.
- **CSS3:** Layout responsivo, variáveis CSS e componentes visuais.
- **JavaScript (ES6+):** Manipulação da DOM e chamadas assíncronas (`async/await`, `fetch`).

### **Back-end**
- **Python 3:** Linguagem base do servidor.
- **FastAPI:** Framework moderno e de alta performance para criação de APIs REST.
- **SQLAlchemy:** ORM para abstração e manipulação do banco de dados.
- **Pydantic:** Validação e tipagem de dados.
- **SQLite:** Banco de dados relacional leve para persistência local.
- **Uvicorn:** Servidor ASGI para execução da aplicação.

---

## 📂 Estrutura do Repositório

```text
├── backend/
│   ├── database.py   # Conexão e sessão do banco de dados (SQLite)
│   ├── models.py     # Definição do modelo de dados (ORM)
│   ├── schemas.py    # Esquemas de validação Pydantic
│   └── main.py       # Configuração do FastAPI e rotas da API REST
└── frontend/
    ├── index.html    # Estrutura e marcação das telas
    ├── style.css     # Estilização e suporte à responsividade
    └── app.js        # Lógica da aplicação e integração com o back-end
