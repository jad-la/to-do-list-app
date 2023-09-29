import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Accueil from "./pages/Accueil";
import Dashboard from "./pages/Dashboard";
import ErreurConnexion from "./pages/ErreurConnexion";
import Liste from "./components/Liste";
import InfoList from "./components/InfoList";
import MesListes from "./components/MesListes";
import Compte from "./components/Compte";




function App() {
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
   // Récupérez le userId depuis le localStorage
   const userId = localStorage.getItem('userId');
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
        {/* <Route path='/Dashboard' element={isAdminLoggedIn ? <Dashboard isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <ErreurConnexion/>}/> */}
        <Route path="/Dashboard" element={isAdminLoggedIn ? <Dashboard isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} userId={userId} /> : <ErreurConnexion />} >
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
