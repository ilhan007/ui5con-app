import React, { Component } from "react";
import "./Inventory.css";

import { Product, Filter } from "../types";
import products from "../data/products.json";
import TableFilterBar from "../table/TableFilterBar";
import TokenizerReactComponent from "./TokenizerReactComponent";
// import "@ui5con/components/dist/Tokenizer";

import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement";
import "@ui5/webcomponents/Input";
import "@ui5/webcomponents/TextArea";
import "@ui5/webcomponents/DateTimePicker";
import "@ui5/webcomponents/Select";
import "@ui5/webcomponents/dist/Option";
import "@ui5/webcomponents/Token";
import "@ui5/webcomponents/Tokenizer";
import TabContainer, { TabContainerTabSelectEventDetail, TabContainerMoveEventDetail } from "@ui5/webcomponents/dist/TabContainer";
import type Dialog from "@ui5/webcomponents/dist/Dialog";
import type DateTimePicker from "@ui5/webcomponents/dist/DateTimePicker";
import type Input from "@ui5/webcomponents/dist/Input";
import type Select from "@ui5/webcomponents/dist/Select";
import type Option from "@ui5/webcomponents/dist/Option";
import type TextArea from "@ui5/webcomponents/dist/TextArea";
import type Token from "@ui5/webcomponents/dist/Token";
import type Tokenizer from "@ui5/webcomponents/dist/Tokenizer";
import type { TokenizerTokenDeleteEventDetail } from "@ui5/webcomponents/dist/Tokenizer";

import RadioButton from "@ui5/webcomponents/dist/RadioButton";
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

class Inventory extends Component<DetailProps, DetailState> {
	_navigate: (path: string) => void;

	tabContainer: React.RefObject<TabContainer>;
	dialog: React.RefObject<Dialog>;
	nameInput: React.RefObject<Input>;
	priceInput: React.RefObject<Input>;
	locationInput: React.RefObject<TextArea>;
	dateInput: React.RefObject<DateTimePicker>;
	htmlForm: React.RefObject<HTMLFormElement>;
	imageInput: React.RefObject<Input>;
	statusInput: React.RefObject<Select>;
	rbPerishable: React.RefObject<RadioButton>;
	searchInput: React.RefObject<Input>;

	constructor (props: DetailProps) {
		super(props);
		this._navigate = this.props.navigate;

		this.tabContainer = React.createRef<TabContainer>();
		this.dialog = React.createRef<Dialog>();
		this.htmlForm = React.createRef<HTMLFormElement>();
		this.dialog = React.createRef<Dialog>();
		this.nameInput = React.createRef<Input>();
		this.priceInput = React.createRef<Input>();
		this.locationInput = React.createRef<TextArea>();
		this.dateInput = React.createRef<DateTimePicker>();
		this.imageInput = React.createRef<Input>();
		this.statusInput = React.createRef<Select>();
		this.rbPerishable = React.createRef<RadioButton>();
		this.searchInput = React.createRef<Input>();

		this.state = {
			products: [...products] as unknown as Array<Product>,
			filteredProducts: [...products] as unknown as Array<Product>,
			filterType: "all",
			readonly: true,
		};
	}

