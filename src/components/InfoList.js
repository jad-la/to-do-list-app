import axios from 'axios';
import React, { useEffect, useState } from 'react';
import  {Link, useParams} from 'react-router-dom';
import {CirclePicker } from 'react-color'
import ListeModel1 from './ListeModel1';
import ListeModel3 from './ListeModel3';
import ListeModel2 from './ListeModel2';
import {motion} from 'framer-motion';


const InfoList = () => {
  const { id } = useParams(); // Récupère l'ID de la liste depuis les paramètres d'URL
  const [liste, setListe] = useState(null);
  const [editing, setEditing] = useState(false); // État de l'édition
  const [editedTitle, setEditedTitle] = useState(liste ? liste.title : '');
  const [editedCompleted, setEditedCompleted] = useState(liste ? liste.completed : false);
  const [editedTasks, setEditedTasks] = useState(liste ? liste.tasks : []);
  const [newTask, setNewTask] = useState('');
  const token = localStorage.getItem('token');
  // const [editedColor, setEditedColor] = useState(liste ? liste.color : '');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');
  const predefinedColors = ['#F2C6DE', '#C6DEF1', '#C9E4DE', '#F9C6C9', '#FAEDCB', '#DBCDF0']; 
  const [selectedModelStyle, setSelectedModelStyle] = useState({}); // activé ou désactivé bordure
  const [model1Clicked, setModel1Clicked] = useState(false);
  const [model2Clicked, setModel2Clicked] = useState(false);
  const [model3Clicked, setModel3Clicked] = useState(false);

  const handleTemplateSelection = (color, modelStyles, modelName) => {
    setSelectedModel(modelStyles);
    setBackgroundColor(color);
    setSelectedModelStyle(modelName)

    // Désactivez les autres modèles
    if (modelName === 'model1') {
      setModel1Clicked(true);
      setModel2Clicked(false);
      setModel3Clicked(false);
    } else if (modelName === 'model2') {
      setModel1Clicked(false);
      setModel2Clicked(true);
      setModel3Clicked(false);
    } else if (modelName === 'model3') {
      setModel1Clicked(false);
      setModel2Clicked(false);
      setModel3Clicked(true);
    }
  };

  useEffect(() => {
    const fetchListeDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/liste/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
              
            },
          });
        setListe(response.data);
        setEditedTitle(response.data.title);
        setEditedCompleted(response.data.completed);
        setEditedTasks(response.data.tasks);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la liste', error);
      }
    };

    fetchListeDetails();
  }, [id]);

  

  const handleAddTask = () => {
    setEditedTasks([...editedTasks, { title: newTask, completed: false }]);
    setNewTask('');
  };

  const handleUpdate = async () => {
    try {
        
        await axios.put(`http://localhost:4000/api/liste/${id}`, {
            title: editedTitle,
            completed: editedCompleted,
            tasks: editedTasks,
            color: backgroundColor,
            model: selectedModel,
        }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setListe(prevListe => ({
          ...prevListe,
          title: editedTitle,
          completed: editedCompleted,
          tasks: editedTasks, 
          color: backgroundColor,
          model: selectedModel,
      }));
      setEditing(false); // Désactiver le mode d'édition
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la liste', error);
    }
};
  
const handleTaskCompletionChange = async (taskId,  newCompletedValue) => {
    try {
        console.log('taskId:', taskId);
    console.log('newCompletedValue:', newCompletedValue);
      const token = localStorage.getItem('token');
      const response= await axios.put(
        `http://localhost:4000/api/liste/task/${taskId}`,
        {  
            completed: newCompletedValue, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
      
      setEditedCompleted(newCompletedValue);

      }console.log('taskId:', taskId);
    console.log('newCompletedValue:', newCompletedValue);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  const handleDeleteListe = async () => {
    try {
      
      if (!token) {
        console.error('Token d\'authentification introuvable.');
        return;
      }

      const response = await axios.delete(`http://localhost:4000/api/liste/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data); 
      
      window.location.href = '/Dashboard/listes';
      
    } catch (error) {
      console.error('Erreur lors de la suppression du projet', error);
      
    }
  };

  return (
    <div className='componenent-infoList'>
            {liste && (
                <div className='blocInfo'>
                    
                    {editing ?(
                      <div className='infoListe-modif'>
                          <h1>Modifier la liste</h1>
                          <div className='form-modif'> 
                              <div className='titre-liste'>
                                  <label>Titre de la liste:</label>
                                  <input
                                      type="text"
                                      value={editedTitle}
                                      onChange={(e) => setEditedTitle(e.target.value)}
                                  />
                              </div>

                              <div className='item-taches'>
                                <span>Modifier l'intitulé des tâches:</span>
                                  {editedTasks.map((task, index) => (
                                      <div className='bloc-taches' key={index}>
                                          <input
                                              className='champ-tache'
                                              type="text"
                                              value={task.title}
                                              onChange={(e) => {
                                                  const newTasks = [...editedTasks];
                                                  newTasks[index].title = e.target.value;
                                                  setEditedTasks(newTasks);
                                              }}
                                          />
                                            
                                        
                                              <input
                                                  type="checkbox"
                                                  checked={task.completed}
                                                  onChange={(e) => {
                                                      const newTasks = [...editedTasks];
                                                      newTasks[index].completed = e.target.checked;
                                                      setEditedTasks(newTasks);
                                                  }}
                                              />
                                          
                                      </div>
                                  ))}
                              </div>

                              <span>Modifier la couleur:</span>
                              <div className='color-bloc'>
                                  <CirclePicker
                                    className='item-color'
                                    color={backgroundColor}
                                  
                                    onChangeComplete={(color) => handleTemplateSelection(color.hex, selectedModel )}
                                    colors={predefinedColors}
                                  />
                              </div>
                              <span>Modifier le model:</span>
                              <div className="liste-modeles">
                                  <ListeModel1 
                                    className='model model1' 
                                    backgroundColor= {backgroundColor} 
                                    onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles, 'model1')} 
                                    isSelected={selectedModelStyle === 'model1'}
                                  />
                                  <ListeModel2 
                                    className='model model2' 
                                    backgroundColor= {backgroundColor}
                                    onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles, 'model2')} 
                                    isSelected={selectedModelStyle === 'model2'}
                                  />
                                  <ListeModel3 
                                    className='model model3' 
                                    backgroundColor= {backgroundColor} 
                                    onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles, 'model3')} 
                                    isSelected={selectedModelStyle === 'model3'}
                                  />
                              </div>
                                  <div className='bloc-btn-modif'>
                                      <button className='btn-modif' onClick={handleAddTask}>Ajouter une tâche</button>
                                      <button className='btn-modif' onClick={handleUpdate}>Enregistrer</button>
                                      <button className='btn-modif' onClick={() => setEditing(false)}>Annuler</button>
                                  </div>
                          </div>
                   
                      </div>
                    ):(
                      <div  className='infoListe' style={{
                        
                        backgroundColor: liste.color, 
                        padding: '10px',
                        borderRadius: '5px',
                      }}>
                          <h2 style={{ fontFamily: liste.model.h2 }}>
                            {liste.title}
                          </h2>

                          <div className='lesTaches'>
                            {liste.tasks.map((task, index) => (
                              <div className='tache' key={index}>
                                  <h3 style={{ fontFamily: liste.model.span }}>{task.title}</h3>
                                  <input
                                          type="checkbox"
                                          checked={task.completed}
                                          onChange={(e) =>{
                                              const newTasks = [...editedTasks];
                                              newTasks[index].completed = e.target.checked;
                                              setEditedTasks(newTasks);
                                          
                                              // Appelez ensuite la fonction pour mettre à jour la tâche côté serveur
                                              handleTaskCompletionChange(task._id, e.target.checked);
                                            }}
                                  /> 
                              </div>
                            ))}
                          </div>
                          {!editing &&(
                            <div className='btnDeletePut'>
                                <motion.button whileHover={{scale: 1.05}} style={{ fontFamily: liste.model.span }} onClick={() => setEditing(true)}> Modifier</motion.button>
                                <motion.button whileHover={{scale: 1.05}} style={{ fontFamily: liste.model.span }} onClick={() => handleDeleteListe()}> Supprimer</motion.button>
                                <motion.button whileHover={{scale: 1.05}} style={{ fontFamily: liste.model.span }}> <Link to="/Dashboard/listes">Retour</Link> </motion.button>
                            </div>
                          )}
                      </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default InfoList;