import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import "@ui5/webcomponents/dist/json-imports/i18n.js";

// Components
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
import "@ui5/webcomponents/dist/Option";

// Icons
import "@ui5/webcomponents/dist/icons/log.js";
import "@ui5/webcomponents/dist/icons/sys-help.js";
import "@ui5/webcomponents/dist/icons/settings.js";
import "@ui5/webcomponents/dist/icons/excel-attachment.js";
import "@ui5/webcomponents/dist/icons/sort-descending.js";
import "@ui5/webcomponents/dist/icons/action.js";
import "@ui5/webcomponents/dist/icons/sort-ascending.js";
import "@ui5/webcomponents/dist/icons/palette.js";
import "@ui5/webcomponents/dist/icons/temperature.js";
import "@ui5/webcomponents/dist/icons/web-cam.js";
import "@ui5/webcomponents/dist/icons/lightbulb.js";
import "@ui5/webcomponents/dist/icons/heating-cooling.js";
import "@ui5/webcomponents/dist/icons/washing-machine.js";
import "@ui5/webcomponents/dist/icons/retail-store.js";
import "@ui5/webcomponents/dist/icons/product.js";
import "@ui5/webcomponents/dist/icons/hide.js";
import "@ui5/webcomponents/dist/icons/fridge.js";

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
