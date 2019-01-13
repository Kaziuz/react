import React from 'react';
import useResources from './useResources';

const UserList = () => {

    const users = useResources('users');
    
    return (
        <ul>
            <h5>Users in stage</h5>
            {
                users.map(
                    user => 
                        <div key={user.id}>
                            <li>{user.name}</li>
                        </div>
                ) 
            }
        </ul>
    );
}

export default UserList;