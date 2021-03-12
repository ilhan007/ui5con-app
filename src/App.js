import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "./custom-themes/cocacola/css_variables.css";

// UI5 Web Components
import "@ui5/webcomponents/dist/Avatar";
import "@ui5/webcomponents/dist/AvatarGroup";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/Calendar";
import "@ui5/webcomponents/dist/Icon";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-fiori/dist/NotificationListItem";

// icons
import "@ui5/webcomponents-icons/dist/palette.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/action.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/web-cam.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/fridge.js";
import "@ui5/webcomponents-icons/dist/lightbulb.js";
import "@ui5/webcomponents-icons/dist/heating-cooling.js";
import "@ui5/webcomponents-icons/dist/washing-machine.js";
import "@ui5/webcomponents-icons/dist/temperature.js";

// Custom UI5 Web Components
import "./custom-components/dist/ObjectHeader.js";
		

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
