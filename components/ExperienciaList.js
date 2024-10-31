import { useEffect, useState } from 'react';
import ExperienciaForm from './ExperienciaForm';
import styles from './ExperienciaList.module.css'; // Importar el fitxer CSS Module

// Component que mostra la llista d'experiències i permet editar-les
export default function ExperienciaList({ experiencias = [], onDeleteExperience, onUpdateExperience }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [users, setUsers] = useState([]);

  // Obtenir la llista d'usuaris per mostrar els noms en lloc dels IDs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  // Funció per obtenir el nom d'un usuari a partir del seu ID
  const getUserName = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.name : 'Desconocido';
  };

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  // Funció per eliminar una experiència
  const handleDelete = (id) => {
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  // Funció per iniciar l'edició d'una experiència
  const handleEditClick = (exp) => {
    setIsEditing(true);
    setCurrentExp(exp);
  };

  // Funció per desar els canvis d'una experiència
  const handleSave = (updatedExp) => {
    if (onUpdateExperience) {
      onUpdateExperience(updatedExp);
    }
    setIsEditing(false);
    setCurrentExp(null);
  };

  return (
    <div className={styles.experienciaList}>
      <h2>Lista de Experiencias</h2>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id} className={styles.experienciaItem}>
            <p><strong>Descripción:</strong> {exp.description}</p>
            <p><strong>Dueño:</strong> {getUserName(exp.owner)}</p>
            <p><strong>Participantes:</strong> {exp.participants.map(getUserName).join(', ')}</p>
            <div>
              <button className={styles.btnDelete} onClick={() => handleDelete(exp._id)}>Eliminar</button>
              <button className={styles.btnEdit} onClick={() => handleEditClick(exp)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>

      {isEditing && (
        <ExperienciaForm
          experiencia={currentExp}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
