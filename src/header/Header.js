import React, { Component } from "react";

class Header extends Component {

	constructor(props) {
		super(props);

		this.tabContainer = React.createRef();
	}

	componentDidMount() {
		this.tabContainer.current.addEventListener("itemSelect", event => {
			const filterType = event.detail.item.getAttribute("data-filter-type");

			this.props.updateStateAfterFilter(filterType);
		});

	}

	render() {
		return (
			<header className="detail-page-header">
				<div className="detail-page-header-bar">
					<ui5-title>Inventory</ui5-title>
					<ui5-button type="Transparent" icon="sap-icon://action" class="action-button"></ui5-button>
				</div>

				<ui5-tabcontainer fixed collapsed class="detail-page-header-menu" ref={this.tabContainer}>
					<ui5-tab data-filter-type="all" text="All Items" additional-text={this.props.products.length}></ui5-tab>
					<ui5-tab data-filter-type="noPerishable" text="Non-Perishable" additional-text={this.props.nonPerishableCount}></ui5-tab>
					<ui5-tab data-filter-type="perishable" text="Perishable" additional-text={this.props.perishableCount}></ui5-tab>
					<ui5-tab data-filter-type="alerts" text="Alerts" additional-text={this.props.alertCount}></ui5-tab>
				</ui5-tabcontainer>
			</header>
		)
	}
}

export default Header;
