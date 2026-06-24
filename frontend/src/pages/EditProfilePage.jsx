import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import { atualizarPerfil } from '../services/api';
import '../styles/globals.css';
import '../styles/profile.css';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('usuario') || '{}');
  
  const [nome, setNome] = useState(stored.nome || stored.name || '');
  const [contato, setContato] = useState(stored.contato || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const updatedUser = await atualizarPerfil({ nome, contato });
      
      // Update local storage
      localStorage.setItem('usuario', JSON.stringify({
        ...stored,
        nome: updatedUser.nome,
        contato: updatedUser.contato
      }));

      // Go back to profile page
      if (updatedUser.papel === 'admin') {
        navigate('/perfil/admin');
      } else {
        navigate('/perfil');
      }
    } catch (err) {
      setError(err.message || 'Erro ao atualizar o perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <nav className="profile-navbar">
        <div className="profile-navbar-brand" onClick={() => navigate('/home')}>
          <LogoMark size={32} />
          <span>La Dolce Vita</span>
        </div>
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </nav>

      <div className="profile-content">
        <div className="profile-card" style={{ marginBottom: 20 }}>
          <div className="profile-card-body">
            <h2 className="profile-name" style={{ textAlign: 'center', marginBottom: 20 }}>Editar Perfil</h2>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {error && <div style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

              <div className="form-group">
                <label>Nome Completo</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>E-mail (Não editável)</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-input"
                    value={stored.email || ''}
                    disabled
                    style={{ backgroundColor: 'var(--gray-bg)', cursor: 'not-allowed' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefone / Contato</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="(11) 99999-9999"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="profile-action-btn primary"
                disabled={isLoading}
                style={{ marginTop: 10 }}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
