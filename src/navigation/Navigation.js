import React, { Component } from "react";

class Navigation extends Component {
	constructor (props) {
		super(props);
		this.nav = React.createRef();
	}

	componentDidMount() {
		const tabContainer = this.nav.current;
		const tabs = [...tabContainer.children];
		tabContainer.addEventListener("itemSelect", this.onTabSelected.bind(this));
		const tabToSelect = tabs.filter(tab => tab.getAttribute("data-key") === this.props.history.location.pathname);
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
