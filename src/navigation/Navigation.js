import React, { Component } from "react";

import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";

class Navigation extends Component {
	constructor (props) {
		super(props);

		this._onTabSelected = this.onTabSelected.bind(this)

		this.state = {
			tabs: [
				{
					key: "hm",
					name: "Home",
					path: "/home/stats",
					selected: true,
				},
				{
					key: "prd",
					name: "Products",
					path: "/home/products",
					selected: false,
				}
			]
		}
	}

	static getDerivedStateFromProps(props, state) {
		const urlPath = props.history.location.pathname;
		const tabs = state.tabs.map(tab => Object.assign({}, tab, {selected: urlPath === tab.path}));
		return {tabs: tabs};
	}

	onTabSelected(event){
		this.props.history.push(event.detail.item.getAttribute("data-key"));
	}

	render() {
		return(
			<NavigationBar tabs={this.state.tabs} onTabSelected={this._onTabSelected}/>
		);
	}
}

class NavigationBar extends Component {

	constructor (props) {
		super(props);
		this.navBar = React.createRef();
	}

	componentDidMount() {
		this.navBar.current.addEventListener("itemSelect", this.props.onTabSelected);
	}

	render() {
		return (
			<ui5-tabcontainer ref={this.navBar} collapsed fixed show-overflow>
				{this.props.tabs.map((tab) => <NavigationTab key={tab.key} tab={tab}/>)}
			</ui5-tabcontainer>
		);
	}
}

const NavigationTab = ({tab}) => {
	return (<ui5-tab text={tab.name} selected={tab.selected ? "true" : undefined} data-key={tab.path}></ui5-tab>);
}

export default Navigation;
