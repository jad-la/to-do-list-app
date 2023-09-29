import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CardList = ({donnee}) => {
    const navigate = useNavigate();

  return (
      <div className='carte' >
           
            <h2>{donnee.title}</h2>
            <div>{donnee.tasks.map((tache, index) =>(
                <div key={index}>
                    <h3 >{tache.title}</h3>
                    <p>{tache.description}</p>
                </div>
            ))}</div>
          <button onClick={() => {
    console.log(`liste/${donnee._id}`);
    navigate(`liste/${donnee._id}`);
}}>Afficher cette liste</button>
        
      </div>

  );
};

export default CardList;