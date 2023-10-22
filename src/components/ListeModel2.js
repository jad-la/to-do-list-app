import React from 'react';
import FlecheIcon from '../assets/fleche-icons.ico';
import Circle from '../assets/circle.ico';
import CheckCircle from '../assets/checkCircle.ico';
import {motion} from 'framer-motion';



const ListeModel2 = ({ onSelect, backgroundColor, isSelected}) => {
    const modelStyles = {
        h2: 'Raleway',
        span: 'Quicksand',
        imgSrc: FlecheIcon,
        iconcheck:  CheckCircle ,
        icon:Circle, 
      };
      const borderStyle = {
        backgroundColor: backgroundColor,
        border: isSelected? '1px solid  rgb(104 102 102)' : 'none',
      };

  return (
      <motion.div
        whileHover={{scale: 1.05}}
        className="liste-modele"
        style={borderStyle}
        onClick={() => onSelect(backgroundColor, modelStyles, 'model2')}
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
      </motion.div>
  );
};

export default ListeModel2;