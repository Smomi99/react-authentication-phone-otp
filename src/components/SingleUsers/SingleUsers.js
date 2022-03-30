import React from 'react';

const SingleUsers = (props) => {
    const { email } = props.user;
    return (
        <div className='App'>

            <li>{email}</li>
        </div>
    );
};

export default SingleUsers;