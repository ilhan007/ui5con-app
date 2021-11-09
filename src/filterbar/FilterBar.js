import React, { Component } from "react";

class FilterBar extends Component {
	constructor(props) {
		super(props);

		this.dialog = React.createRef();
		this.nameInput = React.createRef();
		this.priceInput = React.createRef();
		this.locationInput = React.createRef();
		this.dateInput = React.createRef();
		this.imageInput = React.createRef();
		this.statusInput = React.createRef();
		this.rbPerishable = React.createRef();
		this.searchInput = React.createRef();
	}

	componentDidMount() {
		this.searchInput.current.addEventListener('input', event => {
			const value = event.target.value;

			this.props.filter(value);
		});
	}

	openDialog() {
		this.dialog.current.show();
	}

	submitNewProduct() {
		const newEntry = {
			name: this.nameInput.current.value,
			price: this.priceInput.current.value,
			location: this.locationInput.current.value,
			img: this.imageInput.current.value,
			status: [].filter.call(this.statusInput.current.children, el => el.selected)[0].textContent,
			orderDate: this.dateInput.current.value,
			perishable: !!this.rbPerishable.current.selected
		}

		this.props.createProduct(newEntry);
		this.dialog.current.close();
	}

	closeDialog() {
		this.dialog.current.close();
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
							<ui5-textarea ref={this.locationInput} show-exceeded-text maxlength="10"></ui5-textarea>
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
							<ui5-radiobutton selected name="perishable" text="Perishable" ref={this.rbPerishable}></ui5-radiobutton>
							<ui5-radiobutton name="perishable" text="Non-Perishable"></ui5-radiobutton>
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
