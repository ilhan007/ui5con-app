import React, { Component } from "react";
import profile from "../img/profile.png";
import logo from "../img/logo.png";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents/dist/json-imports/Themes.js";

class AppBar extends Component {	

	constructor (props) {
		super(props);
		this.appBar = React.createRef();
		this.themeSwitch = React.createRef();
	}

	componentDidMount() {
		this.appBar.current.addEventListener("profileClick", this.onProfileClicked);
		this.themeSwitch.current.addEventListener("change", this.onThemeSwitchPressed.bind(this));
	}

	onProfileClicked(event) {
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

export default AppBar;