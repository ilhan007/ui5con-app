import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import profile from "./img/profile.png";
import logo from "./img/logo.png";

import { setTheme } from "@ui5/webcomponents-base/Theming";
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
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/ToggleButton";

import Home from "./home/Home";
import Detail from './detail/Detail';

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

class AppBar extends Component {	

	constructor (props) {
		super(props);
		this.appBar = React.createRef();
		this.themeSwitch = React.createRef();
	}

	componentDidMount() {
		this.appBar.current.addEventListener("profilePress", this.onProfilePressed);
		this.themeSwitch.current.addEventListener("change", this.onThemeSwitchPressed.bind(this));
	}

	onProfilePressed(event) {
		window["profile-popover"].openBy(event.detail.targetRef);
	}

	onThemeSwitchPressed(event) {
		setTheme(event.target.checked ? "sap_belize_hcb" : "sap_fiori_3");
	}

	render() {
		return (
			<div className="app-bar">
				<ui5-shellbar
					ref={this.appBar}
					primary-title="Smart Store Manager"
					show-notifications
					show-product-switch
					show-co-pilot
					profile={profile}
					logo={logo}>
				</ui5-shellbar>

				<ui5-popover id="profile-popover" hide-header placement-type="Bottom" horizontal-align="Right">
					<div className="profile-header centered">
						<img src={profile} alt="" className="profile-img"/>
						<ui5-title level="3">Darius Cummings</ui5-title>
						<ui5-label>Store Manager</ui5-label>
					</div>

					<div className="profile-content">

					<ui5-list separators="None">
						<ui5-li-custom type="Inactive">
							<div className="profile-hcb-switch centered">
								<ui5-li icon="sap-icon://palette" type="Inactive">High Contrast Black</ui5-li>
								<ui5-switch ref={this.themeSwitch}></ui5-switch>
							</div>
						</ui5-li-custom> 
						<ui5-li icon="sap-icon://settings">Settings</ui5-li>
						<ui5-li icon="sap-icon://sys-help">Help</ui5-li>
						<ui5-li icon="sap-icon://log">Sign out</ui5-li>
					</ui5-list>
					</div>
				</ui5-popover>
			</div>
		);
	}
}


export default App;
