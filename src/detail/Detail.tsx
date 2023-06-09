import React, { Component, DOMAttributes } from "react";
import FilterBar from "../filterbar/FilterBar";
import Header from "../header/Header";
import "./Detail.css";
import products from "../data/products.json";

import "@ui5/webcomponents/dist/DatePicker.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Badge.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/TextArea.js";

import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/nutrition-activity.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/excel-attachment.js";
import "@ui5/webcomponents-icons/dist/e-care.js";
import "@ui5/webcomponents-icons/dist/retail-store.js";

import { Product, Filter } from "../types";

type DetailProps = {
	navigate: (path: string) => void,
}

type DetailState = {
	products: Array<Product>,
	filteredProducts: Array<Product>,
	filterType: Filter,
};


const getBadgeType = (type: string) => {
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

class Detail extends Component<DetailProps, DetailState> {
	_navigate: (path: string) => void;
	navBack: (path?: string) => void;

	constructor (props: DetailProps) {
		super(props);

		this._navigate = this.props.navigate;
		this.navBack = this._navBack.bind(this);

		this.state = {
			products: [...products] as unknown as Array<Product>,
			filteredProducts: [...products] as unknown as Array<Product>,
			filterType: "all",
		};
	}

	_navBack() {
		this._navigate("/");
	}

	filterPerishableProducts(items: Array<Product>) {
		return items.filter(product => product.perishable);
	}

	filterNoPerishableProducts(items: Array<Product>) {
		return items.filter(product => !product.perishable);
	}

	filterAlertProducts(items: Array<Product>) {
		return items.filter(product => (product.status === "Deterioating" || product.status === "Re-Stock"));
	}

	filterVegsProducts(items: Array<Product>) {
		return items.filter(product => (product.vegs));
	}

	filterItems(filterType: Filter, items: Array<Product>) {
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
			case "vegs":
				filteredProducts = this.filterVegsProducts(items);
				break;
			default:
				filteredProducts = items;
				break;
		}

		return filteredProducts;
	}

	applyFilter(filterType: Filter) {
		const products = this.filterItems(filterType, this.state.products);

		this.setState({
			...this.state,
			filteredProducts: products,
			filterType: filterType,
		});
	}

	createProduct(entry: Product) {
		const newItems: Array<Product> = [...this.state.products, { key: (this.state.products.length + 1), ...entry }];

		this.setState({
			...this.state,
			products: newItems,
			filteredProducts: this.filterItems(this.state.filterType, newItems),
		});
	}

	filterVisibleItemsByText(text: string) {
		const filteredByType = this.filterItems(this.state.filterType, this.state.products);
		const items = filteredByType.filter(item => item.name.toLowerCase().startsWith(text));

		this.setState({
			...this.state,
			filteredProducts: items,
		});
	}

	filter(value: string) {
		this.filterVisibleItemsByText(value);
	}

	get statusCriteriaMapping(): {[x: string]: number} {
		return {
			"In-Stock": 0,
			"Re-Stock": 1,
			"Deterioating": 2,
		}
	}

	sortAsc() {
		const sortedItems = this.state.filteredProducts.sort((a: Product, b: Product) => {
			if (this.statusCriteriaMapping[a.status!] > this.statusCriteriaMapping[b.status!]) {
				return 1;
			} else if (this.statusCriteriaMapping[a.status!] < this.statusCriteriaMapping[b.status!]) {
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
		const sortedItems = this.state.filteredProducts.sort((a: Product, b: Product) => {
			if (this.statusCriteriaMapping[a.status!] > this.statusCriteriaMapping[b.status!]) {
				return -1;
			} else if (this.statusCriteriaMapping[a.status!] < this.statusCriteriaMapping[b.status!]) {
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
		return <div className="detail-page">
				<Header
					products={this.state.products}
					nonPerishableCount={this.filterNoPerishableProducts(this.state.products).length}
					perishableCount={this.filterPerishableProducts(this.state.products).length}
					alertCount={this.filterAlertProducts(this.state.products).length}
					vegsCount={this.filterVegsProducts(this.state.products).length}
					tabPress={this.applyFilter.bind(this)}
					navBack={this.navBack.bind(this)}
				/>
				<main className="detail-page-content">
							<FilterBar
								createProduct={this.createProduct.bind(this)}
								filter={this.filter.bind(this)}
								sortAsc={this.sortAsc.bind(this)}
								sortDesc={this.sortDesc.bind(this)}
							/>

							<ui5-table class="table" no-data-text="No Items available for search criteria" show-no-data>
								<ui5-table-column slot="columns">
									<ui5-label class="table-column-header-content middle">Product</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns">
									<ui5-label class="table-column-header-content middle">Price</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns" min-width="800" popin-text="Location" demand-popin>
									<ui5-label class="table-column-header-content middle">Location</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns" min-width="800" popin-text="Order date" demand-popin>
									<ui5-label class="table-column-header-content middle">Order date</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns">
									<ui5-label class="table-column-header-content middle">Status</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns">
									<ui5-label class="table-column-header-content middle">Illustration</ui5-label>
								</ui5-table-column>
								{
									this.state.filteredProducts.map((item: Product) =>
										// @ts-ignore
										<ui5-table-row key={item.key}>
											<ui5-table-cell>
												<ui5-label class="table-cell-content middle"><b>{item.name}</b></ui5-label>
											</ui5-table-cell>
											<ui5-table-cell>
												<span className="table-cell-content middle">{item.price}</span>
											</ui5-table-cell>
											<ui5-table-cell>
												<span className="table-cell-content middle">{item.location}</span>
											</ui5-table-cell>
											<ui5-table-cell>
												<span className="table-cell-content middle">{item.orderDate}</span>
											</ui5-table-cell>
											<ui5-table-cell>
												<span className="table-cell-content middle">
													<ui5-badge className="table-cell-content-badge" color-scheme={getBadgeType(item.status!)}>{item.status}</ui5-badge>
												</span>
											</ui5-table-cell>
											<ui5-table-cell>
												<span className="table-cell-content middle">
													<img alt="product" className="table-image-cell" src={process.env.PUBLIC_URL + item.img} />
												</span>
											</ui5-table-cell>
										</ui5-table-row>)
								}
							</ui5-table>
				</main>
			</div>
	}
}

export default Detail;