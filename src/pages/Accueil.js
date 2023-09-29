import React, { useState } from 'react';
import Wave from 'react-wavify';
import Formulaire from '../components/Formulaire';
import axios from 'axios';
import Header from '../components/Header';



const Accueil = ({ setIsAdminLoggedIn }) => {
    const [showAdditionalField, setShowAdditionalField] = useState(false);
    const [firstFormStyle, setFirstFormStyle] = useState({});
    const [secondFormStyle, setSecondFormStyle] = useState({});
    const [btnToggle, setBtnToggle] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);

    const handleLoginButtonClick = () => {
        setFirstFormStyle({ 
            left: '-100%',
            transform: 'translateX(0%)'
         });
        setSecondFormStyle({   
            left:' 50%',
            transform: 'translateX(-50%)' });
        setBtnToggle({   
            left:' 180px'})
    };
    const handleSignupButtonClick = () => {
        setFirstFormStyle({ 
            left:' 50%',
            transform: 'translateX(-50%)' 
        });
        setSecondFormStyle({ left:' 100%'});
        setBtnToggle({ left: '0'});
        setShowAdditionalField(true);
    };
    const handleSignupFormSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        if (data.profilePicture[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
        }
        console.log(formData);
        console.log(profilePicture);
        axios.post('http://localhost:4000/api/user/signup', formData
        // , {
        //     headers: {
        //       'Content-Type': 'multipart/form-data', // Assurez-vous que le backend peut gérer les données multipart/form-data
        //     },
        //   }
          )
            .then((response) => {
            console.log('Utilisateur enregistré', response.data);
           
          })
          .catch((error) => {
            console.error('Erreur lors de l\'enregistrement', error);
            // Gérez l'erreur d'enregistrement ici
          });
      };
      const handleLoginFormSubmit = (data) => {
        axios.post('http://localhost:4000/api/user/login', data)
        .then((response) => {
          console.log('Utilisateur connecté', response.data);
           // Récupérez les données renvoyées par l'API
           const { userId, token } = response.data;

           // Stockez les données dans le localStorage
           localStorage.setItem('userId', userId);
           localStorage.setItem('token', token);

           // Mettez à jour l'état pour indiquer que l'administrateur est connecté
           setIsAdminLoggedIn(true);
           window.location.href = '/Dashboard';
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion', error);
          // Gérez l'erreur d'enregistrement ici
        });
      };
      
    return (
        <div className='accueil-page'>
            <Header/>
            <section className='intro-signup-login'>
                <h1 className='titreAccueil'>Maîtrisez votre quotidien avec notre app de gestion de tâches personnelle !</h1>
                <p>Dites adieu aux oublis frustrants et aux journées désorganisées. Notre application vous accompagne avec des fonctionnalités simples mais puissantes, vous permettant de créer vos listes, de suivre vos tâches et de prioriser vos objectifs. Relevez le défi de la productivité avec notre application de liste de tâches, et découvrez comment une petite organisation peut faire une grande différence dans votre vie quotidienne.</p>

                <div id="signup-login" className='signup-login-section'>
                
                        {/* <img className='svgWavy' src='/images/Vector1.svg' alt='fond wavy svg'/> */}

                    <div className='btns-signup-login'>
                        
                        <div className='btn-bgd'style={btnToggle}></div>
                        <button className='btnSignup' onClick={handleSignupButtonClick}>Inscription</button>
                        <button className='btnLogin'onClick={handleLoginButtonClick}>Connexion</button>
                    </div>
                    <div className='form-box form-signup' style={firstFormStyle}>
                        <Formulaire showAdditionalField={showAdditionalField} onSubmitApi={handleSignupFormSubmit}/>
                    </div>
                    <div className='form-box form-login' style={secondFormStyle}>
                        <Formulaire onSubmitApi={handleLoginFormSubmit}/>
                    </div>
                </div>

            </section>
          
                <section className='info'>
                    <Wave className='separateur' fill='#FEBB9E'
                        paused={false}
                        style={{ display: 'flex' }}
                        options={{
                            height: 20,
                            amplitude: 20,
                            speed: 0.15,
                            points: 3
                        }}
                    />
                    <div className='partie-info'>
                        <div className='bloc-contenu'>
                            <h3>Organisation</h3>
                            <img src='/images/accueil/3877111.jpg' alt='organisation' />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Ajout de liste</h3>
                            <img src='/images/accueil/3920018.jpg' alt='organisation' />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Vue d'ensemble</h3>
                            <img src='/images/accueil/3542806.jpg' alt='organisation' />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Compte</h3>
                            <img src='/images/accueil/dashboard-analyser-donnees.jpg' alt='organisation' />
                        </div>
                    </div>
                </section>

        </div>
    );
};

export default Accueil;