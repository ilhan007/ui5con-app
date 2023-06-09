import React, { Component } from "react";
// @ts-ignore
import profile from "../img/profile.png";
// @ts-ignore
import logo from "../img/logo.png";

// UI5 Web Components Base
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

// UI5 Web Components
import List from "@ui5/webcomponents/dist/List";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List";
import Switch from "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents/dist/Popover";

import ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import type { ShellBarProfileClickEventDetail, ShellBarNotificationsClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBar";
import ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import type { ShellBarItemClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-fiori/dist/NotificationListItem";

type AppBarProps = {
	tabName: string,
}
class AppBar extends Component<AppBarProps> {	

	appBar: React.RefObject<ShellBar>;
	themeSelect: React.RefObject<List>;
	themeSettingItem: React.RefObject<ShellBarItem>;
	languageSelect: React.RefObject<List>;
	langSettingsItem: React.RefObject<ShellBarItem>;
	rtlSwitch: React.RefObject<Switch>;
	contentDensitySwitch: React.RefObject<Switch>;

	constructor (props: AppBarProps) {
		super(props);
		this.appBar = React.createRef<ShellBar>();
		this.themeSelect = React.createRef<List>();
		this.themeSettingItem = React.createRef<ShellBarItem>();
		this.languageSelect = React.createRef<List>();
		this.langSettingsItem = React.createRef<ShellBarItem>();
		this.rtlSwitch = React.createRef<Switch>();
		this.contentDensitySwitch = React.createRef<Switch>();
	}

	componentDidMount() {
		this.appBar.current!.addEventListener("profile-click", this.onProfileClicked as EventListener);
		this.appBar.current!.addEventListener("notifications-click", this.onNotificationsClicked as EventListener);
		this.languageSelect.current!.addEventListener("selection-change", this.onLangChange.bind(this) as EventListener);
		this.themeSelect.current!.addEventListener("selection-change", this.onThemeChange.bind(this) as EventListener);
		this.langSettingsItem.current!.addEventListener("click", this.onLangSettings.bind(this) as EventListener);
		this.themeSettingItem.current!.addEventListener("click", this.onThemeSettings.bind(this) as EventListener);
		this.rtlSwitch.current!.addEventListener("change", this.onDirChange.bind(this) as EventListener);
		this.contentDensitySwitch.current!.addEventListener("change", this.onContentDensityChange.bind(this) as EventListener);
	}

	onProfileClicked(event: CustomEvent<ShellBarProfileClickEventDetail>) {
		event.preventDefault();
		window["profile-popover"].showAt(event.detail.targetRef);
	}

	onNotificationsClicked(event: CustomEvent<ShellBarNotificationsClickEventDetail>) {
		event.preventDefault();
		window["notifications-popover"].showAt(event.detail.targetRef);
	}

	

	onDirChange(event: CustomEvent) {
		document.body.dir = (event.target as Switch).checked ? "rtl" : "ltr";
		applyDirection();
	}

	onContentDensityChange(event: CustomEvent) {
		if ((event.target as Switch).checked) {
			document.body.classList.add("ui5-content-density-compact");
		} else {
			document.body.classList.remove("ui5-content-density-compact");
		}
	}

	onLangSettings(event: CustomEvent<ShellBarItemClickEventDetail>) {
		event.preventDefault();
		window["lang-settings-popover"].showAt(event.detail.targetRef);
	}

	onLangChange(event: CustomEvent<ListSelectionChangeEventDetail>) {
		const selectedLang = event.detail.selectedItems[0].getAttribute("data-lang");
		setLanguage(selectedLang!);
		window["lang-settings-popover"].close();
	}
	
	onThemeSettings(event: CustomEvent<ShellBarItemClickEventDetail>) {
		event.preventDefault();
		window["theme-settings-popover"].showAt(event.detail.targetRef);
	}

	onThemeChange(event: CustomEvent<ListSelectionChangeEventDetail>) {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme");
		setTheme(selectedTheme!);
		window["theme-settings-popover"].close();
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
						<ui5-title level="H3">Darius Cummings</ui5-title>
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
							wrapping-type="Wrap"
							title-text="Temperature Drop"
							priority="Medium"
						>
							Fridge #487990
							<ui5-avatar background-color="Accent4" initials="TD" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							title-text="Maintenance Overdue"
							priority="Medium"
							wrapping-type="Wrap"
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