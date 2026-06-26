from typing import List
from app.models.schemas import ItemPedidoCreate


def calcular_total(itens: List[ItemPedidoCreate]) -> float:
    return round(sum(i.preco_unitario * i.quantidade for i in itens), 2)


FORMA_PAGAMENTO_LABEL = {
    "cartao":     "Cartão de crédito",
    "pix":        "PIX",
    "dinheiro":   "Dinheiro na entrega",
    "a_combinar": "A combinar pelo WhatsApp",
}


def formatar_itens_whatsapp(itens_db: list) -> str:

    linhas = []
    for item in itens_db:
        nome = item.get("produto", {}).get("nome", "Produto") if isinstance(item.get("produto"), dict) else "Produto"
        linhas.append(f"  • {item['quantidade']}x {nome} — R$ {item['preco_unitario']:.2f}")
    return "\n".join(linhas)