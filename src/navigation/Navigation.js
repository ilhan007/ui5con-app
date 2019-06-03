import React, { Component } from "react";

class Navigation extends Component {
	constructor (props) {
		super(props);

		this.nav = React.createRef();
		this._onTabSelected = this.onTabSelected.bind(this);
	}

	componentDidMount() {
		const tabContainer = this.nav.current;

		tabContainer.removeEventListener("itemSelect", this._onTabSelected);
		tabContainer.addEventListener("itemSelect", this._onTabSelected);

		const tabs = [...tabContainer.children];
		
		if (!tabs.length) {
			return;
		}
		
		const urlPath = this.props.history.location.pathname
		const tabToSelect = tabs.filter(tab => tab.getAttribute("data-key") === urlPath);

		(tabToSelect[0] || tabs[0]).selected = true;
	}

	onTabSelected(event){
		const selectedItem = event.detail.item;
		this.props.history.push(selectedItem.getAttribute("data-key"));
	}

	render() {
		return(
			<ui5-tabcontainer ref={this.nav} collapsed fixed show-overflow>
				<ui5-tab data-key="/home" text="Home">
				</ui5-tab>
				<ui5-tab data-key="/products" text="Products">
				</ui5-tab>
			</ui5-tabcontainer>
		);
	}
}

export default Navigation;
