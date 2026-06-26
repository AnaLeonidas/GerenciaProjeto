from supabase import create_client, Client
from app.config import settings

_client_anon: Client | None = None
_client_admin: Client | None = None

def get_supabase() -> Client:
    """Retorna o cliente Supabase padrão (usando a ANON key). Ideal para logins e buscas normais."""
    global _client_anon
    if _client_anon is None:
        _client_anon = create_client(settings.supabase_url, settings.supabase_key)
    return _client_anon

def get_supabase_admin() -> Client:
    """Retorna o cliente Supabase Administrador (usando a SERVICE key). Ideal para o Signup."""
    global _client_admin
    if _client_admin is None:
        _client_admin = create_client(settings.supabase_url, settings.supabase_service_key)
    return _client_admin