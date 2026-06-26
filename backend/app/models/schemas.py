from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class CadastroSchema(BaseModel):
    nome: str
    email: EmailStr
    senha: str = Field(min_length=6)
    contato: Optional[str] = None


class LoginSchema(BaseModel):
    email: EmailStr
    senha: str


class UsuarioResponse(BaseModel):
    id: str
    nome: str
    email: str
    papel: str
    contato: Optional[str] = None


class PerfilUpdate(BaseModel):
    nome: Optional[str] = None
    contato: Optional[str] = None


class ProdutoCreate(BaseModel):
    nome: str
    descricao: str
    preco: float = Field(gt=0)
    imagem_url: Optional[str] = None
    disponivel: bool = True


class ProdutoUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    preco: Optional[float] = Field(default=None, gt=0)
    imagem_url: Optional[str] = None
    disponivel: Optional[bool] = None


class ProdutoResponse(BaseModel):
    id: str
    nome: str
    descricao: str
    preco: float
    imagem_url: Optional[str] = None
    disponivel: bool


# ── Pedidos ──────────────────────────────────────────────────
class ItemPedidoCreate(BaseModel):
    produto_id: str
    quantidade: int = Field(gt=0)
    preco_unitario: float = Field(gt=0)


class PedidoCreate(BaseModel):
    itens: List[ItemPedidoCreate] = Field(min_length=1)
    endereco_entrega: str
    forma_pagamento: str = Field(
        pattern="^(cartao|pix|dinheiro|a_combinar)$",
        description="cartao | pix | dinheiro | a_combinar",
    )


class StatusUpdate(BaseModel):
    status: str


class ItemResponse(BaseModel):
    id: str
    produto_id: str
    quantidade: int
    preco_unitario: float
    produto: Optional[dict] = None


class PedidoResponse(BaseModel):
    id: str
    user_id: str
    data_hora: datetime
    status: str
    endereco_entrega: Optional[str] = None
    forma_pagamento: Optional[str] = None
    total: Optional[float] = None
    itens: Optional[List[ItemResponse]] = None
    usuario: Optional[dict] = None


class PedidoCriadoResponse(BaseModel):
    id: str
    status: str
    total: float
    whatsapp_url: str
