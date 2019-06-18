import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Icon";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Timeline";

import Home from "./home/Home";
import Detail from './detail/Detail';
import AppBar from './appbar/AppBar';

const App = () => {
	return (
		<div className="App">
			<AppBar />

			<Switch>
				<Route path='/home' component={Home}/>
				<Route path='/detail' component={Detail}/>
				<Redirect from="/" to="/home" />
			</Switch>
		</div>
	);
}




export default App;
