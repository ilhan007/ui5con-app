# Details Page Overview

Lets now have a look in the Details page.
We will try to build a page following some guidelines mentioned in [List Report Floorplan](https://experience.sap.com/fiori-design-web/list-report-floorplan-sap-fiori-element/).

![Details Header](./images/details.png?raw=true "Details Header")

As React is recommending to split your components for an easier maintainability, we will create 2 more components - `Header` and `FilterBar` which represent 2 of the main building blocks of the Details page.

![Details Header](./images/details-splitted.png?raw=true "Details Header")


We will be working with a data set called `product.json` place inside a `data` directory next to the `details` directory for our main component.

`product.json`

```js
[{
	"key": 1,
	"name": "Broccoli",
	"price": "2.99 USD",
	"location": "27 Each, Aisle 3, Section 5",
	"img": "/img/broccolli.png",
	"status": "Deterioating",
	"orderDate": "10/7/2019",
	"perishable": true
},
{
	"key": 2,
	"name": "Tortilla Chips",
	"price": "4.99 USD",
	"location": "35 Each, Aisle 17, Section 5",
	"img": "/img/tortillachips.png",
	"status": "In-Stock",
	"orderDate": "10/7/2019",
	"perishable": false
},
{
	"key": 3,
	"name": "Soap Bars",
	"price": "5.49 USD",
	"location": "3 Each, Aisle 23, Section 21",
	"img": "/img/soap.png",
	"status": "Re-Stock",
	"orderDate": "10/7/2019",
	"perishable": false
},
{
	"key": 4,
	"name": "2% Skim Milk",
	"price": "5.99 USD",
	"location": "27 Each, Aisle 12, Section 3",
	"img": "/img/milk.png",
	"status": "In-Stock",
	"orderDate": "10/7/2019",
	"perishable": true
},
{
	"key": 5,
	"name": "Lettuce",
	"price": "6.79 USD",
	"location": "4 Each, Aisle 3, Section 4",
	"img": "/img/lettuce.png",
	"status": "Re-Stock",
	"orderDate": "10/7/2019",
	"perishable": true
},
{
	"key": 6,
	"name": "Whole Chicken",
	"price": "3.99 /LB",
	"location": "27 Each, Aisle 7, Section 17",
	"img": "/img/chicken.png",
	"status": "In-Stock",
	"orderDate": "10/7/2019",
	"perishable": true
},
{
	"key": 7,
	"name": "Storage Bin",
	"price": "7.99 USD",
	"location": "19 Each, Aisle 27, Section 9",
	"img": "/img/storagebin.png",
	"status": "In-Stock",
	"orderDate": "10/7/2019",
	"perishable": false
},
{
	"key": 8,
	"name": "Electric Kettle",
	"price": "10.99 USD",
	"location": "10 Each, Aisle 14, Section 36",
	"img": "/img/kettle.png",
	"status": "In-Stock",
	"orderDate": "10/7/2019",
	"perishable": false
}]
```


In order to have all resources available, copy [these files](https://github.com/ilhan007/ui5con-app/tree/master/public/img) to your `/public/img` folder.


The `Details` page will have a global state which holds the following information:
-  `products`: - all of the items listed in `data.json` (we will query this set and set the result to the `filteredProducts` )
- `filteredProducts`: currently visibile items in the table (this will be change a lot based on the user interactions)
- `filterType`: the type of the filter that is currently applied to the page

Lets now define a state to our component and add a file for styling it (Details.css).

```js
import React, { Component } from "react";
import "./Detail.css";
import products from "../data/products.json";

// These are the web components that we will be using here
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/TextArea";


class Detail extends Component {
	state = {
		products: [...products],
		filteredProducts: [...products],
		filterType: "all",
	};
}

export default Detail;
```

Lets now render something on the screen. As we mentioned above, we will have 2 components `Header` and `FilterBar` separated in from the `Details`.

Add the following render method to the Detail class.

```html
render() {
	return (
		<div className="detail-page">
			<main className="detail-page-content">
				<ui5-table>
					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
							slot="header"
						>
							Product
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
							slot="header"
						>
							Price
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
							slot="header"
						>
							Location
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
							slot="header"
						>
							Order
						 date</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
							slot="header"
						>
							Image
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column
							header-content
						"
						
						slot="header"
					>
							Status
						</ui5-label>
					</ui5-table-column>

					{
						this.state.filteredProducts.map((item) =>
							<ui5-table-row slot="rows" key={item.key}>
								<ui5-table-cell>
									<ui5-label class="table-cell-content"><b>{item.name}</b></ui5-label>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.price}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.location}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">{item.orderDate}</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">
										<img alt="" className="image-cell" src={process.env.PUBLIC_URL + item.img} />
									</span>
								</ui5-table-cell>
								<ui5-table-cell>
									<span className="table-cell-content">
										<ui5-badge color-scheme="0">{item.status}</ui5-badge>
									</span>
								</ui5-table-cell>
							</ui5-table-row>)
					}
				</ui5-table>
			</main>
		</div>
	)
}
```

We now can see the table displayed in our page. We need to add some styling for the layout of the page to `Detail.css`. An example of styling would be the following:

```css
.detail-page-content {
	padding: 3rem;
}

.table-column-header-content,
.table-cell-content {
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
}

.image-cell {
	height: 3rem;
	width: 3rem;
}
```

Last thing we should do for this page is to style a bit the badge of the status column. We can define a method `getBadgeType` which returns a value to be set to the `color-scheme` property of the badge.

An example of implementation (place it above the class definition):

```js
const getBadgeType = type => {
	switch (type) {
		case "In-Stock":
			return "8";
		case "Deterioating":
			return "2";
		case "Re-Stock":
			return "1";
		default:
			return "0";
	}
}
```

and call this method when binding the `color-scheme` of the badge in last cell of the row:

```html
<ui5-badge color-scheme={getBadgeType(item.status)}>
	{item.status}
</ui5-badge>
```

\* Note: `process.env.PUBLIC_URL` returns an URL to a resource in the `/public` folder

In the end of this step, you should be able to see the following:

![Step 5 finished](./images/Step5.png?raw=true "Step 5 Result")

### [Step #6 - Detail Header](./Step6_Detail_Header.md)
