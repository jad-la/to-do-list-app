import React from 'react';
import FlecheIcon from '../assets/fleche-icons.ico';
import Circle from '../assets/circle.ico';
import CheckCircle from '../assets/checkCircle.ico';



const ListeModel2 = ({ onSelect, backgroundColor }) => {
    const modelStyles = {
        h2: 'Raleway',
        span: 'Quicksand',
        imgSrc: FlecheIcon,
        iconcheck:  CheckCircle ,
        icon:Circle, 
      };
  

  return (
      <div
        className="liste-modele"
        style={{ backgroundColor: backgroundColor }}
        onClick={() => onSelect(backgroundColor, modelStyles)}
      >
          <h2 style={{ fontFamily: 'Raleway' }}>Model 2</h2>
          <ul>
            <li>
                <div>
                    <img className='img-puce' src={FlecheIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Quicksand' }}>Tâche 1</span> 
                </div>  
                <img  src={ CheckCircle} alt="Icône étoile" width={10} height={10}  className='testIconeCheck'/>           
                
            </li>
            <li>
                <div>
                    <img className='img-puce' src={FlecheIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Quicksand' }}>Tâche 2</span> 
                </div>            
                <img  src={ CheckCircle} alt="Icône étoile" width={10} height={10}  className='testIconeCheck'/>
            </li>
            <li>
                <div>
                    <img className='img-puce' src={FlecheIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Quicksand' }}>Tâche 3</span> 
                </div>            
                <img  src={ Circle} alt="Icône étoile" width={10} height={10}  className='testIconeCheck'/>
            </li>
          </ul>
      </div>
  );
};

export default ListeModel2;