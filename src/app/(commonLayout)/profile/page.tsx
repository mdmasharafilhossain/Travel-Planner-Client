import useAuth from '@/hooks/useAuth';
import React from 'react';

const ProfilePage = () => {
    const {user, loading} = useAuth();
    return (
        <div>
            Name:
           {
            user?.fullName
           }
        </div>
    );
};

export default ProfilePage;