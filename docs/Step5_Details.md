# 




Page Overview

Lets now have a look at the Detail page.
We will try to build a page following some guidelines mentioned in [List Report Floorplan](https://experience.sap.com/fiori-design-web/list-report-floorplan-sap-fiori-element/).

![Details Header](./images/details.png?raw=true "Detail Header")

As React is recommending to split your components for an easier maintainability, we will create 2 more components - `Header` and `FilterBar` which represent 2 of the main building blocks of the Detail page.

![Details Header](./images/details-splitted.png?raw=true "Detail Header")


We will be working with a data set called `product.json`, placed inside a `src/data/` directory. (Create `data` directory in `src`).

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
- `filteredProducts`: currently visibile items in the table (this will be changed a lot based on the user interactions)
- `filterType`: the type of the filter that is currently applied to the page

Lets now define a state to our component and add a file for styling it (Detail.js).

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
import "@ui5/webcomponents/dist/Tag";
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

Lets now render something on the screen. As we mentioned above, we will have 2 components `Header` and `FilterBar`, separated from the `Detail`.

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
						>
							Product
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Price
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Location
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Order
						 date</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column-header-content"
						>
							Image
						</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label
							class="table-column
							header-content
						"
					>
							Status
						</ui5-label>
					</ui5-table-column>

					{
						this.state.filteredProducts.map((item) =>
							<ui5-table-row key={item.key}>
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
										<ui5-tag color-scheme="0">{item.status}</ui5-tag>
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

.table-image-cell {
	height: 3rem;
	width: 3rem;
}
```

Last thing we should do for this page is to style a bit the tag of the status column. We can define a method `getTagType` which returns a value to be set to the `color-scheme` property of the tag.

Here is an example of the implementation (place it above the class definition):

```js
const getTagType = type => {
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

and call this method when binding the `color-scheme` of the tag in the last cell of the row:

```html
<ui5-tag color-scheme={getTagType(item.status)}>
	{item.status}
</ui5-tag>
```

\* Note: `process.env.PUBLIC_URL` returns an URL to a resource in the `/public` folder

In the end of this step, you should be able to see the following:

![Step 5 finished](./images/Step5.png?raw=true "Step 5 Result")

### [Step #6 - Detail Header](./Step6_Detail_Header.md)
