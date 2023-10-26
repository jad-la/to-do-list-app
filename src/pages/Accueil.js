import React, { useState } from 'react';
import Wave from 'react-wavify';
import Formulaire from '../components/Formulaire';
import axios from 'axios';
import Header from '../components/Header';



const Accueil = ({ setIsAdminLoggedIn }) => {
    const [showAdditionalField, setShowAdditionalField] = useState(true);
    const [reinitPassWord, setReinitPassWord]= useState(false)
    const [firstFormStyle, setFirstFormStyle] = useState({});
    const [secondFormStyle, setSecondFormStyle] = useState({});
    const [btnToggle, setBtnToggle] = useState(() => {
        if (window.innerWidth <= 601) {
          return { left: '8px' };
        } else if (window.innerWidth <= 650) {
          return { left: '15px' };
        } else if (window.innerWidth <= 826) {
          return { left: '20px' };
        } else {
          return { left: '0' };
        }
      });
    // const [profilePicture] = useState(null);
    const [activeButton, setActiveButton] = useState('');
    
    const handleLoginButtonClick = () => {
        setFirstFormStyle({ 
            left: '-100%',
            transform: 'translateX(0%)'
         });
        setSecondFormStyle({   
            left:' 50%',
            transform: 'translateX(-50%)' });
        if (window.innerWidth <= 601) {
            setBtnToggle({left: '208px'});
        }else if (window.innerWidth <= 650) {
            setBtnToggle({left: '228px'});
        }else if (window.innerWidth <= 826) {
            setBtnToggle({left: '258px'});
        }else {
            setBtnToggle({ left:' 180px'})}; 
        setReinitPassWord(true);
        setActiveButton('login');
        setShowAdditionalField(false);
    };
    const handleSignupButtonClick = () => {
        setFirstFormStyle({ 
            left:' 50%',
            transform: 'translateX(-50%)' 
        });
        setSecondFormStyle({ left:' 100%'});
        if (window.innerWidth <= 601) {
            setBtnToggle({left: '8px'});
        }else if (window.innerWidth <= 650) {
            setBtnToggle({left: '15px'});
        } else if (window.innerWidth <= 826) {
            setBtnToggle({left: '20px'});
        } else {setBtnToggle({ left: '0'})};
        setShowAdditionalField(true);
        setActiveButton('signup');
    };
    const handleSignupFormSubmit = (data) => {
        // console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        if (data.profilePicture[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
        }
        // console.log(formData);
        // console.log(profilePicture);
        // Validation du mot de passe avec l'expression régulière
        const passwordRegExp = new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,30}$');
        if (!passwordRegExp.test(data.password)) {
            // Le mot de passe ne respecte pas les conditions, affichez une alerte
            alert('Le mot de passe ne respecte pas les conditions requises. Il doit contenir au moins 8 caractères avec au moins un caractère alphanumérique et peut contenir des caractères spéciaux.');
        } else {
            // Le mot de passe est valide, envoyez la requête
            axios.post('https://todo-check-api.onrender.com/api/user/signup', formData)
                .then((response) => {
                    console.log('Utilisateur enregistré', response.data);
                    alert('Utilisateur enregistré, vous pouvez vous connecter maintenant!');
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'enregistrement', error);
                });
        }
        // axios.post('https://todo-check-api.onrender.com/api/user/signup', formData)
        //     .then((response) => {
        //     console.log('Utilisateur enregistré', response.data);
        //     alert('Utilisateur enregistré, vous pouvez vous connecter maintenant!')
           
        //   })
        //   .catch((error) => {
        //     console.error('Erreur lors de l\'enregistrement', error);
            
        //   });
      };
      const handleLoginFormSubmit = (data) => {
        axios.post("https://todo-check-api.onrender.com/api/user/login", data)
        .then((response) => {
        //   console.log('Utilisateur connecté', response.data);
           // Récupérer les données renvoyées par l'API
           const { userId, token } = response.data;

           // Stockez les données dans le localStorage
           localStorage.setItem('userId', userId);
           localStorage.setItem('token', token);

           // Mettre à jour l'état pour indiquer que l'administrateur est connecté
           setIsAdminLoggedIn(true);
           window.location.href = '/Dashboard';
        })
        .catch((error) => {
          console.error('Erreur lors de la connexion', error);
          
        });
      };
      
    return (
        <div className='accueil-page'>
            <Header/>
            <section className='intro-signup-login'>
                <h1 className='titreAccueil'>Maîtrisez votre quotidien avec notre app de gestion de tâches personnelle !</h1>
                <p>Dites adieu aux oublis frustrants et aux journées désorganisées. Notre application vous accompagne avec des fonctionnalités simples mais puissantes, vous permettant de créer vos listes, de suivre vos tâches et de prioriser vos objectifs. Relevez le défi de la productivité avec notre application de liste de tâches, et découvrez comment une petite organisation peut faire une grande différence dans votre vie quotidienne.</p>

                <div id="signup-login" className='signup-login-section'>
                    <div className='btns-signup-login'>                       
                        <div className='btn-bgd'style={btnToggle}></div>
                        <button className={`btnSignup ${activeButton === 'signup' ? 'button-active' : ''}`} onClick={handleSignupButtonClick}>Inscription</button>
                        <button className={`btnLogin ${activeButton === 'login' ? 'button-active' : ''}`}onClick={handleLoginButtonClick}>Connexion</button>
                    </div>
                    <div className='form-box form-signup' style={firstFormStyle}>
                        <Formulaire showAdditionalField={showAdditionalField} onSubmitApi={handleSignupFormSubmit}/>
                    </div>
                    <div className='form-box form-login' style={secondFormStyle}>
                        <Formulaire reinitPassWord={reinitPassWord} onSubmitApi={handleLoginFormSubmit}/>
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
                            <img className='img-cover' src='/images/accueil/organisation.png' alt='organisation' />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Ajout de liste</h3>
                            <img src='/images/accueil/ajout-liste.png' alt='ajout de liste' />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Vue d'ensemble</h3>
                            <img src='/images/accueil/vue-ensemble.png' alt="Vue d'ensemble" />
                        </div>
                        <div className='bloc-contenu'>
                            <h3>Compte</h3>
                            <img src='/images/accueil/compte.png' alt='information compte' />
                        </div>
                </div>
            </section>

        </div>
    );
};

export default Accueil;