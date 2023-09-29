import axios from 'axios';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdDelete} from "react-icons/md";
import ListeModel2 from './ListeModel2';
import ListeModel1 from './ListeModel1';
import ListeModel3 from './ListeModel3';
import {CirclePicker } from 'react-color'


const Liste = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [selectedModel, setSelectedModel] = useState(null); // Couleur de fond par défaut

  // const handleColorChange = (color) => {
  //   setBackgroundColor(color.hex);
  // };

  const predefinedColors = ['#F2C6DE', '#C6DEF1', '#C9E4DE']; 
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
      } = useForm();
      // const [selectedColor, setSelectedColor] = useState(null);
     
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'tasks', // Nom du champ de tâches dans le formulaire
      });
    
      const handleTemplateSelection = (color, modelStyles) => {
        setSelectedModel(modelStyles);
        setBackgroundColor(color);
      };
     

      const onSubmit = async (data) => {
        const newListeData = {
          title: data['titre-liste'],
          tasks: data.tasks,
          color: backgroundColor,
          model: selectedModel,
        };
        console.log(newListeData)
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('http://localhost:4000/api/liste', newListeData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
          });
    
          console.log(response.data);
          window.location.href = '/Dashboard/listes';
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <form  className='form-list' onSubmit={handleSubmit(onSubmit)}>
            <h1>Ajout de liste</h1>
            <div className='bloc-form'>
                <input
                  className='input-name'
                  name='titre-liste'
                  type='text'
                  {...register('titre-liste', { required: true })}
                  placeholder='Titre de la liste'
                />
                {errors['titre-liste'] && <p>Le titre de la liste est requis.</p>}

                <div className='bloc-taches'>
                  {fields.map((task, index) => (
                    <div className='ajout-tache' key={task.id}>
                      <input
                        className='input-name-tache'
                        name={`tasks[${index}].title`}
                        type='text'
                        {...register(`tasks[${index}].title`, { required: true })}
                        placeholder='Titre de la tâche'
                      />
                      {errors[`tasks[${index}].title`] && <p>Le titre de la tâche est requis.</p>}
          

                      {/* <button className='btn-sup-tache' type='button' > */}
                        <MdDelete className='icon-delete'onClick={() => remove(index)} />
                      {/* </button> */}
                    </div>
                  ))}
                  <button  className='btn-ajout-tache' type='button' onClick={() => append()}>Ajouter une tâche</button>
                </div>
                <div className='bloc-model-color'>
                    
                    <label>Choisissez un modèle :</label>
                    <div className="liste-modeles">
                      <ListeModel1  backgroundColor= {backgroundColor} onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles)} />
                      <ListeModel2  backgroundColor= {backgroundColor} onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles)} />
                      <ListeModel3  backgroundColor= {backgroundColor} onSelect={(color, modelStyles) => handleTemplateSelection(color, modelStyles)} />
                    </div>

                    <span>Choisissez une couleur</span>
                    <CirclePicker
                      className='item-color'
                      color={backgroundColor}
                     
                      onChangeComplete={(color) => handleTemplateSelection(color.hex, selectedModel )}
                      colors={predefinedColors}
                    />
                </div>
            </div>

            <button className='btn-submit' type='submit'>Créer la liste</button>
    </form>
      );
    };
export default Liste;