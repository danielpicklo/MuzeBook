import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
//import axios from 'axios';

export const Register = (props) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    });

    const {name, email, password, confirmpassword, username} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== confirmpassword){
            props.setAlert("Passwords do not match", 'danger');
        }else{
            /*const user = {
                name,
                email,
                password
            }

            try{
               const config = {
                   headers:{
                       'Content-Type':'Application/json'
                   }
               } 

               const body = JSON.stringify(user);
               const res = await axios.post('/api/users', body, config);
               console.log(res.data);
            }catch(err){
                console.error(err);
            }*/

            console.log('User successfully created');
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
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} required/>
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={e => onChange(e)} required/>
                        <input type="submit" vlaue="Register"/>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default connect(null, {setAlert})(Register);
