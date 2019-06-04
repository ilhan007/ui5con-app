import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Timeline";
import "@ui5/webcomponents/dist/ShellBar";
import "./App.css";
import profile from "./img/profile.png";
import Navigation from "./navigation/Navigation";
import Home from "./home/Home";
import Products from "./products/Products";

const App = () => {
  return (
	<div className="App">
		<ui5-shellbar
			primary-title="Dashboard"
			show-notifications notification-count="12"
			profile={profile}>
		</ui5-shellbar>

		<Route path='/' component={Navigation}/>

		<Switch>
			<Route path='/home' component={Home}/>
			<Route path='/products' component={Products}/>
			<Redirect from="/" to="home" />
		</Switch>
	</div>
  );
}

export default App;
