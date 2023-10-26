import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Formulaire = ({ showAdditionalField, onSubmitApi, reinitPassWord }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        onSubmitApi(data);
      };
      //variable pour les message d'erreur lorsque les champs sont mal rensignés
   
      
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {showAdditionalField && (<>
            <input className='input-file' type="file" encType="multipart/form-data" name="profilePicture" accept="image/*" {...register('profilePicture')} />
            <input className='input-name input-focus' name='name' type='text'{...register('name', { required: true }) } placeholder='Nom' />
            {errors.name && <p>Last name is required.</p>}
          </>)}
            <input className='input-email input-focus' type="email" name="email" {...register('email', { required: true })} placeholder='E-mail'/>
            {errors.age && <p>Please enter your E-mail.</p>}
            <input className='input-password input-focus' type="password" name="password" {...register('password', { required: true })} placeholder='Mot de passe'/>
            {errors.age && <p>Please enter your password.</p>}
            <input className='btn-sub' type="submit" value='Connexion'/>
          {reinitPassWord && (<>
            <Link to="/reintialisation-password" className='lien-password'>Mot de passe oublié?</Link>
          </>)}
        </form>
    );
};

export default Formulaire;