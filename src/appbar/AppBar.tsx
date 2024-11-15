import React, { Component } from "react";
// @ts-ignore
import profile from "../img/profile.png";
// @ts-ignore
import logo from "../img/logo.svg";

// UI5 Web Components Base
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

// UI5 Web Components
import type List from "@ui5/webcomponents/dist/List";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List";
import type Switch from "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents/Switch";
import "@ui5/webcomponents/Popover";
import type Popover from "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents-fiori/ShellBar";
import type ShellBar from "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/ShellBarItem";
import type ShellBarItem from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import type { ShellBarProfileClickEventDetail, ShellBarNotificationsClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBar";
import type { ShellBarItemClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents-fiori/NotificationListItem";
import TabContainer, { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer";


setTimezone("Europe/London");

type AppBarProps = {
	tabName: string,
	navigate: (path: string) => void,
}

type AppBarState = {
	tzPopoverOpen?: boolean,
	tzPopoverOpener?: HTMLElement,
}

class AppBar extends Component<AppBarProps, AppBarState> {	

	appBar: React.RefObject<ShellBar>;
	themeSelect: React.RefObject<List>;
	timezoneSelect: React.RefObject<List>;
	timezonePopover: React.RefObject<Popover>;
	themeSettingItem: React.RefObject<ShellBarItem>;
	languageSelect: React.RefObject<List>;
	langSettingsItem: React.RefObject<ShellBarItem>;
	tzSettingItem: React.RefObject<ShellBarItem>;
	rtlSwitch: React.RefObject<Switch>;
	contentDensitySwitch: React.RefObject<Switch>;
	tabContainerRef: React.RefObject<TabContainer>;

	constructor (props: AppBarProps) {
		super(props);
		this.appBar = React.createRef<ShellBar>();
		this.themeSelect = React.createRef<List>();
		this.themeSettingItem = React.createRef<ShellBarItem>();
		this.languageSelect = React.createRef<List>();
		this.timezoneSelect = React.createRef<List>();
		this.timezonePopover = React.createRef<Popover>();
		this.langSettingsItem = React.createRef<ShellBarItem>();
		this.tzSettingItem = React.createRef<ShellBarItem>();
		this.rtlSwitch = React.createRef<Switch>();
		this.contentDensitySwitch = React.createRef<Switch>();
		this.tabContainerRef = React.createRef<TabContainer>();

		this.state = {
			tzPopoverOpen: undefined,
			tzPopoverOpener: undefined,
		};
	}

	componentDidMount() {
		this.appBar.current!.addEventListener("profile-click", this.onProfileClicked as EventListener);
		this.appBar.current!.addEventListener("notifications-click", this.onNotificationsClicked as EventListener);
		this.languageSelect.current!.addEventListener("selection-change", this.onLangChange.bind(this) as EventListener);
		this.timezoneSelect.current!.addEventListener("selection-change", this.onTimezoneChange.bind(this) as EventListener);
		this.timezonePopover.current!.addEventListener("close", this.onTimezonePopoverClose.bind(this) as EventListener);
		this.themeSelect.current!.addEventListener("selection-change", this.onThemeChange.bind(this) as EventListener);
		this.langSettingsItem.current!.addEventListener("click", this.onLangSettings.bind(this) as EventListener);
		this.themeSettingItem.current!.addEventListener("click", this.onThemeSettings.bind(this) as EventListener);
		this.tzSettingItem.current!.addEventListener("click", this.onTimezoneSettings.bind(this) as EventListener);
		this.rtlSwitch.current!.addEventListener("change", this.onDirChange.bind(this) as EventListener);
		this.contentDensitySwitch.current!.addEventListener("change", this.onContentDensityChange.bind(this) as EventListener);

		this.tabContainerRef.current!.addEventListener("tab-select", (event) => {
			const { tab } = (event as CustomEvent<TabContainerTabSelectEventDetail>).detail;
			this.props.navigate(`/${tab.getAttribute("data-navigate")}`);
		});
	}

	onProfileClicked(event: CustomEvent<ShellBarProfileClickEventDetail>) {
		event.preventDefault();
		const profilePopover = window["profile-popover"];
		profilePopover.opener = event.detail.targetRef;
		profilePopover.open = true;
	}

	onNotificationsClicked(event: CustomEvent<ShellBarNotificationsClickEventDetail>) {
		event.preventDefault();
		const notificationsPopover = window["notifications-popover"];
		notificationsPopover.opener = event.detail.targetRef;
		notificationsPopover.open = true;
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
		const langPopover = window["lang-settings-popover"];
		langPopover.opener = event.detail.targetRef;
		langPopover.open = true;
	}

	onLangChange(event: CustomEvent<ListSelectionChangeEventDetail>) {
		const selectedLang = event.detail.selectedItems[0].getAttribute("data-lang");
		setLanguage(selectedLang!);
		window["lang-settings-popover"].open = false;
	}
	
	onThemeSettings(event: CustomEvent<ShellBarItemClickEventDetail>) {
		event.preventDefault();
		const themePopover = window["theme-settings-popover"];
		themePopover.opener = event.detail.targetRef;
		themePopover.open = true;
	}

	onThemeChange(event: CustomEvent<ListSelectionChangeEventDetail>) {
		const selectedTheme = event.detail.selectedItems[0].getAttribute("data-theme");
		setTheme(selectedTheme!);
		window["theme-settings-popover"].open = false;
	}

	onTimezoneChange(event: CustomEvent<ListSelectionChangeEventDetail>) {
		const newTimezone = event.detail.selectedItems[0].getAttribute("data-timezone")!;
		setTimezone(newTimezone);

		this.setState({
			...this.state,
			tzPopoverOpen: undefined,
		});
	}

	onTimezonePopoverClose(event: CustomEvent) {
		this.setState({
			...this.state,
			tzPopoverOpen: undefined,
		});
	}

	onTimezoneSettings(event: CustomEvent<ShellBarItemClickEventDetail>) {
		event.preventDefault();
		window["timezone-settings-popover"].opener = event.detail.targetRef;

		this.setState({
			...this.state,
			tzPopoverOpen: true,
			// tzPopoverOpener: event.detail.targetRef,
		});
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
						<ui5-input slot="searchField"></ui5-input>
						<ui5-avatar slot="profile">
							<img src={profile} className="profile-avatar"  alt="profile"/>
						</ui5-avatar>

						<ui5-shellbar-item id="tzSettingItemId" icon="date-time" text="Timezone" ref={this.tzSettingItem}>
						</ui5-shellbar-item>

						<ui5-shellbar-item icon="globe" text="Language" ref={this.langSettingsItem}>
						</ui5-shellbar-item>

						<ui5-shellbar-item icon="palette" text="Theme" ref={this.themeSettingItem}>
						</ui5-shellbar-item>
				</ui5-shellbar>

				<ui5-tabcontainer collapsed ref={this.tabContainerRef}>
					<ui5-tab text="My Home" data-navigate="" selected={this.props.tabName === "My Home" ? true : undefined}></ui5-tab>
					<ui5-tab text="Inventory" data-navigate="inventory" selected={this.props.tabName === "Inventory" ? true : undefined}></ui5-tab>
					<ui5-tab text="Contact" data-navigate="address" selected={this.props.tabName === "Contact" ? true : undefined}></ui5-tab>
				</ui5-tabcontainer>

				<ui5-popover id="profile-popover" hide-header placement="Bottom" horizontal-align="End">
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
					placement="Bottom"
					horizontal-align="End"
				>
					<ui5-list id="notificationListTop" header-text="Actions Required">
						<ui5-li-notification
							show-close
							wrapping-type="Wrap"
							title-text="Temperature Drop"
							importance="Important"
						>
							Fridge #487990
							<ui5-avatar background-color="Accent4" initials="TD" slot="avatar"></ui5-avatar>
						</ui5-li-notification>

						<ui5-li-notification
							title-text="Maintenance Overdue"
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
					placement="Bottom"
					horizontal-align="End"
					header-text="Language"
					// opener={}
					// open={this.langSettingPopoverOpen}
				>
					<ui5-list ref={this.languageSelect} selection-mode="Single">
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
					id="timezone-settings-popover"
					class="app-bar-timezone-popover"
					placement="Bottom"
					horizontal-align="End"
					header-text="Timezone"
					// opener={this.state.tzPopoverOpener}
					open={this.state.tzPopoverOpen}
					ref={this.timezonePopover}
				>
					<ui5-list ref={this.timezoneSelect} selection-mode="Single">
						<ui5-li icon="globe" data-timezone="Pacific/Honolulu">Pacific/Honolulu</ui5-li>
						<ui5-li icon="globe" data-timezone="America/Los_Angeles">America/Los_Angeles</ui5-li>
						<ui5-li icon="globe" data-timezone="America/New_York">America/New_York</ui5-li>
						<ui5-li icon="globe" selected data-timezone="Europe/London">Europe/London</ui5-li>
						<ui5-li icon="globe" data-timezone="Europe/Sofia">Europe/Sofia</ui5-li>
						<ui5-li icon="globe" data-timezone="Asia/Dubai">Asia/Dubai</ui5-li>
						<ui5-li icon="globe" data-timezone="Asia/Tokyo">Asia/Tokyo</ui5-li>
						<ui5-li icon="globe" data-timezone="Australia/Sydney">Australia/Sydney</ui5-li>
					</ui5-list>
				</ui5-popover>

				<ui5-popover
					id="theme-settings-popover"
					class="app-bar-lang-popover"
					placement="Bottom"
					horizontal-align="End"
					header-text="Theme"
					// opener={}
					// open={this.themeSettingPopoverOpen}
				>
					<ui5-list ref={this.themeSelect} selection-mode="Single">
						<ui5-li icon="palette" selected data-theme="sap_horizon">Morning Horizon</ui5-li>
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