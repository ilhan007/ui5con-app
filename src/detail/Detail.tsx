import React, { Component } from "react";

import "./Detail.css";
import { Product, Filter } from "../types";
import products from "../data/products.json";
import FilterBar from "../filterbar/FilterBar";
import TokenReactComponent from "./TokenReactComponent";
// import "@ui5con/components/dist/Tokenizer";
import TabContainer, { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer";


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
	tabContainer	: React.RefObject<TabContainer>;

	constructor (props: DetailProps) {
		super(props);
		this._navigate = this.props.navigate;
		this.navBack = this._navBack.bind(this);

		this.tabContainer = React.createRef<TabContainer>();

		this.state = {
			products: [...products] as unknown as Array<Product>,
			filteredProducts: [...products] as unknown as Array<Product>,
			filterType: "all",
			readonly: true,
		};
	}

	componentDidMount() {
		(this.tabContainer.current as HTMLElement).addEventListener("tab-select", event => {
			const filterType: Filter | null = (event as CustomEvent<TabContainerTabSelectEventDetail>).detail.tab.getAttribute("data-filter-type") as Filter;

			this.applyFilter(filterType);
		});
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
		return <ui5-dynamic-page id="page">
					<ui5-dynamic-page-title slot="titleArea">
						{/* <div slot="breadcrumbs">Special Running Shoe</div> */}
						<ui5-title slot="heading">Special Running Shoe</ui5-title>

						<div slot="snappedHeading" className="snapped-title-heading">
							<ui5-avatar icon="laptop" color-scheme="Accent5" size="S"></ui5-avatar>
							<ui5-title wrapping-type="None">Special Running Shoe</ui5-title>
						</div>

						<ui5-text slot="content" className="text">PO-48865</ui5-text>
						<ui5-text slot="snappedContent" className="text">PO-48865</ui5-text>

						<ui5-tag design="Set2" color-scheme="3">Special offer</ui5-tag>

						<ui5-toolbar id="actionsToolbar" slot="actionsBar">
							<ui5-toolbar-button design="Emphasized" text="Create"></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" text="Edit"></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" text="Delete"></ui5-toolbar-button>
						</ui5-toolbar>

						<ui5-toolbar slot="navigationBar">
							<ui5-toolbar-button design="Transparent" icon="share-2"></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" icon="action-settings"></ui5-toolbar-button>
						</ui5-toolbar>
					</ui5-dynamic-page-title>

					<ui5-dynamic-page-header slot="headerArea">
					<div className="detail-page-header-content">
						<ui5-avatar id="avatar" icon="laptop" color-scheme="Accent5" size="L"></ui5-avatar>
						<div className="detail-page-header-content-cell">
							<ui5-label>Availability</ui5-label>
							<ui5-tag>In Stock</ui5-tag>
						</div>
						<div className="detail-page-header-content-cell">
							<ui5-label>Price</ui5-label>
							<ui5-tag>379.99 USD</ui5-tag>
						</div>
						<div className="detail-page-header-content-cell">
							<ui5-label>Product Description</ui5-label>
							<ui5-text>Super-lightweight cushioning propels you forward from landing to toe-off and has a fast, snappy feel.</ui5-text>
						</div>
					</div>
					
					</ui5-dynamic-page-header>

					<ui5-tabcontainer collapsed class="detail-page-header-menu" ref={this.tabContainer}>
						<ui5-tab movable
							// icon="product"
							data-filter-type="all" 
							text="All Products"
							additional-text={this.state.products.length} selected>
						</ui5-tab>
						<ui5-tab-separator></ui5-tab-separator>
						<ui5-tab
							movable
							icon="washing-machine"
							data-filter-type="noPerishable"
							text="Non-Perishable"
							additional-text={this.filterNoPerishableProducts(this.state.products).length}>
						</ui5-tab>
						<ui5-tab
							movable
							icon="e-care"
							data-filter-type="perishable"
							text="Perishable"
							additional-text={this.filterPerishableProducts(this.state.products).length}
							semantic-color="Positive">
						</ui5-tab>
						<ui5-tab
							movable
							icon="nutrition-activity"
							data-filter-type="vegs"
							text="Vegs" 
							additional-text={this.filterVegsProducts(this.state.products).length}
							semantic-color="Positive">
						</ui5-tab>
						<ui5-tab
							icon="alert"
							data-filter-type="alerts"
							text="Alerts" 
							additional-text={this.filterAlertProducts(this.state.products).length}
							semantic-color="Critical">
						</ui5-tab>
					
					</ui5-tabcontainer>

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
			</ui5-dynamic-page>
	}
}

export default Detail;