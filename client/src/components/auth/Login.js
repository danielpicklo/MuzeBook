import React, {Fragment, useState} from 'react';

export const Login = () => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        console.log('User successfully logged in');
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome to MuzeBook</h1>
                <h3>Please sign up to continue to the community</h3>
                <div className="form">
                    <form onSubmit={e => onSubmit(e)}>
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} required/>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} required/>
                        <input type="submit" vlaue="Register"/>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
