import React, { useState, useEffect } from 'react';
import styles from './EditExperienciaDetails.module.css'; // Importar el fitxer CSS Module

// Component que mostra i permet editar els detalls d'una experiència
export default function EditExperienciaDetails({ experiencia, onSave, onCancel }) {
  const [description, setDescription] = useState(experiencia ? experiencia.description : '');
  const [owner, setOwner] = useState(experiencia ? experiencia.owner : '');
  const [participants, setParticipants] = useState(experiencia ? experiencia.participants : []);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Obtenir la llista d'usuaris per omplir els camps de selecció
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  // Funció per gestionar l'enviament del formulari
  const handleSubmit = (e) => {
    e.preventDefault();

    if (description && owner) {
      const updatedExperiencia = {
        ...experiencia,
        description,
        owner,
        participants,
      };
      onSave(updatedExperiencia);
    } else {
      alert('Debes completar todos los campos');
    }
  };

  if (loadingUsers) return <p>Cargando usuarios...</p>;

  return (
    <div className={styles.editExperienciaDetails}>
      <h2>Edita l'Experiència</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Descripción de la experiencia:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Seleccionar dueño:</label>
          <select value={owner} onChange={(e) => setOwner(e.target.value)}>
            <option value="">--Selecciona un usuario--</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Seleccionar participantes:</label>
          <select multiple value={participants} onChange={(e) => {
            const selectedParticipants = Array.from(e.target.selectedOptions, option => option.value);
            setParticipants(selectedParticipants);
          }}>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.btnSave}>Guardar</button>
        <button type="button" className={styles.btnCancel} onClick={onCancel}>Cancel·lar</button>
      </form>
    </div>
  );
}