import React, { useState, useEffect, useContext } from "react";
//import withAuth from "../component/withAuth";
import { apiBaseUrl } from "../constants";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";

const SignInForm = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	const initialInputState = { email: "", password: "" };
	const [eachEntry, setEachEntry] = useState(initialInputState);
	const { player, score } = eachEntry;
	const handleInputChange = e => {
		setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
	};

	const handleFinalSubmit = event => {
		//debugger;
		event.preventDefault();
		var raw = JSON.stringify(eachEntry);
		var requestOptions = {
			method: "POST",
			body: raw,
			headers: { "Content-Type": "application/json" }
		};
		fetch(`${apiBaseUrl}/api/sign_in`, requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log("OK: ", result);
				console.log(result["status"]);
				if (result["status"] == "KO") {
					toast("Wrong user e-mail or password!");
					history.push("/");
				} else {
					localStorage.setItem("accessToken", result["accessToken"]);
					actions.setCurrentUser(result["user"]);
					toast(
						"You're logged! Go to your weekly menus, save them, recover them or find your nearest store to complete your recipes!",
						{
							position: toast.POSITION.BOTTOM_RIGHT
						},
						{ autoClose: 6000 }
					);
					history.push("/home");
					actions.getAllMenusCount();
				}
			})
			.catch(error => {
				console.log("Error: ", error);
			});
	};

	return (
		<form onSubmit={handleFinalSubmit}>
			<div className="form-group">
				<label htmlFor="exampleInputEmail">Email address</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail"
					placeholder="Enter email"
					name="email"
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword">Password</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword"
					placeholder="Enter your password"
					name="password"
					onChange={handleInputChange}
				/>
			</div>
			<button type="submit" className="green-button btn ml-4 mb-1">
				Submit
			</button>
		</form>
	);
};

const SignIn = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	if (actions.isUserAuthenticated()) {
		history.push("/home");
	}

	return <SignInForm />;
};

export default SignIn;
