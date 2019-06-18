# Detail Page Adding a new item

Last action we will implement is adding a new item to our list of items.

![Add Item Dialog](./images/add-dialog.png?raw=true "Add Item Dialog")


We will enhance our `FilterBar` component to show a dialog inside.

You can place the following markup anywhere in your Filter Bar's renderer (except top level).

```html
<ui5-dialog header-text="Add a new product" ref={this.dialog}>
	<div className="dialog-content">

		<div className="dialog-section">
			<ui5-label>Product name:</ui5-label>
			<ui5-input ref={this.nameInput}></ui5-input>
		</div>

		<div className="dialog-section">
			<ui5-label>Product price:</ui5-label>
			<ui5-input ref={this.priceInput}></ui5-input>
		</div>

		<div className="dialog-section">
			<ui5-label>Product location:</ui5-label>
			<ui5-textarea ref={this.locationInput} show-exceeded-text max-length="100"></ui5-textarea>
		</div>

		<div className="dialog-section">
			<ui5-label>Order date:</ui5-label>
			<ui5-datepicker ref={this.dateInput}></ui5-datepicker>
		</div>

		<div className="dialog-section">
			<ui5-label>Image URL:</ui5-label>
			<ui5-input ref={this.imageInput} type="URL" placeholder="https://..."></ui5-input>
		</div>

		<div className="dialog-section">
			<ui5-label>Status:</ui5-label>

			<ui5-select ref={this.statusInput}>
				<ui5-li>In-Stock</ui5-li>
				<ui5-li>Re-Stock</ui5-li>
				<ui5-li>Deterioating</ui5-li>
			</ui5-select>
		</div>
		<div className="dialog-section horizontal-flex">
			<ui5-radiobutton selected name="perishable" text="Perishable" ref={this.rbPerishable}></ui5-radiobutton>
			<ui5-radiobutton name="perishable" text="Non-Perishable"></ui5-radiobutton>
		</div>
	</div>

	<div slot="footer" className="dialog-footer">
		<ui5-button type="Emphasized" onClick={this.createProduct.bind(this)}>OK</ui5-button>
		<ui5-button onClick={this.closeDialog.bind(this)}>Cancel</ui5-button>
	</div>
</ui5-dialog>
```

In order to open this dialog, you need to just call the method `.open` on the DOM element `ui5-dialog`. We will do this in the `onClick` handler of the Create `ui5-button`

```html
<ui5-button onClick={this.openDialog.bind(this)} type="Transparent" title="Create Product">Create</ui5-button>
```
```js
openDialog() {
	this.dialog.current.open();
}
```

When OK `ui5-button` is clicked we should create a new item, when the `Cancel` button is clicked we should close the `ui5-dialog`. Closing the `ui5-dialog` is the same as opening it - you just call a single method called `close`. More about the Dialog's API could be seen [here](https://sap.github.io/ui5-webcomponents/playground/components/Dialog/).

```js
closeDialog() {
	this.dialog.current.close();
}
```

As we have defined `ref`s for all of the components inside the `ui5-dialog` we can read all of their current values. Therefore we will create a method called `submitNewProduct` which geathers the information from the fields and calls the `createProduct` passed as a property to the `FilterBar` from the `Detail` component. `createProduct` will modify the state based on the collected information from the input fields.

Lets first pass the property to the `FilterBar` component

```html
<FilterBar
	createProduct={this.createProduct.bind(this)}
	...
/>
```

In the `createProduct` we will receive an object containing all the information for the new item to be added to product list.

```js
createProduct(entry) {
	const newItems = [...this.state.products, { key: (this.state.products.length + 1), ...entry }];

	this.setState({
		...this.state,
		products: newItems,
		filteredProducts: this.filterItems(this.state.filterType, newItems),
	});
}
```

