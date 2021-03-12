import React, { Component } from "react";

class Header extends Component {

	constructor(props) {
		super(props);

		this.tabContainer = React.createRef();
	}

	componentDidMount() {
		this.tabContainer.current.addEventListener("tab-select", event => {
			const filterType = event.detail.tab.getAttribute("data-filter-type");

			this.props.tabPress(filterType);
		});
	}

	navBack() {
		this.props.navBack();
	}

	render() {
		return (
			<header className="detail-page-header">
				<div className="detail-page-header-bar">
					<div className="detail-page-header-bar-start">
						<ui5-button
							design="Transparent"
							icon="nav-back"
							class="action-button"
							onClick={this.navBack.bind(this)}
						></ui5-button>
						<ui5-title class="detail-page-header-title">Inventory</ui5-title>
					</div>
					
					<ui5-button design="Transparent" icon="action" class="action-button"></ui5-button>
				</div>

				<ui5-mdk-object-header>
					<ui5-avatar slot="image" initials="I" icon="retail-store"></ui5-avatar>
					<ui5-title level="H2" slot="heading">Smart Store </ui5-title>
					<ui5-title level="H5" slot="heading">Dep #B321</ui5-title>
					<ui5-title level="H5" slot="status">Daily Income: 765 USD </ui5-title>
					<ui5-badge color-scheme="7" slot="statusDescription">OPEN</ui5-badge>
					<ui5-badge slot="tags">Milk</ui5-badge>
					<ui5-badge color-scheme="7" slot="tags">Vegs</ui5-badge>
					<ui5-badge color-scheme="9" slot="tags">Meat</ui5-badge>
					

					<div>
						<ui5-title level="H4">Store Description</ui5-title>
						<br></br>
						<ui5-title level="H6">ID: <ui5-label>HT-100333320o9i3</ui5-label></ui5-title>
						<ui5-title level="H6">Domain: <ui5-label>General purpose products</ui5-label></ui5-title>
						<br></br>
						<ui5-title level="H6">Distributor: <ui5-label>Very Best Screens</ui5-label></ui5-title>
						<ui5-title level="H6">Location:<ui5-label> Chicago, USA, North America</ui5-label></ui5-title>
					</div>
				</ui5-mdk-object-header>

				<ui5-tabcontainer fixed collapsed class="detail-page-header-menu" ref={this.tabContainer} show-overflow>
					<ui5-tab
						// icon="product"
						data-filter-type="all" 
						text="All Products"
						additional-text={this.props.products.length} selected>
					</ui5-tab>
					<ui5-tab-separator></ui5-tab-separator>
					<ui5-tab
						icon="washing-machine"
						data-filter-type="noPerishable"
						text="Non-Perishable"
						additional-text={this.props.nonPerishableCount}>
					</ui5-tab>
					<ui5-tab
						icon="e-care"
						data-filter-type="perishable"
						text="Perishable"
						additional-text={this.props.perishableCount}
						semantic-color="Positive">
					</ui5-tab>
					<ui5-tab
						icon="nutrition-activity"
						data-filter-type="vegs"
						text="Vegs" 
						additional-text={this.props.vegsCount}
						semantic-color="Positive">
					</ui5-tab>
					<ui5-tab
						icon="alert"
						data-filter-type="alerts"
						text="Alerts" 
						additional-text={this.props.alertCount}
						semantic-color="Critical">
					</ui5-tab>
					
				</ui5-tabcontainer>
			</header>
		)
	}
}

export default Header;
