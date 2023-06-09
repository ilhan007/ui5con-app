import { Routes, Route } from "react-router-dom";
import "./App.css";

import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";

// Custom Theme CSS Properties
import "./custom-themes/redfish/css_variables.css";

import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";

// UI5 Web Components Icons
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

// React Components
import Home from "./home/Home";
import Detail from './detail/Detail';
import AppBar from './appbar/AppBar';

import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const tabName = location === "/detail" ?  "My Inventory" : "My Home";

	return (
		<div className="App">
			<AppBar tabName={tabName}/>

			<Routes>
				<Route path="/" element={<Home navigate={navigate}/>} />
				<Route path='/detail' element={<Detail navigate={navigate}/>}/>
				<Route path="/*" element={<Home navigate={navigate} />} />
			</Routes>
		</div>
	);
}

export default App;
