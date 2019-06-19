# App Routing

In this step we will create an empty Detail component and set up a routing and navigation between the Home and Detail component.


1. Create ```detail``` folder under ```src```.

2. Create ```Detail.js``` file under ```src/detail/```.

3. Create the ```Detail``` component, that will return just  the words "Hello World" for now.

	```js 
	// Detail.js
	import React, { Component } from "react";

	class Detail extends Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<div className="detail-page">Hello World</div>
			)
		}
	}

	export default Detail;
	```
4. Install the ```react-router-dom```.
	```js
	npm install react-router-dom
	```
	Note: if the app shows an error after installing the above, you have to restart the dev server.

5. Import the ```HashRouter``` from ```react-router-dom``` and wrap the root component in ```index.js``` file as below:

	```js 
	// index.js
	import { HashRouter } from 'react-router-dom';

	ReactDOM.render(<HashRouter><App/></HashRouter>, document.getElementById('root'));
	```



6. Import the ```Switch```, ```Route```, ```Redirect``` from ```react-router-dom``` in ```src/App.js```  and import the ```Detail``` component.
Then, use the ```Switch``` to set up the paths and which component to be displayed respectively. After you add the code below, you should get the ```Home``` component on ```/#/home``` path and the ```Detail``` component on ```/#/detail``` path.


	```js 
	// App.js
	import React, { Component } from "react";
	import { Switch, Route, Redirect } from "react-router-dom";
	import "./App.css";
	import profile from "./img/profile.png";
	import logo from "./img/logo.png";

	import Home from "./home/Home";
	import Detail from './detail/Detail';

	function App() {
		return (
			<div className="App">
				<ui5-shellbar
					primary-title="Smart Store Manager"
					show-notifications
					show-product-switch
					show-co-pilot
					profile={profile}
					logo={logo}>
				</ui5-shellbar>

				<Switch>
					<Route path='/home' component={Home}/>
					<Route path='/detail' component={Detail}/>
					<Redirect from="/" to="/home" />
				</Switch>
			</div>
		);
	}
	```

7. Now, let`s navigate to the ```Detail``` component by clicking the header of our "Inventory" card.  And, this would require changes in the ```Home``` component. 

- Bind for the ui5-card ```headerPress``` event in ```componentDidMount``` 
- Change the hash in the listener ```navToDetail```.

	```js 
	// Home.js
	import React, { Component } from "react";
	import data from "./data.json";

	class Home extends Component {

	constructor (props) {
		super(props);
		
		this.featuredCardsRefs = [];
		this._navToDetail = this.navToDetail.bind(this);
		this.state = {data};
	}

	// Bind for the "headerPress" event of the ui5-card
	componentDidMount() {
		const inventoryCardRef = this.featuredCardsRefs[0];

		if (inventoryCardRef) {
			inventoryCardRef.addEventListener("headerPress", this._navToDetail);
		}
	}

	// Change the hash and let the router switch the views
	navToDetail() {
		this.props.history.push("/detail");
	}

	render() {
		...
	}

	export default Home;
	```

- Add "ref" to the ui5-card ```ref={ref => this.featuredCardsRefs[index] = ref}``` in order to add an event listener.

	```html
	return(
		<div className="app-content">

			<ui5-title level="H3">Featured</ui5-title>
			<section className="section">
			{data.featured.map((dataObj, index) => 
			<ui5-card
				ref={ref => this.featuredCardsRefs[index] = ref}
				key={dataObj.key}
				heading={dataObj.heading}
				subtitle={dataObj.subtitle}
				status={dataObj.status}
				class="ui5card">
					<ui5-list separators="Inner">
					{dataObj.items.map(item =>
					<ui5-li
						key={item.key}
						icon={item.icon}
						description={item.description}
						info={item.description}
						info-state={item.infoState}
						class="ui5list-item">{item.title}</ui5-li>
					)}
					</ui5-list>
			</ui5-card>
			)}
			</section>
		</div>
	);
	```

	Now, you can press the header of the "Inventory" card and navigate to the ```Detail``` component.

### [Step #4 - The Profile Area](./Step4_The_Profile_Area.md)
