import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import Stats from './Stats'
import 'chart.js/auto';
import {motion} from 'framer-motion';






const MesListes = () => {
    const [lists, setLists] = useState([]);
   

    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://todo-check-api.onrender.com/api/liste', {
          headers: {
            Authorization: `Bearer ${token}`
            // Ajouter votre token d'authentification ici si nécessaire
          },
        });
        // console.log('Données récupérées depuis l\'API :', response.data);
        setLists(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des listes', error);
      }
    };

  
    useEffect(() => {
      fetchLists();
    }, []);
  
    return (
      <div className='page-liste'>
        <h1>Mes listes de tâches</h1>
        <div className='bloc-listes'>
          {lists.length === 0 ? ( // Vérifiez s'il n'y a pas de listes
            <div className='no-lists-message'>
              <p>Vous n'avez pas encore créé de listes de tâches.</p>
              <Link to="/Dashboard/ajouter-liste">Ajouter une liste</Link>
            </div>
          ) : (
              lists.map((donnee, index) => (
                  <div className='box-info' key={index} style={{ backgroundColor: donnee.color }}>
                          
                          <h2 style={{ fontFamily: donnee.model.h2 }}>{donnee.title}</h2>
                      <ul>{donnee.tasks.map((tache, index) =>(
                        
                            <li key={index}>
                              <div>
                                <img className='circleIcone' src={donnee.model.imgSrc} alt="Icône étoile" width={10} height={10} />
                                <span style={{ fontFamily: donnee.model.span }}>{tache.title}</span> 
                              </div> 
                              
                              {tache.completed ?<img
                          src={donnee.model.iconcheck}
                          alt='Icône étoile'
                          width={13}
                          height={13}
                        /> : <img src={donnee.model.icon}
                        alt='Icône étoile'
                        width={10}
                        height={10} className='iconeCheck'/>}
                            </li>
                        
                      ))}</ul>
                      <motion.button 
                        whileHover={{scale: 1.05}}
                        style={{ fontFamily: donnee.model.span }} 
                      >
                        <Link to={`/Dashboard/${donnee._id}`}>Plus de details</Link>
                      </motion.button>
                  </div>
              ))
          )}
        </div>
        <h2>Mes statistiques</h2>
        <div className="bloc-stats">
          <Stats  />
        </div>
      </div>
    );
  };


export default MesListes;