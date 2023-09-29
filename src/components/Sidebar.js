import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({isAdminLoggedIn, setIsAdminLoggedIn, setSelectedItem, userId}) => {
    console.log(userId);
    const handleLogout = () => {
        // Supprimez les informations du localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setIsAdminLoggedIn(false);
        window.location.href = '/'
    };

    // const handleItemClick = (itemName) => {
    //     setSelectedItem(itemName); 
    // };
    return (
        <div className='container-sidebar'>
            <div className='sidebar-ul'>
                <Link to={`/Dashboard/compte/${userId}`}>Mon compte</Link>
                <Link to="/Dashboard/listes">Mes listes</Link>
                <Link to="/Dashboard/ajouter-liste">Ajouter une liste</Link>
                {/* <button className='btn-projets-categories' onClick={() => handleItemClick('Compte')}>
                    Compte
                </button>
                <button className='btn-projets-categories' onClick={() => handleItemClick('Mes listes')}>
                    Mes listes
                </button>
                <button className='btn-projets-categories' onClick={() => handleItemClick('Ajouter une liste')}>
                    Ajouter une liste
                </button> */}
            </div>
            {isAdminLoggedIn && (
                <button className='btn-logout' onClick={handleLogout}>Déconnexion</button>
            )}
        </div>
    );
};

export default Sidebar;