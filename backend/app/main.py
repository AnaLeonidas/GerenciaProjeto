from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, produtos, pedidos

app = FastAPI(
    title="La Dolce Vita API",
    description=(
        "Backend da plataforma de cookies artesanais La Dolce Vita.\n\n"
        "**Autenticação:** todas as rotas protegidas exigem o header\n"
        "`Authorization: Bearer <access_token>` retornado pelo `/auth/login`."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/auth",     tags=["Autenticação"])
app.include_router(produtos.router, prefix="/produtos",  tags=["Produtos"])
app.include_router(pedidos.router,  prefix="/pedidos",   tags=["Pedidos"])


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "app": "La Dolce Vita API", "version": "1.0.0"}
