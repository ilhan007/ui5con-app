# Detail Page Filter Bar

One more step is left to complete our application.
Most of SAP's applications have different options for filtering.
We will now implement a simple filter bar for ordering and adding fields to our table.

Lets add a new component called FilterBar as we already did in the last step.

Once we boostrap it - add it to the `Detail Page`

```html
<Header 
	...
/>

<main className="detail-page-content">

	<FilterBar />

	<ui5-table>
	...
```

![Details Filter Bar](./images/filterbar.png?raw=true "Details Filter Bar")

Our filter bar displays:
 - `ui5-title` Products
 - `ui5-input` with a `ui5-icon` inside so we can compose a search field
 - `ui5-button` Create which opens a `ui5-dialog` for creating an item
 - `ui5-button` for ascending sorting
 - `ui5-button` for descending sorting
 - `ui5-button` with a `sap-icon://excel-attachment` icon


Lets quickly represent the mentioned above with an HTML

```html
render() {
	return (
		<div className="details-page-filter-bar">
			<ui5-title level="H3">Products</ui5-title>

			<div className="details-page-filter-bar-actions">
				<ui5-input class="details-page-searchfield" placeholder="Search">
					<ui5-icon slot="icon" src="sap-icon://search"></ui5-icon>
				</ui5-input>

				<ui5-button design="Transparent" title="Create Product">Create</ui5-button>
				<ui5-button icon="sap-icon://sort-descending" design="Transparent" title="Sort By Status"></ui5-button>
				<ui5-button icon="sap-icon://sort-ascending" design="Transparent" title="Sort By Status"></ui5-button>
				<ui5-button icon="sap-icon://excel-attachment" design="Transparent"></ui5-button>
			</div>
		</div>
	)
}
```

We will again add a few styles in order to prettify our layouting.

```css
.details-page-filter-bar {
	flex-wrap: wrap;
	display: flex;
	justify-content: space-between;
}

.detail-page-header-menu {
	border: 1px solid var(--sapUiListTableGroupHeaderBorderColor, #d9d9d9);
}

.details-page-filter-bar-actions {
	display: flex;
	flex: auto;
	justify-content: flex-end;
	padding-bottom: 0.25rem;
	max-width: 100%;
	flex-wrap: wrap;
}

.details-page-filter-bar-actions > *:not(:last-child) {
	margin-right: 0.25rem;
}

.details-page-searchfield {
	width: auto;
}
```

Once we get the layouting and styles done, lets move to interaction.
We will implement 4 main actions for our component:
- filtering by search criteria
- ordering descending by status
- ordering ascending by status
- creating an item (we will do this in the next step)

As we did in the last step, we should first implement these actions in the `Detail` component and propagate them as properties to the `FilterBar` component.

Lets pass the following in the `Detail`'s `jsx`:

```html
<FilterBar
	filter={this.filter.bind(this)}
	sortAsc={this.sortAsc.bind(this)}
	sortDesc={this.sortDesc.bind(this)}
/>
```

### filter

```js
filterVisibleItemsByText(text) {
	const filteredByType = this.filterItems(this.state.filterType, this.state.products); // filter items based on current filter type
	const items = filteredByType.filter(item => item.name.toLowerCase().startsWith(text)); // filter items based on starting text

	this.setState({
		...this.state,
		filteredProducts: items, // update state of filtered items
	});
}

filter(value) {
	this.filterVisibleItemsByText(value);
}
```


### sortAsc

```js
get statusCriteriaMapping() { // a getter for mapping statuses to numbers (suitable for sorting)
	return {
		"In-Stock": 0,
		"Re-Stock": 1,
		"Deterioating": 2,
	}
}

sortAsc() {
	const sortedItems = this.state.filteredProducts.sort((a, b) => {
		if (this.statusCriteriaMapping[a.status] > this.statusCriteriaMapping[b.status]) {
			return 1;
		} else if (this.statusCriteriaMapping[a.status] < this.statusCriteriaMapping[b.status]) {
			return -1;
		}

		return 0;
	});

	this.setState({
		...this.state,
		filteredProducts: sortedItems,
	});
}
```

### sortDesc

```js
sortDesc() {
	const sortedItems = this.state.filteredProducts.sort((a, b) => {
		if (this.statusCriteriaMapping[a.status] > this.statusCriteriaMapping[b.status]) {
			return -1;
		} else if (this.statusCriteriaMapping[a.status] < this.statusCriteriaMapping[b.status]) {
			return 1;
		}

		return 0;
	});

	this.setState({
		...this.state,
		filteredProducts: sortedItems,
	});
}
```

Once we have all the logic to be applied on the state, we should use the bound properties in the `FilterBar` component and attach the actions to the DOM elements.
We will do this again using the `ref` approach.
For the `ui5-button`s we can use React's native `onClick` handling.

```js
class FilterBar extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
	}

	componentDidMount() {
		this.searchInput.current.addEventListener('input', event => {
			const value = event.target.value;

			this.props.filter(value);
		});
	}
}
```
```html
render() {
	return (
		<div className="details-page-filter-bar">
		<ui5-title level="H3">Products</ui5-title>

		<div className="details-page-filter-bar-actions">
			<ui5-input class="details-page-searchfield" placeholder="Search" ref={this.searchInput} value={this.inputValue}>
				<ui5-icon slot="icon" src="sap-icon://search"></ui5-icon>
			</ui5-input>
			<ui5-button design="Transparent" title="Create Product">Create</ui5-button>
			<ui5-button onClick={this.props.sortDesc.bind(this)} icon="sap-icon://sort-descending" design="Transparent" title="Sort By Status"></ui5-button>
			<ui5-button onClick={this.props.sortAsc.bind(this)} icon="sap-icon://sort-ascending" design="Transparent" title="Sort By Status"></ui5-button>
			<ui5-button icon="sap-icon://excel-attachment" design="Transparent"></ui5-button>
		</div>
		</div>
	)
}
```

![Filtered By Text](./images/filteredbytext.png?raw=true "Filtered By Text")

### [Step #8 - Adding an Item](./Step8_Detail_add_new_item.md)
