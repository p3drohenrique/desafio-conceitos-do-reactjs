import React, {useEffect, useState} from "react";
import "./styles.css";
import api from './services/api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'https://github.com/p3drohenrique/desafio-conceitos-do-reactjs',
      techs: [
        'Node.js',
        'ReactJS'
      ]
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    let newProjects = projects.filter(project => project.id !== id);
    setProjects(newProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
