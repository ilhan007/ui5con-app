import React, { Component } from "react";

class Navigation extends Component {
	constructor (props) {
		super(props);
		this.nav = React.createRef();
	}

	componentDidMount() {
		this.nav.current.addEventListener("itemSelect", this.onTabSelected.bind(this));
		const tabToSelect = [...this.nav.current.children].filter(tab => tab.getAttribute("data-key") === this.props.history.location.pathname);
		tabToSelect[0].selected = true;
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
