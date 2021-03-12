import React, { Component } from "react";
import profile from "../img/profile.png";
import logo from "../img/logo.png";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";

class AppBar extends Component {	

	constructor (props) {
		super(props);
		this.appBar = React.createRef();
		this.themeSwitch = React.createRef();
		this.languageSelect = React.createRef();
	}

	componentDidMount() {
		this.appBar.current.addEventListener("profile-click", this.onProfileClicked);
		this.appBar.current.addEventListener("notifications-click", this.onNotificationsClicked);
		this.themeSwitch.current.addEventListener("change", this.onThemeSwitchPressed.bind(this));
	}

	onProfileClicked(event) {
		window["profile-popover"].openBy(event.detail.targetRef);
	}

	onNotificationsClicked(event) {
		window["notifications-popover"].openBy(event.detail.targetRef);
	}

	onThemeSwitchPressed(event) {
		setTheme(event.target.checked ? "sap_fiori_3_dark" : "sap_fiori_3");
	}

	render() {
		return (
			<div className="app-bar">
				<ui5-shellbar
					ref={this.appBar}
					primary-title="Smart Store Manager"
					show-notifications
					notification-count="3"
					show-product-switch
					show-co-pilot>
						<img className="app-bar-logo" src={logo} slot="logo" alt=""/>
						<ui5-avatar slot="profile" image={profile}></ui5-avatar>
				</ui5-shellbar>

				<ui5-popover id="profile-popover" hide-header placement-type="Bottom" horizontal-align="Right">
					<div className="profile-header centered">
						<img src={profile} alt="" className="profile-img"/>
						<ui5-title level="3">Darius Cummings</ui5-title>
						<ui5-label>Store Manager</ui5-label>
					</div>

					<div className="profile-content">

					<ui5-list separators="None">
						<div className="profile-hcb-switch centered">
							<div className="profile-hcb-switch-title">
								<ui5-icon name="sap-icon://palette"></ui5-icon>
								<ui5-label class="profile-hcb-switch-text">Dark Mode</ui5-label>
							</div>
							<ui5-switch ref={this.themeSwitch}></ui5-switch>
						</div>

						<ui5-select ref={this.languageSelect}>
							<ui5-option>DE</ui5-option>
							<ui5-option>BG</ui5-option>
							<ui5-option>EN</ui5-option>
						</ui5-select>

						<ui5-li icon="sap-icon://settings">Settings</ui5-li>
						<ui5-li icon="sap-icon://sys-help">Help</ui5-li>
						<ui5-li icon="sap-icon://log">Sign out</ui5-li>
					</ui5-list>
					</div>
				</ui5-popover>


				<ui5-popover
					id="notifications-popover"
					class="app-bar-notifications-popover"
					placement-type="Bottom"
					horizontal-align="Right"
				>
					<ui5-list id="notificationListTop" header-text="Actions Required">
						<ui5-li-notification
							show-close
							wrap
							heading="Fridge #37 - Temperature too low"
							priority="Medium"
						>
							<ui5-avatar size="XS" initials="FR" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							heading="Smart Store 5 - Temperature too high"
							priority="Medium"
							wrap
							show-close
						>
							<ui5-avatar initials="SS" size="XS" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							heading="Smart Store #1 - Entrance Lamp turned off"
							priority="Medium"
							show-close
							wrap
						>
							<ui5-avatar initials="SS" size="XS" slot="avatar"></ui5-avatar>
						</ui5-li-notification>
					</ui5-list>
				</ui5-popover>
			</div>
		);
	}
}

export default AppBar;