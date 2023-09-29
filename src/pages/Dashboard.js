import React  from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = ({isAdminLoggedIn, setIsAdminLoggedIn, userId} ) => {
    
    
    return (
        <div className='page-dashboard'>
            <div className='main-dash'>
                <div className='sidebar'>
                    <Sidebar isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}  userId={userId}/>
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