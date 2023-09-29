import React from 'react';
import LosangeIcon from '../assets/losange-icon.ico';
import CheckSquare from '../assets/check_square.ico';
import Square from '../assets/square.ico';



const ListeModel3 = ({ onSelect, backgroundColor }) => {
  const modelStyles = {
    h2: 'Lora',
    span: 'Vollkorn',
    imgSrc: LosangeIcon,
    iconcheck:  CheckSquare ,
    icon:Square, 
  };
  return (
    <div
      className="liste-modele"
      style={{ backgroundColor: backgroundColor }}
      onClick={() => onSelect(backgroundColor, modelStyles)}
    >
      <h2 style={{ fontFamily: 'Lora' }}>Model 3</h2>
          <ul>
            <li>
                <div>
                    <img className='img-puce' src={LosangeIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Vollkorn' }}>Tâche 1</span> 
                </div>            
                <img  src={ CheckSquare} alt="Icône étoile" width={50} height={50}  className='testIconeCheck'/>   
            </li>
            <li>
                <div>
                    <img className='img-puce' src={LosangeIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Vollkorn' }}>Tâche 2</span> 
                </div>            
                <img  src={ CheckSquare} alt="Icône étoile"   className='testIconeCheck'/> 
            </li>
            <li>
                <div>
                    <img className='img-puce' src={LosangeIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Vollkorn' }}>Tâche 3</span> 
                </div>            
                <img  src={ Square} alt="Icône étoile"   className='testIconeCheck'/>
            </li>
          </ul>
    </div>
  );
};

export default ListeModel3;