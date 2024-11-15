# Home component

In this step we will make use of ```ui5-card``` as main building block for our home view. We will create the "Featured" section. As you can see below, it consists of two "cards" - "Inventory" and "Security". Each of them has a header and content section with a list of important information.

![Alt text](./step2.png?raw=true "Home")

1. Create `home` folder under `src`.

2. Create `Home.js` file under `src/home/`.

3. Copy the `data.json` file in `src/home/`
from [Sources of Smart Store](https://github.com/ilhan007/ui5con-app/blob/master/src/home/). The file has some mockup data, that we will need to fill into the cards.

4. Import the `ui5-card` (and other components) in `src/App.js` to have all UI5 WebComponents imported at one place.

	```js 
	// App.js
	import profile from "./img/profile.png";
	import logo from "./img/logo.svg";
	import "@ui5/webcomponents-fiori/dist/ShellBar";
	import "@ui5/webcomponents/dist/Card";
	import "@ui5/webcomponents/dist/CardHeader";
	import "@ui5/webcomponents/dist/Title";
	import "@ui5/webcomponents/dist/Label";
	import "@ui5/webcomponents/dist/List";
	import "@ui5/webcomponents/dist/CustomListItem";
	import "@ui5/webcomponents/dist/StandardListItem";
	```

5. Let's start with the "Featured" section.
Create the `Home` component in `src/home/Home.js`. Note that we import the `data.json` and set its content to the component state, so we can later use it.

	```js
	// Home.js
	import React, { Component } from "react";
	import data from "./data.json";

	class Home extends Component {

		constructor (props) {
			super(props);
			this.state = {data};
		}

		render(){
			const data = this.state.data;

			return(
				<div className="app-content">
					{/* Featured */}
					<ui5-title level="H3">Featured</ui5-title>
					<section className="section">
					</section>
				</div>
			);
		}
	}

	export default Home;
	```

6. Now, let's add the `ui5-card`. We will also use `ui5-list` (List) and `ui5-li` (StandardListItem) for the `ui5-card` content. 
You can get familiar with the API of those components - [Card API](https://sap.github.io/ui5-webcomponents/playground/components/Card/) and [List API](https://sap.github.io/ui5-webcomponents/playground/components/List/). What is going below?
We are just using the API of the UI5 WebComponents ("heading", "subtitle" and "status") and the JSX syntax to map the data and the cards will render nicely.

	```html
	return(
		<div className="app-content">

			<ui5-title level="H3">Featured</ui5-title>
			<section className="section">
			{data.featured.map((dataObj, index) => 
			<ui5-card
				key={dataObj.key}
				class="ui5card">

                                <ui5-card-header
                                    ref={ref => this.featuredCardsRefs[index] = ref}
                                    interactive
                                    status={dataObj.status}
                                    title-text={dataObj.heading}
                                    subtitle-text={dataObj.subtitle}
                                    slot="header"
                                ></ui5-card-header>

			        <ui5-list separators="Inner">
					{dataObj.items.map(item =>
					   <ui5-li
						key={item.key}
						icon={item.icon}
						description={item.description}
						info={item.info}
						info-state={item.infoState}
						class="ui5list-item">{item.title}</ui5-li>
					)}
				</ui5-list>
			</ui5-card>
			)}
			</section>
		</div>
	);
	```

7. Import the `Home` component into the `src/App.js` (note that we added an outer DIV element as React component always should return a single element). You should be able to see the cards with data inside.  OK, the cards are currently expanded to full width and the layout does not look like the picture in the begining - we will handle it in the following step.
	```js 
	// App.js
	import profile from "./img/profile.png";
	import logo from "./img/logo.png";
	import "@ui5/webcomponents-fiori/dist/ShellBar";
	import "@ui5/webcomponents/dist/Card";
	import "@ui5/webcomponents/dist/Title";
	import "@ui5/webcomponents/dist/Label";
	import "@ui5/webcomponents/dist/List";
	import "@ui5/webcomponents/dist/CustomListItem";
	import "@ui5/webcomponents/dist/StandardListItem";
	import Home from "./home/Home";

	function App() {
		return (
			<div className="App">
				<ui5-shellbar
					primary-title="Smart Store Manager"
					show-notifications
					notification-count="3"
					show-product-switch
					show-co-pilot>
						<img className="app-bar-logo" src={logo} slot="logo"/>
						<ui5-avatar slot="profile" image={profile}></ui5-avatar>
				</ui5-shellbar>

				<Home />
			</div>
		);
	}
	```

8. The layouting and ordering of the cards is responsibility of the app developer. Replace the content of `src/App.css` with the content of [Sources of Smart Store](https://github.com/ilhan007/ui5con-app/blob/master/src/App.css). Nothing magical, we make use of `display:flex` for the layouting and setting some `min-width` to the `ui5-card`.

9. You can copy the rest of the sections in the `Home` component from [Sources of Smart Store (Home.js)](https://github.com/ilhan007/ui5con-app/blob/master/src/home/Home.js), but don`t forget to copy all the UI5 components imports from the [Sources of Smart Store (App.js)](https://github.com/ilhan007/ui5con-app/blob/master/src/App.js) as some of them are used in these cards.

### [Step #3 - The Routing](./Step3_The_Routing.md)
