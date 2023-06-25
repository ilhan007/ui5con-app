import React, { Component } from "react";

// UI5 Web Components
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Label";
import Dialog from "@ui5/webcomponents/dist/Dialog";
import "@ui5/webcomponents/dist/Input";
import type Input from "@ui5/webcomponents/dist/Input";

import "@ui5/webcomponents/dist/TextArea";
import type TextArea from "@ui5/webcomponents/dist/TextArea";

import "@ui5/webcomponents/dist/DatePicker";
import type DatePicker from "@ui5/webcomponents/dist/DatePicker";

import "@ui5/webcomponents/dist/Select";
import type Select from "@ui5/webcomponents/dist/Select";


import "@ui5/webcomponents/dist/Option";
import type Option from "@ui5/webcomponents/dist/Option";

import RadioButton from "@ui5/webcomponents/dist/RadioButton";

import { Product } from "../types";

type FilterProps = {
	filter: (value: string) => void,
	createProduct: (product: Product) => void,
	sortDesc: () => void,
	sortAsc: () => void,
	toggleEdit: () => void,
	readonly: boolean | undefined,
}

type FilsterState = {}

class FilterBar extends Component<FilterProps, FilsterState> {
	dialog: React.RefObject<Dialog>;
	nameInput: React.RefObject<Input>;
	priceInput: React.RefObject<Input>;
	locationInput: React.RefObject<TextArea>;
	dateInput: React.RefObject<DatePicker>;
	imageInput: React.RefObject<Input>;
	statusInput: React.RefObject<Select>;
	rbPerishable: React.RefObject<RadioButton>;
	searchInput: React.RefObject<Input>;

	constructor(props: FilterProps) {
		super(props);

		this.dialog = React.createRef<Dialog>();
		this.nameInput = React.createRef<Input>();
		this.priceInput = React.createRef<Input>();
		this.locationInput = React.createRef<TextArea>();
		this.dateInput = React.createRef<DatePicker>();
		this.imageInput = React.createRef<Input>();
		this.statusInput = React.createRef<Select>();
		this.rbPerishable = React.createRef<RadioButton>();
		this.searchInput = React.createRef<Input>();
	}

	componentDidMount() {
		this.searchInput.current!.addEventListener('input', event => {
			const value = (event.target! as Input).value;

			this.props.filter(value);
		});
	}

	openDialog() {
		this.dialog.current!.show();
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

		this.props.createProduct(newEntry);
		this.dialog.current!.close();
	}

	closeDialog() {
		this.dialog.current!.close();
	}

	render() {
		return (
			<div className="details-page-filter-bar">
				<ui5-title level="H3">Products</ui5-title>

				<div className="details-page-filter-bar-actions">
					<ui5-input class="details-page-searchfield" placeholder="Search" ref={this.searchInput}>
						<ui5-icon slot="icon" name="search"></ui5-icon>
					</ui5-input>
					<ui5-button onClick={this.openDialog.bind(this)} design="Emphasized" title="Create Product">Create</ui5-button>
					<ui5-toggle-button onClick={this.props.toggleEdit.bind(this)} pressed={this.props.readonly} icon="edit" design="Emphasized">Edit</ui5-toggle-button>
					<ui5-button onClick={this.props.sortDesc.bind(this)} icon="sort-descending" design="Transparent" title="Sort By Status"></ui5-button>
					<ui5-button onClick={this.props.sortAsc.bind(this)} icon="sort-ascending" design="Transparent" title="Sort By Status"></ui5-button>
					<ui5-button icon="excel-attachment" design="Transparent"></ui5-button>
				</div>

				<ui5-dialog header-text="New product" ref={this.dialog}>
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
							<ui5-textarea ref={this.locationInput} show-exceeded-text maxlength={10}></ui5-textarea>
						</div>

						<div className="dialog-section">
							<ui5-label>Order date:</ui5-label>
							<ui5-date-picker ref={this.dateInput} format-pattern="dd/MM/yyyy"></ui5-date-picker>
						</div>

						<div className="dialog-section">
							<ui5-label>Image URL:</ui5-label>
							<ui5-input ref={this.imageInput} type="URL" placeholder="https://..."></ui5-input>
						</div>

						<div className="dialog-section">
							<ui5-label>Status:</ui5-label>

							<ui5-select ref={this.statusInput}>
								<ui5-option>In-Stock</ui5-option>
								<ui5-option>Re-Stock</ui5-option>
								<ui5-option>Deterioating</ui5-option>
							</ui5-select>
						</div>
						<div className="dialog-section horizontal-flex">
							<ui5-radio-button checked name="perishable" text="Perishable" ref={this.rbPerishable}></ui5-radio-button>
							<ui5-radio-button name="perishable" text="Non-Perishable"></ui5-radio-button>
						</div>
					</div>

					<div slot="footer" className="dialog-footer">
						<ui5-button design="Emphasized" onClick={this.submitNewProduct.bind(this)}>OK</ui5-button>
						<ui5-button onClick={this.closeDialog.bind(this)}>Cancel</ui5-button>
					</div>
				</ui5-dialog>
			</div>
		)
	}
}

export default FilterBar;
