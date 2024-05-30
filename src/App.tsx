import { Routes, Route } from "react-router-dom";
import "./App.css";

import "@ui5/webcomponents-base/features/F6Navigation.js";
import "@ui5/webcomponents-fiori/Assets.js";

// Custom Theme CSS Properties
import "./custom-themes/redfish/css_variables.css";

// UI5 Web Components
import "@ui5/webcomponents-compat/Table.js";
import "@ui5/webcomponents-compat/TableColumn.js";
import "@ui5/webcomponents-compat/TableRow.js";
import "@ui5/webcomponents-compat/TableCell.js";

import "@ui5/webcomponents/Form.js";
import "@ui5/webcomponents/FormItem.js";

import "@ui5/webcomponents/Label.js";
import "@ui5/webcomponents/Text.js";
import "@ui5/webcomponents/Tag.js";
import "@ui5/webcomponents/Button.js";
import "@ui5/webcomponents/ToggleButton.js";
import "@ui5/webcomponents/Title";
import "@ui5/webcomponents/Tab";
import "@ui5/webcomponents/Toolbar";
import "@ui5/webcomponents/ToolbarButton";
import "@ui5/webcomponents/TabSeparator";
import "@ui5/webcomponents/Popover";
import "@ui5/webcomponents-fiori/NotificationListItem";
import "@ui5/webcomponents-fiori/DynamicPage";
import "@ui5/webcomponents-fiori/DynamicPageTitle";
import "@ui5/webcomponents-fiori/DynamicPageHeader";
import "@ui5/webcomponents-fiori/ShellBar";
import "@ui5/webcomponents-fiori/ShellBarItem";

// UI5 Web Components Icons
import "@ui5/webcomponents-icons/alert.js";
import "@ui5/webcomponents-icons/retail-store.js";
import "@ui5/webcomponents-icons/laptop.js";
import "@ui5/webcomponents-icons/share-2.js";
import "@ui5/webcomponents-icons/action-settings.js";
import "@ui5/webcomponents-icons/nutrition-activity.js";
import "@ui5/webcomponents-icons/accept.js";
import "@ui5/webcomponents-icons/decline.js";
import "@ui5/webcomponents-icons/nav-back.js";
import "@ui5/webcomponents-icons/globe.js";
import "@ui5/webcomponents-icons/date-time.js";
import "@ui5/webcomponents-icons/sort-descending.js";
import "@ui5/webcomponents-icons/sort-ascending.js";
import "@ui5/webcomponents-icons/excel-attachment.js";
import "@ui5/webcomponents-icons/e-care.js";
import "@ui5/webcomponents-icons/retail-store.js";
import "@ui5/webcomponents-icons/edit.js";
import "@ui5/webcomponents-icons/palette.js";
import "@ui5/webcomponents-icons/settings.js";
import "@ui5/webcomponents-icons/sys-help.js";
import "@ui5/webcomponents-icons/log.js";
import "@ui5/webcomponents-icons/action.js";
import "@ui5/webcomponents-icons/product.js";
import "@ui5/webcomponents-icons/web-cam.js";
import "@ui5/webcomponents-icons/hide.js";
import "@ui5/webcomponents-icons/calendar.js";
import "@ui5/webcomponents-icons/phone.js";
import "@ui5/webcomponents-icons/fridge.js";
import "@ui5/webcomponents-icons/lightbulb.js";
import "@ui5/webcomponents-icons/heating-cooling.js";
import "@ui5/webcomponents-icons/washing-machine.js";
import "@ui5/webcomponents-icons/temperature.js";

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
			<AppBar navigate={navigate} tabName={tabName}/>

			<Routes>
				<Route path="/" element={<Home navigate={navigate}/>} />
				<Route path='/detail' element={<Detail navigate={navigate}/>}/>
				<Route path="/*" element={<Home navigate={navigate} />} />
			</Routes>
		</div>
	);
}

export default App;
