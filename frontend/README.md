# Frontend - La Dolce Vita

Interface React moderna para a plataforma de e-commerce La Dolce Vita.

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

### 3. Rodar desenvolvimento
```bash
npm start
# ou
yarn start
```

Abre automaticamente em: `http://localhost:3000`

## 📁 Estrutura

```
src/
├── App.js                    # Componente raiz
├── index.js                  # Entry point
├── components/               # Componentes reutilizáveis
│   ├── vitrine/             # Componentes da loja
│   │   ├── ProductCard.jsx
│   │   ├── CartSidebar.jsx
│   │   ├── EditProductModal.jsx
│   │   └── VitrineNavbar.jsx
│   ├── CardPedidoAdmin.jsx
│   ├── LoginRequiredModal.jsx
│   └── Icons.jsx
├── pages/                    # Páginas principais
│   ├── LoginPage.jsx
│   ├── RegisterStep1Page.jsx
│   ├── VitrinePage.jsx
│   ├── CheckoutPage.jsx
│   ├── AdminVitrine.jsx
│   └── ... (outras páginas)
├── context/                  # Contexto React
│   └── CartContext.jsx       # Gerenciamento do carrinho
├── services/
│   └── api.js               # Cliente HTTP
├── data/
│   └── products.js
└── styles/                  # Estilos globais
    ├── globals.css
    ├── vitrine.css
    ├── profile.css
    ├── home.css
    └── admin.css
```

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm start
```
Roda em modo desenvolvimento. Abre [http://localhost:3000](http://localhost:3000)

### Build para produção
```bash
npm run build
```
Cria pasta `build` otimizada para produção.

### ESLint
```bash
npm run lint
```
Verifica problemas de código.

## 🎨 Páginas Principais

| Página | Rota | Descrição |
|--------|------|-----------|
| Login | `/login` | Autenticação de usuário |
| Registro | `/register` | Criação de conta |
| Vitrine | `/vitrine` | Catálogo de produtos |
| Carrinho | `/checkout` | Finalização de compra |
| Perfil | `/profile` | Dados do usuário |
| Histórico | `/historico` | Pedidos anteriores |
| Admin | `/admin/vitrine` | Gerenciamento de produtos |

## 🔧 Dependências Principais

- **React** - UI framework
- **React Router DOM** - Roteamento
- **React Scripts** - Build tools
- **CSS Modules** - Estilos isolados

## 🛒 Contexto do Carrinho (Cart Context)

O carrinho é gerenciado globalmente via Context API em `CartContext.jsx`:

```javascript
// Usar em qualquer componente
const { cart, addToCart, removeFromCart } = useContext(CartContext);
```

## 🔐 Autenticação

Os tokens JWT são armazenados em `localStorage`:
```javascript
localStorage.setItem('authToken', token);
localStorage.getItem('authToken');
```

## 🌐 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `REACT_APP_API_URL` | URL base da API |
| `REACT_APP_ENV` | Ambiente (development/production) |

## 📱 Responsividade

O projeto usa CSS Modules para estilos isolados. Cada página/componente tem seu próprio arquivo `.module.css`.

## 🚀 Deploy

### Para Vercel
```bash
npm install -g vercel
vercel
```

### Para Netlify
```bash
npm run build
# Deploy a pasta 'build' no Netlify
```

## 🧪 Testes

```bash
npm test
```

Roda testes com Jest e React Testing Library.

## 🐛 Troubleshooting

**Porta 3000 já em uso?**
```bash
npm start  # Vai pedir para usar outra porta
```

**Erro "API não encontrada"?**
- Verifique se backend está rodando em `http://localhost:8000`
- Confirme variável `REACT_APP_API_URL` em `.env`

**Dependências desatualizadas?**
```bash
npm update
npm audit fix
```

## 📊 Performance

- Code splitting automático com React Router
- CSS Modules para evitar conflitos
- Lazy loading de imagens

## 🎯 Melhorias Planejadas

- [ ] Testes automatizados
- [ ] Dark mode
- [ ] Paginação de produtos
- [ ] Filtros avançados
- [ ] PWA (Progressive Web App)

---

Para mais informações, veja o [README principal](../README.md)
