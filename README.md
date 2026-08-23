# 📌 TaskMaster — Sistema Web de Gestão de Tarefas

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

> Aplicação Full Stack moderna e responsiva para gerenciamento dinâmico de tarefas e projetos com arquitetura RESTful e persistência de dados.

---

## 💻 Sobre o Projeto

O **TaskMaster** é uma plataforma web desenvolvida para simplificar a organização diária de tarefas e projetos. A aplicação oferece uma interface limpa e intuitiva baseada no modelo Kanban, permitindo criar, listar, atualizar status/prioridade e remover tarefas em tempo real.

O objetivo do projeto é demonstrar a integração completa entre um front-end dinâmico construído em JavaScript Puro (ES6+) e uma API RESTful de alta performance desenvolvida em Python (**FastAPI**) com ORM (**SQLAlchemy**) e banco de dados relacional.

---

## ✨ Funcionalidades

- **CRUD Completo de Tarefas:**
  - ➕ **Create:** Cadastro de tarefas com título, descrição detalhada, nível de prioridade e estado inicial.
  - 📋 **Read:** Listagem e re-renderização assíncrona dos cards sem recarregar a página.
  - 🔄 **Update:** Alteração dinâmica de status e propriedades da tarefa na API.
  - 🗑️ **Delete:** Remoção definitiva de tarefas com confirmação de segurança.
- **Interface 100% Responsiva:** Adaptável para telas móbiles, tablets e desktops via CSS Grid e Flexbox.
- **Design Baseado em Prioridades:** Cores e bordas indicativas para rápida identificação visual do nível de urgência.
- **Persistência de Dados Relacional:** Integração transparente com SQLite via SQLAlchemy.
- **Consumo Assíncrono:** Comunicação client-server otimizada utilizando a `Fetch API` e requisições HTTP (`GET`, `POST`, `PUT`, `DELETE`).

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
- **HTML5:** Marcação semântica e acessível.
- **CSS3:** Design responsivo, variáveis globais CSS e layout moderno.
- **JavaScript (ES6+):** Manipulação dinâmica da DOM e requisições assíncronas (`async/await`).

### **Back-end**
- **Python 3:** Linguagem base do servidor.
- **FastAPI:** Framework moderno e performático para APIs RESTful.
- **SQLAlchemy:** ORM para mapeamento objeto-relacional do SQLite.
- **Pydantic:** Validação, serialização e tipagem estrita de dados.
- **SQLite:** Banco de dados relacional leve e embutido.
- **Uvicorn:** Servidor ASGI para altíssima velocidade de resposta.

---

## 📂 Estrutura do Repositório

```text
taskmaster/
├── backend/
│   ├── database.py   # Configuração e conexão do banco de dados (SQLite)
│   ├── models.py     # Mapeamento de tabelas com SQLAlchemy
│   ├── schemas.py    # Esquemas de validação Pydantic para entrada/saída
│   └── main.py       # Configuração das rotas RESTful e CORS no FastAPI
└── frontend/
    ├── index.html    # Estrutura e marcação da interface
    ├── style.css     # Estilização responsiva e componentes visuais
    └── app.js        # Regras de negócio do front-end e consumo da API
```

---

## 🚀 Como Executar o Projeto

```bash
# ==============================================================================
# 1. CLONAR O REPOSITÓRIO
# ==============================================================================
git clone [https://github.com/Rafael-Pedra-7325/taskmaster-web-app.git](https://github.com/Rafael-Pedra-7325/taskmaster-web-app.git)
cd taskmaster-web-app


# ==============================================================================
# 2. CONFIGURAR E EXECUTAR O BACK-END (API REST)
# ==============================================================================
cd backend

# Criar o ambiente virtual Python
python -m venv .venv

# Ativar o ambiente virtual
# No Windows:
.venv\Scripts\activate
# No Linux/macOS:
source .venv/bin/activate

# Instalar dependências do projeto
pip install fastapi uvicorn sqlalchemy pydantic

# Iniciar o servidor de desenvolvimento
uvicorn main:app --reload

# ------------------------------------------------------------------------------
# 📍 A API estará rodando em: http://localhost:8000
# 📄 Documentação Swagger UI em: http://localhost:8000/docs
# ------------------------------------------------------------------------------


# ==============================================================================
# 3. EXECUTAR O FRONT-END
# ==============================================================================
# IMPORTANTE: Mantenha o terminal do back-end rodando em segundo plano.
# Em uma nova janela do terminal ou diretamente pelo seu sistema:

# Opção A: Abra o arquivo 'frontend/index.html' diretamente no navegador.
# Opção B: No VS Code, clique com o botão direito em 'index.html' -> "Open with Live Server".
```
