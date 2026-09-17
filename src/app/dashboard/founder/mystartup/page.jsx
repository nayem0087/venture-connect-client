import React from 'react';
import MyStartupPage from './MyStartup';
import { getUserSession } from '@/lib/core/session';

const StartupPage = async() => {

    
    const user = await getUserSession();
    console.log('get user session', user);
    const id = user?._id;

    return (
        <div>
            <MyStartupPage id={id} founder={user} />
        </div>
    );
};

export default StartupPage;