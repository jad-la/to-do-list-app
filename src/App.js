import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Accueil from "./pages/Accueil";
import Dashboard from "./pages/Dashboard";
import ErreurConnexion from "./pages/ErreurConnexion";
import Liste from "./components/Liste";
import InfoList from "./components/InfoList";
import MesListes from "./components/MesListes";
import Compte from "./components/Compte";
import axios from "axios";
import LienPassWord from "./components/LienPassWord";
import ResetPassword from "./components/ResetPassword";




function App() {
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
   // Récupérez le userId depuis le localStorage
   const userId = localStorage.getItem('userId');

   const [utilisateur, setUtilisateur] = useState([]);


   const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
    
      const response = await axios.get(`http://localhost:4000/api/user/compte/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Données récupérées depuis l\'API :', response.data);
      setUtilisateur(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur', error);
    }
  };
  // Vérifiez si l'administrateur est déjà connecté au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil setIsAdminLoggedIn={setIsAdminLoggedIn}/>}/>
        <Route path='/reintialisation-password' element={<LienPassWord />}/>
        <Route path='/reset-password/:token' element={<ResetPassword />}/>
        {/* <Route path='/Dashboard' element={isAdminLoggedIn ? <Dashboard isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <ErreurConnexion/>}/> */}
        <Route path="/Dashboard" element={isAdminLoggedIn ? 
          <Dashboard 
            isAdminLoggedIn={isAdminLoggedIn} 
            setIsAdminLoggedIn={setIsAdminLoggedIn} 
            userId={userId} 
            utilisateur={utilisateur}
            fetchUserDetails={fetchUserDetails}
          /> 
          : <ErreurConnexion />} >
          <Route index element={<MesListes />} />
          <Route path="compte/:id" element={<Compte />} />
          <Route path="ajouter-liste" element={<Liste isEditing={false} />} />
          <Route path="listes" element={<MesListes/>} />
          <Route path=":id" element={<InfoList/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
