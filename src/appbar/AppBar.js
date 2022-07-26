import React, { Component } from "react";
import profile from "../img/profile.png";
import logo from "../img/logo.png";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

class AppBar extends Component {	

	constructor (props) {
		super(props);
		this.appBar = React.createRef();
		this.themeSelect = React.createRef();
		this.themeSettingItem = React.createRef();
		this.languageSelect = React.createRef();
		this.langSettingsItem = React.createRef();
		this.rtlSwitch = React.createRef();
		this.contentDensitySwitch = React.createRef();
	}

	componentDidMount() {
		this.appBar.current.addEventListener("profile-click", this.onProfileClicked);
		this.appBar.current.addEventListener("notifications-click", this.onNotificationsClicked);
		this.languageSelect.current.addEventListener("selection-change", this.onLangChange.bind(this));
		this.themeSelect.current.addEventListener("selection-change", this.onThemeChange.bind(this));
		this.langSettingsItem.current.addEventListener("click", this.onLangSettings.bind(this));
		this.themeSettingItem.current.addEventListener("click", this.onThemeSettings.bind(this));
		this.rtlSwitch.current.addEventListener("change", this.onDirChange.bind(this));
		this.contentDensitySwitch.current.addEventListener("change", this.onContentDensityChange.bind(this));
	}

	onProfileClicked(event) {
		event.preventDefault();
		window["profile-popover"].showAt(event.detail.targetRef);
	}

	onNotificationsClicked(event) {
		event.preventDefault();
		window["notifications-popover"].showAt(event.detail.targetRef);
	}

	onThemeChange(event) {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme");
		setTheme(selectedTheme);
	}

	onDirChange(event) {
		document.body.dir = event.target.checked ? "rtl" : "ltr";
		applyDirection();
	}

	onContentDensityChange(event) {
		if (event.target.checked) {
			document.body.classList.add("ui5-content-density-compact");
		} else {
			document.body.classList.remove("ui5-content-density-compact");
		}
	}

	onLangSettings(event) {
		event.preventDefault();
		debugger;
		window["lang-settings-popover"].showAt(event.detail.targetRef);
	}

	onThemeSettings(event) {
		event.preventDefault();
		debugger;
		window["theme-settings-popover"].showAt(event.detail.targetRef);
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
						<img className="app-bar-logo" src={logo} slot="logo" alt="logo"/>
						<ui5-avatar slot="profile">
							<img src={profile} className="profile-avatar"  alt="profile"/>
						</ui5-avatar>

						<ui5-shellbar-item icon="globe" text="Language" ref={this.langSettingsItem}>
						</ui5-shellbar-item>

						<ui5-shellbar-item icon="palette" text="Theme" ref={this.themeSettingItem}>
						</ui5-shellbar-item>
				</ui5-shellbar>

				<ui5-tabcontainer fixed collapsed>
					<ui5-tab text={this.props.tabName}></ui5-tab>
				</ui5-tabcontainer>

				<ui5-popover id="profile-popover" hide-header placement-type="Bottom" horizontal-align="Right">
					<div className="profile-header centered">
						<img src={profile} alt="profile" className="profile-img"/>
						<ui5-title level="3">Darius Cummings</ui5-title>
						<ui5-label>Store Manager</ui5-label>
					</div>
					<div className="profile-content">
						<div className="profile-rtl-switch centered">
							<div className="profile-rtl-switch-title">
								<ui5-label class="profile-rtl-switch-text">RTL</ui5-label>
							</div>
							<ui5-switch ref={this.rtlSwitch}></ui5-switch>
						</div>

						<div className="profile-rtl-switch centered">
							<div className="profile-rtl-switch-title">
								<ui5-label class="profile-rtl-switch-text">Compact</ui5-label>
							</div>
							<ui5-switch ref={this.contentDensitySwitch}></ui5-switch>
						</div>

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
							<ui5-avatar background-color="Accent4" initials="TD" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							heading="Maintenance Overdue"
							priority="Medium"
							wrap
							show-close
						>
							Fridge #603432
							<ui5-avatar background-color="Accent7" initials="MO" slot="avatar"></ui5-avatar>
						</ui5-li-notification>
						
					</ui5-list>
				</ui5-popover>

				<ui5-popover
					id="lang-settings-popover"
					class="app-bar-lang-popover"
					placement-type="Bottom"
					horizontal-align="Right"
					header-text="Language"
				>
					<ui5-list ref={this.languageSelect} mode="SingleSelect">
						<ui5-li icon="globe" data-lang="ar">Arabic</ui5-li>
						<ui5-li icon="globe" data-lang="bg">Bulgarian</ui5-li>
						<ui5-li icon="globe" data-lang="zh_CN">Chinese</ui5-li>
						<ui5-li icon="globe" data-lang="de">German</ui5-li>
						<ui5-li icon="globe" data-lang="en" selected>English</ui5-li>
						<ui5-li icon="globe" data-lang="es">Spanish</ui5-li>
						<ui5-li icon="globe" data-lang="iw">Hebrew</ui5-li>
					</ui5-list>
				</ui5-popover>

				<ui5-popover
					id="theme-settings-popover"
					class="app-bar-lang-popover"
					placement-type="Bottom"
					horizontal-align="Right"
					header-text="Theme"
				>
					<ui5-list ref={this.themeSelect} mode="SingleSelect">
						<ui5-li icon="palette" data-theme="sap_horizon">Morning Horizon</ui5-li>
						<ui5-li icon="palette" data-theme="sap_horizon_dark">Evening Horizon</ui5-li>
						<ui5-li icon="palette" data-theme="sap_horizon_hcb">Horizon HCB</ui5-li>
						<ui5-li icon="palette" data-theme="sap_horizon_hcw">Horizon HCW</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3">Quartz Light</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3_dark">Quartz Dark</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3_hcb">Quartz HCB</ui5-li>
						<ui5-li icon="palette" data-theme="sap_fiori_3_hcw">Quartz HCW</ui5-li>
						<ui5-li icon="palette" data-theme="redfish">Red Fish</ui5-li>
					</ui5-list>
				</ui5-popover>
			</div>
		);
	}
}

export default AppBar;