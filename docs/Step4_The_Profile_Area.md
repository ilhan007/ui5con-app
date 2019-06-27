# Profile Area

What is an admin UI without a profile area? We will create one for our smart store manager and let him change the application theming with one click!

![Alt text](./step4.png?raw=true "Profile Area")

1. We will enhance our app bar for this purpose and make it a separate component. 
- Create `appbar` folder under `src`.
- Create `AppBar.js` in `src/appbar`.
- Create the `Appbar` component.

	```js
	// AppBar.js
	import React, { Component } from "react";
	import profile from "../img/profile.png"; // moved from App.js
	import logo from "../img/logo.png"; // moved from App.js

	class AppBar extends Component {	

		constructor (props) {
			super(props);
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
				</div>
			);
		}
	}

	export default AppBar;
	```

2. Don`t forget to update the `App.js`

	```js
	// App.js
	import "@ui5/webcomponents/dist/ShellBar";
	import "@ui5/webcomponents/dist/Card";
	import "@ui5/webcomponents/dist/Title";
	import "@ui5/webcomponents/dist/Label";
	import "@ui5/webcomponents/dist/List";
	import "@ui5/webcomponents/dist/CustomListItem";
	import "@ui5/webcomponents/dist/StandardListItem";
	

	import Home from "./home/Home";
	import AppBar from './appbar/AppBar'; // use the newly created AppBar component

	function App() => {
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
	```

3. Now, let's add the profile popover. We will use the `ui5-popover` that will open, when the `ui5-shellbar` `profileClick` event is fired, e.g. when someone clicks on the profile image.

- Add ref to the `ui5-shellbar`.
- Bind for the `profileClick` event in the ```componentDidMount```.
- Add the `import "@ui5/webcomponents/dist/Popover";` and `import "@ui5/webcomponents/dist/Label";` imports among the other in `src/App.js`.
- Open the `ui5-popover` in the listener `onProfileClicked`.

	```js
	// AppBar.js
	class AppBar extends Component {	

		constructor (props) {
			super(props);
			this.appBar = React.createRef();
		}

		// Bind for the ui5-shellbar profileClick event
		componentDidMount() {
			this.appBar.current.addEventListener("profileClick", this.onProfileClicked);
		}

		// Open the ui5-popover
		onProfileClicked(event) {
			window["profile-popover"].openBy(event.detail.targetRef);
		}
	```

	```html
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

					<ui5-popover
					id="profile-popover"
					hide-header
					placement-type="Bottom"
					horizontal-align="Right">
						<div className="profile-header centered">
							<img src={profile} alt="" className="profile-img"/>
							<ui5-title level="3">Darius Cummings</ui5-title>
							<ui5-label>Store Manager</ui5-label>
						</div>

						<div className="profile-content">
							<ui5-list separators="None">
								<ui5-li icon="sap-icon://settings">Settings</ui5-li>
								<ui5-li icon="sap-icon://sys-help">Help</ui5-li>
								<ui5-li icon="sap-icon://log">Sign out</ui5-li>
							</ui5-list>
						</div>
					</ui5-popover>
				</div>
			);
		}
	} // end of AppBar
	```

	Now, you should be able to open the profile area by clicking the profile image!

4. Add the theme switch. By default the UI5 WebComponents come with Fiori 3 (known as SAP Quartz), but a high-contrast theme is also supported. To switch to another theme, you can use the framework method `setTheme`  from `@ui5/webcomponents-base/Theming`.
We will use the `ui5-switch` component to switch between Fiori 3 and High Contrast Black.

- Add the `import "@ui5/webcomponents/dist/Switch";` import in `src/App.js`
- Add the `import "@ui5/webcomponents/dist/ThemePropertiesProvider"`; to enable dynamic theme switching
- Add the `import { setTheme } from "@ui5/webcomponents-base/Theming"`; in `src/appbar/AppBar.js`
- Bind for the `ui5-switch` `change` event
- Switch the theme in the event listener `onThemeSwitchPressed`

	```js
	// AppBar.js
	import { setTheme } from "@ui5/webcomponents-base/Theming";

	class AppBar extends Component {	

		constructor (props) {
			super(props);
			this.appBar = React.createRef();
			this.themeSwitch = React.createRef();
		}

		// Bind for the change event of the ui5-switch
		componentDidMount() {
			this.appBar.current.addEventListener("profileClick", this.onProfileClicked);
			this.themeSwitch.current.addEventListener("change", this.onThemeSwitchPressed.bind(this));
		}

		onProfileClicked(event) {
			window["profile-popover"].openBy(event.detail.targetRef);
		}

		// Use the setTheme method to switch to HCB theme
		onThemeSwitchPressed(event) {
			setTheme(event.target.checked ? "sap_belize_hcb" : "sap_fiori_3");
		}
	```


	```html
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

					<ui5-popover
					id="profile-popover"
					hide-header
					placement-type="Bottom"
					horizontal-align="Right">
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
	```

[Step #5 - Detail Page](./Step5_Details.md)
