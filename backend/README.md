# Backend - La Dolce Vita

API REST desenvolvida com FastAPI para gerenciar produtos, pedidos e autenticação.

## 🚀 Quick Start

### 1. Configurar ambiente virtual
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env`:
```env
SUPABASE_URL=sua_url
SUPABASE_KEY=sua_chave
DEBUG=True
```

### 4. Rodar servidor
```bash
uvicorn app.main:app --reload
```

Acesse: `http://localhost:8000/docs`

## 📁 Estrutura

```
app/
├── main.py          # Aplicação FastAPI
├── config.py        # Configurações
├── dependencies.py  # Dependências (JWT, etc)
├── models/
│   └── schemas.py   # Pydantic schemas
├── routes/
│   ├── auth.py      # Autenticação
│   ├── pedidos.py   # Pedidos
│   └── produtos.py  # Produtos
└── services/
    ├── supabase.py  # Cliente BD
    ├── pedidos.py   # Lógica
    └── notificacoes.py
```

## 🔗 Endpoints Principais

### Auth
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Reset senha

### Produtos
- `GET /api/produtos` - Listar
- `POST /api/produtos` - Criar (admin)
- `PUT /api/produtos/{id}` - Atualizar
- `DELETE /api/produtos/{id}` - Deletar

### Pedidos
- `GET /api/pedidos` - Listar
- `POST /api/pedidos` - Criar
- `GET /api/pedidos/{id}` - Detalhes

## 📦 Dependências

- **FastAPI** - Framework web
- **Uvicorn** - ASGI server
- **Supabase** - Database & Auth
- **Pydantic** - Validação de dados
- **python-dotenv** - Variáveis de ambiente
- **httpx** - HTTP client

Veja `requirements.txt` para versões completas.

## 🧪 Testes

```bash
pip install pytest
pytest
```

## 📖 Documentação

A documentação interativa está em `/docs` (Swagger UI) quando o servidor está rodando.

## 🔐 Autenticação

Usa JWT tokens fornecidos pelo Supabase. O token deve ser enviado no header:
```
Authorization: Bearer <seu_token>
```

## 🆘 Troubleshooting

**Erro de conexão com Supabase?**
- Verifique variáveis de ambiente em `.env`
- Confirme URL e chave do Supabase

**Porta 8000 já em uso?**
```bash
uvicorn app.main:app --reload --port 8001
```

---

Para mais informações, veja o [README principal](../README.md)
