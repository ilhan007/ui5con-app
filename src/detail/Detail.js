import React, { Component } from "react";
import FilterBar from "../filterbar/FilterBar.js";
import Header from "../header/Header.js";
import "./Detail.css";
import products from "../data/products.json";

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

class Detail extends Component {
	state = {
		products: [...products],
		filteredProducts: [...products],
		filterType: "all",
	};

	filterPerishableProducts(items) {
		return items.filter(product => product.perishable);
	}

	filterNoPerishableProducts(items) {
		return items.filter(product => !product.perishable);
	}

	filterAlertProducts(items) {
		return items.filter(product => (product.status === "Deterioating" || product.status === "Re-Stock"));
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

	applyFilter(filterType) {
		const products = this.filterItems(filterType, this.state.products);

		this.setState({
			...this.state,
			filteredProducts: products,
			filterType: filterType,
		});
	}

	createProduct(entry) {
		const newItems = [...this.state.products, { key: (this.state.products.length + 1), ...entry }];

		this.setState({
			...this.state,
			products: newItems,
			filteredProducts: this.filterItems(this.state.filterType, newItems),
		});
	}

	filterVisibleItemsByText(text) {
		const filteredByType = this.filterItems(this.state.filterType, this.state.products);
		const items = filteredByType.filter(item => item.name.toLowerCase().startsWith(text));

		this.setState({
			...this.state,
			filteredProducts: items,
		});
	}

	filter(value) {
		this.filterVisibleItemsByText(value);
	}

	get statusCriteriaMapping() {
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

	render() {
		return (
			<div className="detail-page">
				<Header
					products={this.state.products}
					nonPerishableCount={this.filterNoPerishableProducts(this.state.products).length}
					perishableCount={this.filterPerishableProducts(this.state.products).length}
					alertCount={this.filterAlertProducts(this.state.products).length}
					tabPress={this.applyFilter.bind(this)}
				/>
				<main className="detail-page-content">

					<FilterBar
						createProduct={this.createProduct.bind(this)}
						filter={this.filter.bind(this)}
						sortAsc={this.sortAsc.bind(this)}
						sortDesc={this.sortDesc.bind(this)}
					/>

					<ui5-table class="items-table" no-data-text="No Items available for search criteria" show-no-data>
						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Product</ui5-label>
						</ui5-table-column>

						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Price</ui5-label>
						</ui5-table-column>

						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Location</ui5-label>
						</ui5-table-column>

						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Order date</ui5-label>
						</ui5-table-column>

						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Image</ui5-label>
						</ui5-table-column>

						<ui5-table-column slot="columns">
							<ui5-label class="table-column-header-content">Status</ui5-label>
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
											<ui5-badge color-scheme={getBadgeType(item.status)}>{item.status}</ui5-badge>
										</span>
									</ui5-table-cell>
								</ui5-table-row>)
						}
					</ui5-table>
				</main>
			</div>
		)
	}
}

export default Detail;
