const API_URL = "http://localhost:8000";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

/* ── Auth ─────────────────────────────────────── */

export async function login(email, senha) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error("Login inválido");
  return res.json();
}

export async function cadastro(dados) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao criar conta");
  }
  return res.json();
}

export async function meuPerfil() {
  const res = await fetch(`${API_URL}/auth/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Erro ao carregar perfil");
  return res.json();
}

export async function atualizarPerfil(dados) {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao atualizar perfil");
  }
  return res.json();
}

/* ── Produtos ─────────────────────────────────── */

export async function listarProdutos() {
  const res = await fetch(`${API_URL}/produtos`);
  if (!res.ok) throw new Error("Erro ao carregar produtos");
  return res.json();
}

export async function maisPedidos() {
  const res = await fetch(`${API_URL}/produtos/mais-pedidos`);
  if (!res.ok) throw new Error("Erro ao carregar produtos mais pedidos");
  return res.json();
}

export async function buscarProduto(id) {
  const res = await fetch(`${API_URL}/produtos/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
}

export async function criarProduto(dados) {
  const res = await fetch(`${API_URL}/produtos/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao criar produto");
  }
  return res.json();
}

export async function atualizarProduto(id, dados) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao atualizar produto");
  }
  return res.json();
}

export async function desativarProduto(id) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Erro ao desativar produto");
}

/* ── Pedidos ──────────────────────────────────── */

export async function criarPedido(dados) {
  const res = await fetch(`${API_URL}/pedidos/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao criar pedido");
  }
  return res.json();
}

export async function meusPedidos() {
  const res = await fetch(`${API_URL}/pedidos/meus`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Erro ao carregar pedidos");
  return res.json();
}

export async function todosPedidos() {
  const res = await fetch(`${API_URL}/pedidos/`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Erro ao carregar pedidos");
  return res.json();
}

export async function atualizarStatusPedido(id, status) {
  const res = await fetch(`${API_URL}/pedidos/${id}/status`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Erro ao atualizar status");
  }
  return res.json();
}
