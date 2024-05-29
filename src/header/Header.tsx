import React, { Component } from "react";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import TabContainer, { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer";

import { Product, Filter } from "../types";

type HeaderProps = {
	products: Array<Product>;
	tabPress: (filterType: Filter) => void,
	navBack:  (path?: string) => void,
	perishableCount: number,
	nonPerishableCount: number,
	alertCount: number,
	vegsCount: number,
}

type HeaderState = {}


class Header extends Component<HeaderProps, HeaderState> {

	navBack() {
		this.props.navBack();
	}

	// render() {
	// 	return (
		
		// <header className="detail-page-header">
		// 		<div className="detail-page-header-bar">
		// 			<div className="detail-page-header-bar-start">
		// 				<ui5-button
		// 					design="Transparent"
		// 					icon="nav-back"
		// 					class="action-button"
		// 					onClick={this.navBack.bind(this)}
		// 				></ui5-button>
		// 				<ui5-title class="detail-page-header-title">Inventory</ui5-title>
		// 			</div>

		// 			<ui5-button design="Transparent" icon="action" class="action-button"></ui5-button>
		// 		</div>

		// 		<ui5-tabcontainer collapsed class="detail-page-header-menu" ref={this.tabContainer}>
		// 			<ui5-tab
		// 				// icon="product"
		// 				data-filter-type="all" 
		// 				text="All Products"
		// 				additional-text={this.props.products.length} selected>
		// 			</ui5-tab>
		// 			<ui5-tab-separator></ui5-tab-separator>
		// 			<ui5-tab
		// 				icon="washing-machine"
		// 				data-filter-type="noPerishable"
		// 				text="Non-Perishable"
		// 				additional-text={this.props.nonPerishableCount}>
		// 			</ui5-tab>
		// 			<ui5-tab
		// 				icon="e-care"
		// 				data-filter-type="perishable"
		// 				text="Perishable"
		// 				additional-text={this.props.perishableCount}
		// 				semantic-color="Positive">
		// 			</ui5-tab>
		// 			<ui5-tab
		// 				icon="nutrition-activity"
		// 				data-filter-type="vegs"
		// 				text="Vegs" 
		// 				additional-text={this.props.vegsCount}
		// 				semantic-color="Positive">
		// 			</ui5-tab>
		// 			<ui5-tab
		// 				icon="alert"
		// 				data-filter-type="alerts"
		// 				text="Alerts" 
		// 				additional-text={this.props.alertCount}
		// 				semantic-color="Critical">
		// 			</ui5-tab>
					
		// 		</ui5-tabcontainer>
		// 	</header>
		// )
	// }
}

export default Header;
