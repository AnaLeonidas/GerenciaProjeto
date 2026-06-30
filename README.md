# La Dolce Vita - Goodies

<div align="center">

**Uma plataforma completa de e-commerce para gerenciamento de produtos e pedidos**

[Features](#features) • [Tech Stack](#tech-stack) • [Instalação](#instalação) • [Uso](#uso) • [API](#api) • [Estrutura](#estrutura-do-projeto)

</div>

---

## 📋 Descrição

La Dolce Vita é uma aplicação full-stack moderna para gerenciamento de uma loja online de goodies. O projeto foi desenvolvido com foco em:

- ✅ **Experiência do Usuário**: Interface intuitiva e responsiva
- ✅ **Segurança**: Autenticação e autorização robustas
- ✅ **Escalabilidade**: Arquitetura modular e bem estruturada
- ✅ **Performance**: Otimizações de carregamento e processamento

---

## ✨ Features

### Para Clientes
- 🛍️ **Vitrine de Produtos**: Visualização completa do catálogo
- 🛒 **Carrinho de Compras**: Gerenciamento intuitivo de itens
- 📦 **Histórico de Pedidos**: Acompanhamento de compras anteriores
- 👤 **Perfil de Usuário**: Gerenciamento de dados pessoais
- 🔐 **Autenticação Segura**: Login, registro e recuperação de senha

### Para Administradores
- 📊 **Painel de Gerenciamento**: Dashboard completo
- ➕ **CRUD de Produtos**: Adicionar, editar e remover produtos
- 📋 **Gerenciamento de Pedidos**: Visualizar e atualizar status
- 🔔 **Notificações**: Sistema de alertas para eventos importantes
- 👥 **Gerenciamento de Usuários**: Controle de acesso e permissões

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.111.0
- **Server**: Uvicorn
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT (via Supabase)
- **Validation**: Pydantic v2
- **Language**: Python 3.8+

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **HTTP Client**: Axios (via serviços)

### DevOps
- **Version Control**: Git
- **Code Quality**: ESLint

---

## 📦 Requisitos

### Backend
- Python 3.8 ou superior
- pip ou conda

### Frontend
- Node.js 16+ 
- npm ou yarn

---

## 🚀 Instalação

### 1️⃣ Backend

#### Clone o repositório
```bash
git clone <repository-url>
cd GerenciaProjeto/backend
```

#### Crie um ambiente virtual
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

#### Instale as dependências
```bash
pip install -r requirements.txt
```

#### Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `backend/`:
```env
# Supabase
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_chave_supabase

# FastAPI
DEBUG=True
```

### 2️⃣ Frontend

#### Navegue até a pasta frontend
```bash
cd GerenciaProjeto/frontend
```

#### Instale as dependências
```bash
npm install
# ou
yarn install
```

#### Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `frontend/`:
```env
REACT_APP_API_URL=http://localhost:8000
```

---

## ⚙️ Configuração

### Backend - Variables de Ambiente

```env
# Database
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anonima

# JWT
JWT_SECRET_KEY=sua-chave-secreta-jwt
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Email (para notificações)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app

# API
API_PORT=8000
DEBUG=True
```

### Frontend - Variables de Ambiente

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

---

## 🎯 Uso

### Rodando o Backend

```bash
cd backend
source venv/bin/activate  # ou venv\Scripts\activate no Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

O backend estará disponível em: `http://localhost:8000`

**Documentação Interativa**: `http://localhost:8000/docs`

### Rodando o Frontend

```bash
cd frontend
npm start
# ou
yarn start
```

O frontend estará disponível em: `http://localhost:3000`

### Rodando Ambos Simultaneamente

Abra dois terminais e execute os comandos acima em paralelo.

---

## 📡 API

### Endpoints Principais

#### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/logout` - Fazer logout
- `POST /api/auth/forgot-password` - Solicitar reset de senha
- `POST /api/auth/reset-password` - Resetar senha

#### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/{id}` - Detalhes de um produto
- `POST /api/produtos` - Criar produto (Admin)
- `PUT /api/produtos/{id}` - Atualizar produto (Admin)
- `DELETE /api/produtos/{id}` - Deletar produto (Admin)

#### Pedidos
- `GET /api/pedidos` - Listar pedidos do usuário
- `POST /api/pedidos` - Criar novo pedido
- `GET /api/pedidos/{id}` - Detalhes do pedido
- `PUT /api/pedidos/{id}` - Atualizar status do pedido (Admin)

#### Usuários
- `GET /api/usuarios/perfil` - Obter perfil do usuário
- `PUT /api/usuarios/perfil` - Atualizar perfil
- `GET /api/usuarios/{id}` - Detalhes do usuário (Admin)

Para documentação completa da API, acesse `/docs` quando o servidor estiver rodando.

---

## 📁 Estrutura do Projeto

```
GerenciaProjeto/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # Aplicação principal FastAPI
│   │   ├── config.py            # Configurações
│   │   ├── dependencies.py      # Dependências injetadas
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py       # Pydantic schemas
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # Endpoints de autenticação
│   │   │   ├── pedidos.py       # Endpoints de pedidos
│   │   │   └── produtos.py      # Endpoints de produtos
│   │   │
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── supabase.py      # Cliente Supabase
│   │       ├── pedidos.py       # Lógica de pedidos
│   │       └── notificacoes.py  # Sistema de notificações
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── App.js               # Componente raiz
│   │   ├── index.js             # Entry point
│   │   │
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── CardPedidoAdmin.jsx
│   │   │   ├── LoginRequiredModal.jsx
│   │   │   ├── OrderHistoryCard.jsx
│   │   │   ├── HistoricoHeader.jsx
│   │   │   ├── HistoricoFooter.jsx
│   │   │   ├── Icons.jsx
│   │   │   │
│   │   │   └── vitrine/        # Componentes da vitrine
│   │   │       ├── ProductCard.jsx
│   │   │       ├── AdminProductCard.jsx
│   │   │       ├── CartSidebar.jsx
│   │   │       ├── EditProductModal.jsx
│   │   │       ├── AddProductCard.jsx
│   │   │       └── VitrineNavbar.jsx
│   │   │
│   │   ├── context/            # Contexto React
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterStep1Page.jsx
│   │   │   ├── RegisterStep2Page.jsx
│   │   │   ├── VerifyEmailPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── NewPasswordPage.jsx
│   │   │   ├── PasswordUpdatedPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── VitrinePage.jsx
│   │   │   ├── ClientVitrine.jsx
│   │   │   ├── AdminVitrine.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── UserProfilePage.jsx
│   │   │   ├── AdminProfilePage.jsx
│   │   │   ├── EditProfilePage.jsx
│   │   │   ├── HistoricoUsuario.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── GerenciamentoAdmin.jsx
│   │   │   └── WelcomePage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js          # Cliente HTTP / Chamadas à API
│   │   │
│   │   ├── data/
│   │   │   └── products.js
│   │   │
│   │   └── styles/             # Estilos globais
│   │       ├── globals.css
│   │       ├── home.css
│   │       ├── vitrine.css
│   │       ├── profile.css
│   │       └── admin.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
└── README.md (este arquivo)
```

---

## 🔐 Autenticação e Autorização

### JWT Tokens
- **Access Token**: Válido por 24 horas
- **Refresh Token**: Armazenado no localStorage
- **Renovação Automática**: Token renovado quando próximo ao vencimento

### Roles (Papéis)
- `user`: Cliente normal
- `admin`: Administrador do sistema

---

## 🧪 Testes

### Backend
```bash
cd backend
# Instalar pytest
pip install pytest

# Rodar testes
pytest
```

### Frontend
```bash
cd frontend
# Rodar testes
npm test
```

---

## 📚 Documentação

- **Backend**: Acesse `/docs` quando o servidor estiver rodando (Swagger UI)
- **Frontend**: Verificar comentários nos componentes e páginas

---

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

---

## 👥 Autores

Desenvolvido pela equipe do projeto **GerenciaProjeto** - UFPI

---

## 📞 Suporte

Para questões, bugs ou sugestões, abra uma issue no repositório ou entre em contato.

---

## 🗺️ Roadmap

- [ ] Integração com sistemas de pagamento
- [ ] Dashboard com gráficos de vendas
- [ ] Sistema de cupons e descontos
- [ ] Integração com WhatsApp Bot
- [ ] Sistema de avaliações de produtos
- [ ] Relatórios em PDF
- [ ] Testes automatizados (Backend & Frontend)

---

**Última atualização**: 30/06/2026

---

<div align="center">

</div>
