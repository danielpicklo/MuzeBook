import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

//import axios from 'axios';

export const Register = ({setAlert, register, isAuthenticated}) => {

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
            setAlert("Passwords do not match. Please try again.", 'danger');
        }else{
            register({name, email, password});

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
        }
    }

    if(isAuthenticated){
        return <Redirect to="/profile" />
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome to MuzeBook</h1>
                <h3>Please sign up to continue to the community</h3>
                <div className="form">
                    <form onSubmit={e => onSubmit(e)}>
                        <input type="text" name="name" placeholder="Name" value={name} onChange={e => onChange(e)} />
                        <input type="email" name="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} />
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} />
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={e => onChange(e)} />
                        <input type="submit" vlaue="Register"/>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired, 
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
