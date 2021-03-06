import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";

export const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to="/profile" />;
	}

	return (
		<Fragment>
			<div className="container">
				<h1 className="centered">Welcome Back to MuzeBook</h1>
				<h3 className="centered">
					Please sign in to pick up where you left off!
				</h3>
				<div className="form">
					<form onSubmit={(e) => onSubmit(e)}>
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
						<input type="submit" value="Log In" />
					</form>
				</div>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
