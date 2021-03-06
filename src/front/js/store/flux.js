import { apiBaseUrl } from "../constants";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			hits: [],
			from: 0,
			to: 15,
			APP_ID: "ae68e508",
			APP_KEY: "62b671a1e444b07116376c2722805bd3",
			q: [],
			timeCooking: "1-400",
			newWeeklyMenu: {
				title: "",
				days: []
			},
			notifyMessage: "Wellcome to FoodAWeek",
			user: null,
			userMail: "",
			allUserMenus: [
				"http://www.edamam.com/ontologies/edamam.owl#recipe_e2044086d8346319d6c46b4273edf586",
				"http://www.edamam.com/ontologies/edamam.owl#recipe_62f902aa94f7c6040c736bb8550a107f",
				"http://www.edamam.com/ontologies/edamam.owl#recipe_e2044086d8346319d6c46b4273edf586"
			],
			allmenus: null,
			countmenus: [],
			thereismenus: ""
		}, //close store

		actions: {
			getRecipes: props => {
				let store = getStore();
				const url = `https://api.edamam.com/search?from=${store.from}&to=${store.to}&time=${store.timeCooking}&q=${props}&app_id=${store.APP_ID}&app_key=${store.APP_KEY}`;
				fetch(url)
					.then(resp => resp.json())
					.then(data => setStore({ hits: data.hits }))
					.catch(error => error);
				let newStoreQ = props;
				setStore({ q: newStoreQ });
			},
			getMoreRecipes: () => {
				// Pendiente añadir el condicional de more == true
				// si no more es false añadir mensaje = no hay más recetas!
				//console.log("getMoreRecipesIN");
				let store = getStore();
				var newStoreTo = store.to;
				newStoreTo = newStoreTo + 16;
				setStore({
					to: newStoreTo
				});
				var newStoreFrom = store.from;
				newStoreFrom = newStoreFrom + 16;
				setStore({
					from: newStoreFrom
				});

				const url = `https://api.edamam.com/search?from=${store.from}&to=${store.to}&time=${store.timeCooking}&q=${store.q}&app_id=${store.APP_ID}&app_key=${store.APP_KEY}`;
				fetch(url)
					.then(resp => resp.json())
					.then(data => setStore({ hits: store.hits.concat(data.hits) }))
					.catch(error => error);
			},
			selectNewRecipe: selectedRecipe => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(selectedRecipe);

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(`${apibaseUrl}selectedrecipe`, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},

			getWelcomeMessage: () => {},

			isUserAuthenticated: () => {
				return localStorage.getItem("accessToken") !== null;
			},
			logout: () => {
				localStorage.removeItem("accessToken");
			},
			setUser: userParams => {
				setStore({ user: userParams });
			},

			addRecipe: (day, meal, name, uri) => {
				let store = getStore();
				let newWeeklyMenu = store.newWeeklyMenu;

				if (!newWeeklyMenu.days[day]) {
					newWeeklyMenu.days[day] = [];
				}
				newWeeklyMenu.days[day][meal] = { name: name, url: uri };

				setStore({ newWeeklyMenu: newWeeklyMenu });
			},
			getDayName: dayNumber => {
				let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
				return days[dayNumber];
			},
			getMealName: mealNumber => {
				let meals = ["Breakfast ", "Snack 01 ", "Lunch ", "Snack 02 ", "Dinner "];
				return meals[mealNumber];
			},
			getMealContent: (mealArray, dayNumber, mealNumber) => {
				if (mealArray[dayNumber] && mealArray[dayNumber].selected_recipes) {
					for (var i = 0; i < mealArray[dayNumber].selected_recipes.length; i++) {
						if (mealArray[dayNumber].selected_recipes[i].position == mealNumber) {
							return mealArray[dayNumber].selected_recipes[i].recipe_label;
						}
					}
				}
				return "";
			},
			removeMeal: (dayNumber, mealNumber) => {
				let store = getStore();
				let meals = store.newWeeklyMenu.days[dayNumber];
				delete meals[mealNumber];
				//toast("Your recipe has been deleted. Select another day, meal or recipe");
				return meals;
			},
			addQuerySelection: userQuery => {
				let store = getStore();
				let query = store.q;
				query = userQuery;
				setStore({ q: [query] });
			},

			addNewWeeklyMenu: titleMenu => {
				let store = getStore();
				let newNewWeeklyMenu = store.newWeeklyMenu;
				let newTitleMenu = store.newWeeklyMenu.title;
				if (!newTitleMenu) {
					newTitleMenu = titleMenu;
				}
				newNewWeeklyMenu = {
					title: newTitleMenu,
					days: store.newWeeklyMenu.days
				};
				//console.log(newNewWeeklyMenu);
				setStore({ newWeeklyMenu: newNewWeeklyMenu });
				var raw = JSON.stringify(store.newWeeklyMenu);

				var requestOptions = {
					method: "POST",
					body: raw,
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin":
							"https://3001-teal-crayfish-87w91ixx.ws-eu03.gitpod.io/api/new_weekly_menu"
					}
				};
				//console.log(localStorage.getItem("accessToken"));
				//console.log(store.newWeeklyMenu);
				fetch(`${apiBaseUrl}/api/new_weekly_menu`, requestOptions)
					.then(response => response.json())
					.then(
						result => console.log(result),
						setStore({
							newWeeklyMenu: {
								title: "",
								days: []
							}
						})
					)
					.catch(error => error);
			},

			filterByTime: userTime => {
				let store = getStore();
				let time = store.timeCooking;
				time = userTime;
				setStore({ timeCooking: time });
			},

			setCurrentUser: userData => {
				setStore({ user: userData });
			},
			getAllMenus: () => {
				//let store = getStore();
				var requestOptions = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
						"Content-Type": "application/json"
					}
				};

				//debugger;
				fetch(`${apiBaseUrl}/api/me/menus`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log("Menus are not available now", error));
			},
			getAllDays: () => {
				//let store = getStore();
				var requestOptions = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
						"Content-Type": "application/json"
					}
				};
				fetch(`${apiBaseUrl}/me/menus`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log("Days are not available now", error));
			},
			getAllSelectedRecipes: () => {
				//let store = getStore();
				var requestOptions = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
						"Content-Type": "application/json"
					}
				};
				fetch(`${apiBaseUrl}/me/menus`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log("Recipes are not available now", error));
			},
			getAllMenusCount: () => {
				let store = getStore();
				var requestOptions = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
						"Content-Type": "application/json"
					}
				};

				fetch(`${apiBaseUrl}/api/me/menus`, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log("there is --> ", result.length, " menus");
						setStore({ countmenus: result });
						if (result.length != 0) {
							store.thereismenus = "Y";
						} else {
							store.thereismenus = "N";
						}
					})
					.catch(error => console.log("Menus are not available now", error));

				console.log("there is menus? ", store.thereismenus);
			}
		}
	};
};

export default getState;
