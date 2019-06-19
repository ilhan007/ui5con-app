# Detail Page Header

It is now time to add a Header component for our Detail Page.
The Header component should look like the following:

![Details Header](./images/details-header.png?raw=true "Details Header")


You should now create a folder called `header` next to your `detail` folder.
After that you can create a file called `Header.js` inside.

![Details Header](./images/header-folder-structure.png?raw=true "Details Header")

An empty `Header` component should looks like this:

```js
import React, { Component } from "react";

class Header extends Component {
	render() {
		return (
			<h1>Hello World</h1>
		)
	}
}

export default Header;
```

To place this component inside the `Detail` component, add a <Header /> tag to Detail's `jsx` (render function).

e.g.

```html
render() {
	return (
		<div className="detail-page">

			<Header />

			<main className="detail-page-content">
			...
```

You now should be able to see the hello world heading above the table.
We will now add the real building blocks of the Header component.

It contains:
- a section that wraps a `ui5-title` and a `ui5-button`
- another section that represents a `ui5-tabcontainer` with 4 `ui5-tab`s inside

```html
render() {
	return (
		<header className="detail-page-header">
			<div className="detail-page-header-bar">

				<ui5-title>Inventory</ui5-title>

				<ui5-button 
					type="Transparent"
					icon="sap-icon://action"
					class="action-button">
				</ui5-button>

			</div>

			<ui5-tabcontainer
				class="detail-page-header-menu"
				fixed
				collapsed
			>
				<ui5-tab text="All Items" additional-text="42"></ui5-tab>
				<ui5-tab text="Non-Perishable" additional-text="42"></ui5-tab>
				<ui5-tab text="Perishable" additional-text="42"></ui5-tab>
				<ui5-tab text="Alerts" additional-text="42"></ui5-tab>
			</ui5-tabcontainer>
		</header>
	)
}
```
Lets add some styles to the `Detail.css` in order to have a better placement for the components:

```css
.detail-page-header-bar {
	height: 6rem;
	padding: 1rem 3rem;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	background: var(--sapUiGroupContentBackground, #ffffff);
}

.detail-page-header-menu {
	border: 1px solid var(--sapUiListTableGroupHeaderBorderColor, #d9d9d9);
}
```
![Details Header Styled](./images/header-before-events.png?raw=true "Details Header Styled")

We should now fire some events when a tab is clicked in order to make our Detail page filter the table.
Furthermore we should pass some properties and visualize them in the tab container such as products, non perishable products count, etc.
Lets pass the properties to the Header from the Details `jsx` render function.


```html
<Header
	products={this.state.products} // "All Items" tab additional text
	nonPerishableCount={this.filterNoPerishableProducts(this.state.products).length} // "None-Perishable" tab additional text
	perishableCount={this.filterPerishableProducts(this.state.products).length} // "Perishable" tab additional text
	alertCount={this.filterAlertProducts(this.state.products).length} // "Alerts" tab additional text
	tabPress={this.applyFilter.bind(this)} // Event listener when a tab is pressed
/>
```

You also need to have methods that get the count of items based on the filter Type. e.g.

```js
filterPerishableProducts(items) {
	return items.filter(product => product.perishable);
}

filterNoPerishableProducts(items) {
	return items.filter(product => !product.perishable);
}

filterAlertProducts(items) {
	return items.filter(product => (product.status === "Deterioating" || product.status === "Re-Stock"));
}
```

We should also add a listener to the pressed tab. It will receive a filter type e.g. "perishable" and update the state of the Detail page.

```js
applyFilter(filterType) {
	const products = this.filterItems(filterType, this.state.products);

	this.setState({
		...this.state,
		filteredProducts: products,
		filterType: filterType,
	});
}

filterItems(filterType, items) {
	let filteredProducts = [];

	switch (filterType) {
		case "all":
			filteredProducts = items;
			break;
		case "noPerishable":
			filteredProducts = this.filterNoPerishableProducts(items);
			break;
		case "perishable":
			filteredProducts = this.filterPerishableProducts(items);
			break;
		case "alerts":
			filteredProducts = this.filterAlertProducts(items);
			break;
		default:
			filteredProducts = items;
			break;
	}

	return filteredProducts;
}
```

We now pass all the correct data to the `Header`. We should now implement what it will display / do based on the passed properties.

Lets first bind the properties to the `tab`s `additional-text` property

\* you can read properties passed to a component by calling `this.props.lpropName` e.g. in our case `this.props.products.length` will return length of the array passed to `this.props.products`;

```html
<ui5-tabcontainer fixed collapsed>
	<ui5-tab text="All Items" additional-text={this.props.products.length}></ui5-tab>
	<ui5-tab text="Non-Perishable" additional-text={this.props.nonPerishableCount}></ui5-tab>
	<ui5-tab text="Perishable" additional-text={this.props.perishableCount}></ui5-tab>
	<ui5-tab text="Alerts" additional-text={this.props.alertCount}></ui5-tab>
</ui5-tabcontainer>
```

Once we have our properties bound to the tabs, we should add the interaction with them.

We've defined that `tabPress`, that will be fired once the user interacts with a tab. It should pass a parameter to the listener - type of the filter. In order to implement such functionality we need to know which tab is pressed in the `ui5-tabcontainer`'s `itemSelect` event.

First of all we will add a `ref` to our `ui5-tabcontainer`.
Refs in React serve for taking a reference to a DOM element.
More about refs you can read [here](https://reactjs.org/docs/refs-and-the-dom.html).

Lets start adding a ref to the `ui5-tabcontainer`:

```js
constructor(props) {
	super(props);

	this.tabContainer = React.createRef(); // creates a referebce for the tab container
}
```

```html
...

<ui5-tabcontainer fixed collapsed class="detail-page-header-menu" ref={this.tabContainer}> // links the ref to the DOM element

...
```

Once we get this ref, we should add an event listener to it in the `componentDidMount` lifecycle hook (More about React's lifecycle hooks can be read [here](https://reactjs.org/docs/react-component.html))

```js
componentDidMount() {
	const tabContainerDomRef = this.tabContainer.current;

	tabContainerDomRef.addEventListener("itemSelect", event => {
		this.props.tabPress( /* We should pass the filter type here */ );
	});
}
```

In order to pass the event filter type, we should somehow mark our `ui5-tab`s with information what filter are they gonna do. As this is just a dom - we can add a custom attribute e.g. `data-filter-type` to our tabs.

```html
<ui5-tab data-filter-type="all" text="All Items" additional-text={this.props.products.length}></ui5-tab>
<ui5-tab data-filter-type="noPerishable" text="Non-Perishable" additional-text={this.props.nonPerishableCount}></ui5-tab>
<ui5-tab data-filter-type="perishable" text="Perishable" additional-text={this.props.perishableCount}></ui5-tab>
<ui5-tab data-filter-type="alerts" text="Alerts" additional-text={this.props.alertCount}></ui5-tab>
```

We can now easy identify which tab corresponds to which filter.

Now we go back to the `itemSelect` implementation and change it to:

```js
this.tabContainer.current.addEventListener("itemSelect", event => {
	const filterType = event.detail.item.getAttribute("data-filter-type");

	this.props.tabPress(filterType);
});
```

![Step 6 result](./images/step6-result.png?raw=true "Step 6 result")


### [Step #7 - Detail Filter Bar](./Step7_Detail_FilterBar.md)
