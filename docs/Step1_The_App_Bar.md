# Application bar

Let`s create this beautifull application bar!
![Alt text](./step1.png?raw=true "App bar")

1. Remove the following files (generated by default) as they would not be needed
	- src/index.css
	- src/serviceWorker.js
	- src/logo.svg

2. Remove the usage of those from the ```src/App.js```

	```js 
	import './index.css';
	import * as serviceWorker from './serviceWorker';
	serviceWorker.unregister();
	```

3. We will use the ```ui5-shellbar``` for an app bar, so let`s import it in the ```src/App.js```. The component has several convinient attributes, that we are going to use:

	```js 
	import "@ui5/webcomponents/dist/ShellBar";

	function App() {
		return (
			<ui5-shellbar
				primary-title="Smart Store Manager"
				show-notifications
				show-product-switch
				show-co-pilot>
			</ui5-shellbar>
		);
	}
	```

4. Create "img" folder under "src" and copy the ```logo.png``` and ```profile.png``` files from ```src/images``` from [Sources of Smart Store](https://github.com/ilhan007/ui5con-app/tree/master/src/img)

5. Then, import those images and set them to the ```logo``` and ```profile``` attributes.

	```js 
	import profile from "./img/profile.png";
	import logo from "./img/logo.png";
	import "@ui5/webcomponents/dist/ShellBar";

	function App() {
		return (
			<ui5-shellbar
				primary-title="Smart Store Manager"
				show-notifications
				show-product-switch
				show-co-pilot
				profile={profile}
				logo={logo}>
			</ui5-shellbar>
		);
	}
	```

### [Step #2 - The Home Component](./Step2_The_Home_Component.md)