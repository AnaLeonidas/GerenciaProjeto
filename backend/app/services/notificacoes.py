import urllib.parse
from app.config import settings
from app.services.pedidos import FORMA_PAGAMENTO_LABEL


def gerar_link_whatsapp(
    pedido_id: str,
    nome_cliente: str,
    itens_formatados: str,
    total: float,
    forma_pagamento: str,
    endereco: str,
) -> str:
    numero_curto = pedido_id[:8].upper()
    forma_label  = FORMA_PAGAMENTO_LABEL.get(forma_pagamento, forma_pagamento)

    mensagem = (
        f"Olá, La Dolce Vita! 🍪\n\n"
        f"Acabei de fazer o pedido *#{numero_curto}*.\n\n"
        f"*Itens:*\n{itens_formatados}\n\n"
        f"*Total:* R$ {total:.2f}\n"
        f"*Pagamento:* {forma_label}\n"
        f"*Entrega:* {endereco}\n\n"
        f"Aguardo a confirmação! 😊"
    )

    numero = settings.whatsapp_numero
    return f"https://wa.me/{numero}?text={urllib.parse.quote(mensagem)}"
