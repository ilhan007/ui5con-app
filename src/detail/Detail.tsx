import React, { Component } from "react";

import "./Detail.css";
import { Product, Filter } from "../types";
import products from "../data/products.json";
import FilterBar from "../filterbar/FilterBar";
import Header from "../header/Header";
import TokenReactComponent from "./TokenReactComponent";
// import "@ui5con/components/dist/Tokenizer";

type DetailProps = {
	navigate: (path: string) => void,
}

type DetailState = {
	products: Array<Product>,
	filteredProducts: Array<Product>,
	filterType: Filter,
	readonly: boolean | undefined,
};

const getTagType = (type: string) => {
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
			readonly: true,
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
		// @ts-ignore
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

	toggleEdit() {
		this.setState({
			...this.state,
			readonly: !this.state.readonly ? true : undefined,
		});
	}
	
	deleteTag(productKey: number, tag: string) {
		const product = this.state.products.find(product => product.key === productKey)!;
		product.tags.splice(product.tags.indexOf(tag), 1);

		this.setState({
			...this.state,
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
								toggleEdit={this.toggleEdit.bind(this)}
								readonly={this.state.readonly}
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
									<ui5-label class="table-column-header-content middle">Tags</ui5-label>
								</ui5-table-column>

								<ui5-table-column slot="columns">
									<ui5-label class="table-column-header-content middle">Illustration</ui5-label>
								</ui5-table-column>
								{
									this.state.filteredProducts.map((product: Product) =>
										<ui5-table-row key={product.key}>
											<ui5-table-cell>
												<ui5-label><b>{product.name}</b></ui5-label>
											</ui5-table-cell>
											<ui5-table-cell>
												<ui5-text>{product.price}</ui5-text>
											</ui5-table-cell>
											<ui5-table-cell>
												<ui5-text>{product.location}</ui5-text>
											</ui5-table-cell>
											<ui5-table-cell>
												<ui5-text>{product.orderDate}</ui5-text>
											</ui5-table-cell>
											<ui5-table-cell>
													<ui5-tag design="Set3" color-scheme={getTagType(product.status!)}>{product.status}</ui5-tag>
											</ui5-table-cell>

											<ui5-table-cell class="table-status-cell-content">
												{
												product.tags.map((tag: string, idx: number) => 
													<TokenReactComponent key={idx} productKey={product.key} readonly={this.state.readonly} text={tag} deleteTag={this.deleteTag.bind(this)}/>
												)}
											</ui5-table-cell>
											<ui5-table-cell>
													<img alt="product" className="table-image-cell" src={process.env.PUBLIC_URL + product.img} />
											</ui5-table-cell>
										</ui5-table-row>)
								}
							</ui5-table>
				</main>
			</div>
	}
}

export default Detail;