	componentDidMount() {

		const currTabContainer = (this.tabContainer.current as HTMLElement);

		currTabContainer.addEventListener("tab-select", event => {
			const filterType: Filter | null = (event as CustomEvent<TabContainerTabSelectEventDetail>).detail.tab.getAttribute("data-filter-type") as Filter;

			this.applyFilter(filterType);
		});

		currTabContainer.addEventListener("move-over", (event) => {
			const { source } = (event as CustomEvent<TabContainerMoveEventDetail>).detail;
		
			if (currTabContainer.contains(source.element)) {
				event.preventDefault();
			}
		});
		
		currTabContainer.addEventListener("move", (event) => {
			const { source, destination } = (event as CustomEvent<TabContainerMoveEventDetail>).detail;
			const currentParent = destination.element.parentElement!;
		
			if (destination.placement === MovePlacement.Before) {
				currentParent.insertBefore(source.element, destination.element);
			} else if (destination.placement === MovePlacement.After) {
				const nextElement = Array.from(currentParent.children).at(Array.from(currentParent.children).indexOf(destination.element) + 1)!;
				currentParent.insertBefore(source.element, nextElement);
			} else if (destination.placement === MovePlacement.On) {
				destination.element.prepend(source.element);
			}
		
			const newParent = source.element.parentElement!;
		
			if (newParent.hasAttribute("ui5-tab")) {
				source.element.slot = "items";
			} else {
				source.element.slot = "";
			}
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

	openDialog() {
		this.dialog.current!.open = true;
	}
	closeDialog() {
		this.dialog.current!.open = false;
	}

	submitNewProduct() {
		// @ts-ignore
		const newEntry: Product = {
			name: this.nameInput.current!.value,
			price: this.priceInput.current!.value,
			location: this.locationInput.current!.value,
			img: this.imageInput.current!.value,
			status: (Array.from(this.statusInput.current!.children as unknown as Array<Option>)).filter((el: Option) => el.selected)[0].textContent!,
			tags: [],
			orderDate: this.dateInput.current!.value,
			perishable: !!this.rbPerishable.current!.checked,
		}


		const validInput: boolean = this.htmlForm.current!.reportValidity();
		if (validInput) {
			this.createProduct(newEntry);
			this.dialog.current!.open = false;
		}	
	}

	


	render() {
		return <ui5-dynamic-page id="page" class="detail-page">
					{/* Title */}
					<ui5-dynamic-page-title slot="titleArea">
						<ui5-title slot="heading">Inventory</ui5-title>

						<div slot="snappedHeading" className="detail-page-snapped-title-heading">
							<ui5-avatar icon="retail-store" color-scheme="Accent5" size="S"></ui5-avatar>
							<ui5-title wrapping-type="None">Inventory</ui5-title>
						</div>

						<ui5-text slot="subheading">Smart Store Dep B321</ui5-text>
						<ui5-text slot="snappedSubheading">Smart Store Dep B321</ui5-text>
						
						<ui5-tag design="Set2" color-scheme="3">Store-48865</ui5-tag>

						<ui5-toolbar id="actionsToolbar" slot="actionsBar">
							<ui5-toolbar-button design="Emphasized" text="Create" onClick={this.openDialog.bind(this)}></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" text="Edit" onClick={this.toggleEdit.bind(this)}></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" text="Delete"></ui5-toolbar-button>
						</ui5-toolbar>

						<ui5-toolbar slot="navigationBar">
							<ui5-toolbar-button design="Transparent" icon="share-2"></ui5-toolbar-button>
							<ui5-toolbar-button design="Transparent" icon="action-settings"></ui5-toolbar-button>
						</ui5-toolbar>
					</ui5-dynamic-page-title>

					{/* Header */}
					<ui5-dynamic-page-header slot="headerArea">
						<div className="detail-page-header-content">
							<ui5-avatar id="avatar" icon="retail-store" color-scheme="Accent5" size="L"></ui5-avatar>
							<div className="detail-page-header-content-cell">
								<ui5-label>Availability</ui5-label>
								<ui5-tag design="Set2" color-scheme="3">Good</ui5-tag>
							</div>
							<div className="detail-page-header-content-cell">
								<ui5-label>Alerts</ui5-label>
								<ui5-tag design="Set2" color-scheme="1">11 products</ui5-tag>
							</div>
							<div className="detail-page-header-content-cell">
								<ui5-label>Summary</ui5-label>
								<ui5-text>The store has good availability, but some products are deterioating and need attention.</ui5-text>
							</div>
						</div>
					</ui5-dynamic-page-header>

					{/* Navigation */}
					<ui5-tabcontainer collapsed class="detail-page-header-menu" ref={this.tabContainer}>
						<ui5-tab
							movable
							icon="product"
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
							movable
							icon="alert"
							data-filter-type="alerts"
							text="Alerts" 
							additional-text={this.filterAlertProducts(this.state.products).length}
							semantic-color="Critical">
						</ui5-tab>
					
					</ui5-tabcontainer>

					{/* Content */}
					<main className="detail-page-content">
								<TableFilterBar
									filter={this.filter.bind(this)}
									sortAsc={this.sortAsc.bind(this)}
									sortDesc={this.sortDesc.bind(this)}
									toggleEdit={this.toggleEdit.bind(this)}
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
														<TokenizerReactComponent readonly={this.state.readonly} tags={product.tags} productKey={product.key} deleteTag={this.deleteTag.bind(this)}/>
												</ui5-table-cell>
												<ui5-table-cell>
														<img alt="product" className="table-image-cell" src={process.env.PUBLIC_URL + product.img} />
												</ui5-table-cell>
											</ui5-table-row>)
									}
								</ui5-table>
					</main>

					{/* Create Dialog */}
					<ui5-dialog header-text="New product" ref={this.dialog}>

						<form ref={this.htmlForm} method="get" className="dialog-content">
							<ui5-form layout="S2 M2 L2 XL2" label-span="S12 M12 L4 XL4">
								<ui5-form-item column-span="2">
									<ui5-label slot="labelContent" required for="inpName">Name:</ui5-label>
									<ui5-input id="inpName" ref={this.nameInput} required></ui5-input>
								</ui5-form-item>

								<ui5-form-item column-span="2">
									<ui5-label slot="labelContent" for="inpLocation">Location:</ui5-label>
									<ui5-textarea id="inpLocation" ref={this.locationInput} show-exceeded-text maxlength={10}></ui5-textarea>
								</ui5-form-item>

								<ui5-form-item>
									<ui5-label slot="labelContent" required for="inpPrice">Price:</ui5-label>
									<ui5-input id="inpPrice" ref={this.priceInput} required></ui5-input>
								</ui5-form-item>


								<ui5-form-item>
									<ui5-label slot="labelContent" for="inpOrder">Order date:</ui5-label>
									<ui5-datetime-picker id="inpOrder" ref={this.dateInput} format-pattern="dd/MM/yyyy, HH:mm:ss"></ui5-datetime-picker>
								</ui5-form-item>

								<ui5-form-item>
									<ui5-label slot="labelContent" for="imgUrl">Image URL:</ui5-label>
									<ui5-input id="imgUrl" ref={this.imageInput} type="URL" placeholder="https://..."></ui5-input>
								</ui5-form-item>

								<ui5-form-item >
									<ui5-label slot="labelContent" for="selStatus">Status:</ui5-label>

									<ui5-select id="selStatus" ref={this.statusInput}>
										<ui5-option>In-Stock</ui5-option>
										<ui5-option>Re-Stock</ui5-option>
										<ui5-option>Deterioating</ui5-option>
									</ui5-select>
								</ui5-form-item>

								<ui5-form-item column-span="2">
									<ui5-radio-button checked name="perishable" text="Perishable" ref={this.rbPerishable}></ui5-radio-button>
									<ui5-radio-button name="perishable" text="Non-Perishable"></ui5-radio-button>
								</ui5-form-item>
							</ui5-form>
						</form>

						<div slot="footer" className="dialog-footer">
							<ui5-button design="Emphasized" onClick={this.submitNewProduct.bind(this)} type="Submit">OK</ui5-button>
							<ui5-button onClick={this.closeDialog.bind(this)}>Cancel</ui5-button>
						</div>
					</ui5-dialog>
				</ui5-dynamic-page>
	}
}

export default Inventory;