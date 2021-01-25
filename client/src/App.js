import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
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
import styled, { ThemeProvider } from "styled-components";
import { light, dark, GlobalStyles } from "./Theme";

const StyledApp = styled.div``;

const App = () => {
	const [theme, setTheme] = useState("dark");
	const themeToggle = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

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
		<ThemeProvider theme={theme === "light" ? light : dark}>
			<GlobalStyles />
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar />
						<Alert />
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/profile/:id"
								component={Profile}
							/>
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/posts/:id" component={Post} />
							<Private exact path="/profile" component={Dash} />
							<Route exact path="/posts" component={Posts} />
							<Private
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>
						<div className="footer">
							<button
								className="centered"
								onClick={() => themeToggle()}
							>
								Change Theme to{" "}
								{theme === "light" ? "Dark" : "Light"}
							</button>
						</div>
					</Fragment>
				</Router>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
