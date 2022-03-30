import React, { useEffect, useState } from 'react';
import SingleUsers from '../SingleUsers/SingleUsers';

const UserInfo = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://boiling-retreat-27528.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                console.log(data);
            })
    }, [])
    return (
        <div className='App'>
            <h2>Register User</h2>
            {
                users.map(user => <SingleUsers key={user._id} user={user}></SingleUsers>)
            }
        </div>
    );
};

export default UserInfo;