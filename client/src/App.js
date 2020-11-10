import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Posts from "./components/posts/Posts";
import Alert from "./components/layout/Alert";
import Dash from "./components/dash/Dash";
import Profile from "./components/profiles/Profile";
import Private from "./components/routing/private";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { LOGOUT_USER } from "./actions/constants";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());

		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT_USER });
		});
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Alert />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profile/:id" component={Profile} />
						<Route exact path="/register" component={Register} />
						<Private exact path="/profile" component={Dash} />
						<Private exact path="/posts" component={Posts} />
						<Private
							exact
							path="/create-profile"
							component={CreateProfile}
						/>
					</Switch>
					<div className="footer"></div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
