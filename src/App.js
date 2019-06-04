import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import profile from "./img/profile.png";
import logo from "./img/logo.png";
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

import Navigation from "./navigation/Navigation";
import Home from "./home/Home";
import Products from "./products/Products";
import Detail from './detail/Detail';

const App = () => {
	return (
		<div className="App">
			<ui5-shellbar
				primary-title="Dashboard"
				show-notifications notification-count="12"
				profile={profile}
				logo={logo}>
			</ui5-shellbar>

			<Route path='/home' component={Navigation}/>

			<Switch>
				<Route path='/home/stats' component={Home}/>
				<Route path='/home/products' component={Products}/>
				<Route path='/detail' component={Detail}/>
				<Redirect from="/" to="/home/stats" />
			</Switch>
		</div>
	);
}

export default App;
