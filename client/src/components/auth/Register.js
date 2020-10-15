import React, {Fragment, useState} from 'react'

export const Register = () => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    });

    const {name, email, password, confirmpassword, username} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmpassword){
            console.log("passwords do not match");
        }else{
            console.log(formData);
        }
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome to MuzeBook</h1>
                <h3>Please sign up to continue to the community</h3>
                <div className="form">
                    <form onSubmit={e => onSubmit(e)}>
                        <input type="text" name="name" placeholder="Name" value={name} onChange={e => onChange(e)} required/>
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} required/>
                        <input type="text" name="username" placeholder="Username" value={username} onChange={e => onChange(e)} required/>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} required/>
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={e => onChange(e)} required/>
                        <input type="submit" vlaue="Register"/>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;
