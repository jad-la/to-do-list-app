import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";

const Sidebar = ({isAdminLoggedIn, setIsAdminLoggedIn, setSelectedItem, userId, fetchUserDetails, utilisateur}) => {
    console.log(userId);
     // État local pour gérer l'affichage du menu burger
     const [showBurgerMenu, setShowBurgerMenu] = useState(false);

     // Fonction pour basculer l'affichage du menu burger
     const toggleBurgerMenu = () => {
         setShowBurgerMenu(!showBurgerMenu);
     };
     // Fonction pour fermer le menu burger
    const closeBurgerMenu = () => {
        setShowBurgerMenu(false);
    };

    const handleLogout = () => {
        // Supprimez les informations du localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setIsAdminLoggedIn(false);
        window.location.href = '/'
    };
    useEffect(() => {
        fetchUserDetails(); // Appelez la fonction ici
    }, [userId]);
    
    return (
        <div className='container-sidebar'>
            <div className='bloc-img'>
                <img width={"100px"} height={'100px'} object-fit={"cover"} src={utilisateur.profilePicture} alt={utilisateur.name} />
            </div>
            <div className={`burger-menu ${showBurgerMenu ? 'show' : ''}`}>
                <BiMenu className='burger-button' onClick={toggleBurgerMenu}/>
                <div className={`burger-links ${showBurgerMenu ? 'show' : ''}`}>
                    <div className='liens-burger'>
                        <Link to={`/Dashboard/compte/${userId}`} onClick={closeBurgerMenu}>Mon compte</Link>
                        <Link to="/Dashboard/listes" onClick={closeBurgerMenu}>Mes listes</Link>
                        <Link to="/Dashboard/ajouter-liste" onClick={closeBurgerMenu}>Ajouter une liste</Link>
                    </div>
                    {isAdminLoggedIn && (
                    <button className="burger-btn-logout" onClick={handleLogout}>Déconnexion</button>
                    )}
                </div>
            </div>
            <div className='sidebar-ul'>
                <Link to={`/Dashboard/compte/${userId}`}>Mon compte</Link>
                <Link to="/Dashboard/listes">Mes listes</Link>
                <Link to="/Dashboard/ajouter-liste">Ajouter une liste</Link> 
            </div>
            {isAdminLoggedIn && (
                <button className='btn-logout' onClick={handleLogout}>Déconnexion</button>
            )}
        </div>
    );
};

export default Sidebar;