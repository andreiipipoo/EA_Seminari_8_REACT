import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';
import styles from './experiencias.module.css'; // Importar el fitxer CSS Module

// Pàgina principal que mostra la llista d'experiències i permet afegir-ne de noves
export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const URL = "http://localhost:3000/api/experiencias";

  // Obtenir la llista d'experiències des del servidor
  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  // Funció per crear una nova experiència
  const handleExperienciaSubmit = async (newExperiencia) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperiencia),
      });
      const data = await response.json();
      setExperiencias([...experiencias, data]);
      setIsCreating(false); // Tancar el formulari després de crear l'experiència
    } catch (err) {
      setError(err.message);
    }
  };

  // Funció per eliminar una experiència
  const handleDeleteExperience = async (id) => {
    try {
      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });
      setExperiencias(experiencias.filter(exp => exp._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };


  // Funció per actualitzar una experiència
  const handleUpdateExperience = async (updatedExp) => {
    try {
      const response = await fetch(`${URL}/${updatedExp._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExp),
      });
      const data = await response.json();
      setExperiencias(experiencias.map(exp => exp._id === data._id ? data : exp));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.experienciasPage}>
      <h1>Experiencias</h1>
      <button className={styles.btnAdd} onClick={() => setIsCreating(true)}>Añadir Nueva Experiencia</button>
      {isCreating && (
        <ExperienciaForm
          onSave={handleExperienciaSubmit}
          onCancel={() => setIsCreating(false)}
        />
      )}
      <ExperienciaList
        experiencias={experiencias}
        onDeleteExperience={handleDeleteExperience}
        onUpdateExperience={handleUpdateExperience}
      />
    </div>
  );
}