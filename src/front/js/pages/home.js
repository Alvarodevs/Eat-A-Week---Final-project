import React, { useContext } from "react";
import { Context } from "../store/appContext";
// import Cardesk from "bootstrap";
// import Cardmenus from "../component/cardweekmenu";
import "../../styles/index.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container background-white">
			<div className="text-center mt-3 ">{/* <h1>{""}</h1> */}</div>
			<div className="container services-description d-flex justify-content-center text-center text-plain mb-4 mx-auto py-4">
				<h1>
					Check the recipes you want and organize your week. When you run out of time, check your saved weeks!
				</h1>
			</div>
			<div className="services-container d-flex flex-row justify-content-around text-align-center">
				{/* LINKS A PAGES: NEWWEEK / RECIPE / GROCERYLIST / LOCALSHOPS */}
				<button className="service-circle" id="weeks">
					<p>
						<b>WEEK PLAN</b>
						{/* Link to=/newweek.js */}
					</p>
				</button>
				<button className="service-circle" id="newweek">
					<b>NEW WEEK MENU</b>
					{/* Link to=/recipe.js */}
				</button>
				{/* <button className="service-circle">
					<b>GROCERY LIST</b>
					Link to=/grocerylist.js
				</button> */}
				<button className="service-circle" id="localshops">
					<b>LOCAL SHOPS</b>
					{/* Link to=/xxxxxx.js */}
				</button>
			</div>
			{/* <div className="carousel-menus container-fluid d-flex justify-content-center text-center text-plain mx-auto my-4">
				RECIPES CAROUSEL */}
			{/* <Cardesk>
					<Cardmenus />
				</Cardesk>*/}
			{/* </div> */}
		</div>
	);
};
