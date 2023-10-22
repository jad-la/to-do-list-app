import React from 'react';
import CircleIcon from '../assets/perfect-circle.ico';
import SquareCheck from '../assets/squareCheck.ico';
import Square from '../assets/square.ico';
import {motion} from 'framer-motion';


const ListeModel1 = ({ onSelect, backgroundColor, isSelected }) => {
  const modelStyles = {
    h2: 'Courgette',
    span: 'Caveat',
    imgSrc: CircleIcon,
    iconcheck:  SquareCheck ,
    icon:Square, 
  };
  const borderStyle = {
    backgroundColor: backgroundColor,
    border: isSelected ? '1px solid rgb(104 102 102)' : 'none',
  };
  return (
    <motion.div
      whileHover={{scale: 1.05}}
      className="liste-modele"
      style={borderStyle}
      onClick={() => onSelect(backgroundColor, modelStyles, 'model1')}
    >
      <h2 style={{ fontFamily: 'Courgette' }}>Model 1</h2>
          <ul>
            <li>
                <div>
                    <img className='img-puce' src={CircleIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Caveat' }}>Tâche 1</span> 
                </div>    
                <img  src={ SquareCheck} alt="Icône étoile" width={10} height={10}  className='testIconeCheck'/>        
                {/* <FaRegSquareCheck className='testIconeCheck'/>  */}
            </li>
            <li>
                <div>
                    <img className='img-puce' src={CircleIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Caveat' }}>Tâche 2</span> 
                </div>   
                <img  src={ SquareCheck } alt="Icône étoile" width={10} height={10} className='testIconeCheck' />           
                {/* <FaRegSquareCheck className='testIconeCheck'/>  */}
            </li>
            <li>
                <div>
                    <img className='img-puce' src={CircleIcon} alt="Icône étoile" width={10} height={10} />
                    <span style={{ fontFamily: 'Caveat' }}>Tâche 3</span> 
                </div>  
                <img  src={ Square } alt="Icône étoile" width={10} height={10} className='testIconeCheck' />            
                {/* <FaRegSquareCheck className='testIconeCheck'/>  */}
            </li>
          </ul>
    </motion.div>
  );
};

export default ListeModel1;