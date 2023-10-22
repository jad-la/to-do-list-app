import React  from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = ({isAdminLoggedIn, setIsAdminLoggedIn, userId, utilisateur, fetchUserDetails} ) => {
    
    
    return (
        <div className='page-dashboard'>
            <div className='main-dash'>
                <div className='sidebar'>
                    <Sidebar 
                        isAdminLoggedIn={isAdminLoggedIn} 
                        setIsAdminLoggedIn={setIsAdminLoggedIn}  
                        userId={userId} 
                        utilisateur={utilisateur} 
                        fetchUserDetails={fetchUserDetails}
                    />
                </div>
                {/* <div className='affichage-projets'>
                  
                    {renderContent()}
                </div> */}
                <Outlet />
            </div>
                   
        </div>
    );
};

export default Dashboard;