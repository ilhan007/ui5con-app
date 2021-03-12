import React, { Component } from "react";
import profile from "../img/profile.png";
import logo from "../img/logo.png";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
class AppBar extends Component {	

	constructor (props) {
		super(props);
		this.appBar = React.createRef();
		this.themeSelect = React.createRef();
		this.themeSettingItem = React.createRef();
		this.languageSelect = React.createRef();
		this.langSettingsItem = React.createRef();
	}

	componentDidMount() {
		this.appBar.current.addEventListener("profile-click", this.onProfileClicked);
		this.appBar.current.addEventListener("notifications-click", this.onNotificationsClicked);
		this.languageSelect.current.addEventListener("selection-change", this.onLangChange.bind(this));
		this.themeSelect.current.addEventListener("selection-change", this.onThemeChange.bind(this));
		this.langSettingsItem.current.addEventListener("item-click", this.onLangSettings.bind(this));
		this.themeSettingItem.current.addEventListener("item-click", this.onThemeSettings.bind(this));
	}

	onProfileClicked(event) {
		event.preventDefault();
		window["profile-popover"].openBy(event.detail.targetRef);
	}

	onNotificationsClicked(event) {
		event.preventDefault();
		window["notifications-popover"].openBy(event.detail.targetRef);
	}

	onThemeChange(event) {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme");
		setTheme(selectedTheme);
	}

	onLangSettings(event) {
		event.preventDefault();
		window["lang-settings-popover"].openBy(event.detail.targetRef);
	}

	onThemeSettings(event) {
		event.preventDefault();
		window["theme-settings-popover"].openBy(event.detail.targetRef);
	}

	onLangChange(event) {
		const selectedLang = event.detail.selectedItems[0].getAttribute("data-lang");
		setLanguage(selectedLang);
	}

	render() {
		return (
			<div className="app-bar">
				<ui5-shellbar
					ref={this.appBar}
					primary-title="Smart Store Manager"
					show-notifications
					notification-count="2"
					show-product-switch
					show-co-pilot>
						<img className="app-bar-logo" src={logo} slot="logo" alt=""/>
						<ui5-avatar slot="profile" image={profile}></ui5-avatar>

						<ui5-shellbar-item icon="globe" text="Language" ref={this.langSettingsItem}>
						</ui5-shellbar-item>

						<ui5-shellbar-item icon="palette" text="Theme" ref={this.themeSettingItem}>
						</ui5-shellbar-item>
				</ui5-shellbar>

				<ui5-popover id="profile-popover" hide-header placement-type="Bottom" horizontal-align="Right">
					<div className="profile-header centered">
						<img src={profile} alt="" className="profile-img"/>
						<ui5-title level="3">Darius Cummings</ui5-title>
						<ui5-label>Store Manager</ui5-label>
					</div>
					<div className="profile-content">

						<ui5-list separators="None">
							<ui5-li icon="settings">Settings</ui5-li>
							<ui5-li icon="sys-help">Help</ui5-li>
							<ui5-li icon="log">Sign out</ui5-li>
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
							heading="Temperature Drop"
							priority="Medium"
						>
							Fridge #487990
							<ui5-avatar size="TD" initials="FR" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							heading="Maintenance Overdue"
							priority="Medium"
							wrap
							show-close
						>
							Fridge #603432
							<ui5-avatar initials="MO" size="XS" slot="avatar"></ui5-avatar>
						</ui5-li-notification>
						
					</ui5-list>
				</ui5-popover>

				<ui5-popover id="lang-settings-popover" class="app-bar-lang-popover"
					horizontal-align="left"
					placement-type="Bottom">
					<ui5-list ref={this.languageSelect} mode="SingleSelect">
						<ui5-li icon="globe" data-lang="bg">Bulgarian</ui5-li>
						<ui5-li icon="globe" data-lang="zh_CN">Chinese</ui5-li>
						<ui5-li icon="globe" data-lang="de">German</ui5-li>
						<ui5-li icon="globe" data-lang="en" selected>English</ui5-li>
						<ui5-li icon="globe" data-lang="es">Spanish</ui5-li>
					</ui5-list>
				</ui5-popover>

				<ui5-popover id="theme-settings-popover" class="app-bar-lang-popover"
					horizontal-align="left"
					placement-type="Bottom">
					<ui5-list ref={this.themeSelect} mode="SingleSelect">
						<ui5-li icon="palette" selected data-theme="sap_fiori_3">Quartz Light</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3_dark">Quartz Dark</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3_hcb">Quartz HCB</ui5-li>
						<ui5-li icon="palette" data-theme="cocacola">Coca Cola</ui5-li>
					</ui5-list>
				</ui5-popover>

			</div>
		);
	}
}

export default AppBar;