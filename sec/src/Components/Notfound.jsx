import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
    const Navigate=useNavigate()
    let handelnav=()=>{
        Navigate("/Home")
    }
    return (
        <div>
            <h1 className='alert alert-danger'>Error page!</h1>
            <button className="btn btn-dark" onClick={handelnav}>Back</button>
        </div>
    );
};

export default Notfound;