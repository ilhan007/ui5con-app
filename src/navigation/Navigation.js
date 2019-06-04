import React, { Component } from "react";

class Navigation extends Component {
	constructor (props) {
		super(props);

		this._onTabSelected = this.onTabSelected.bind(this)

		this.state = {
			tabs: [
				{
					key: "hm",
					name: "Home",
					path: "/home",
					selected: true,
				},
				{
					key: "prd",
					name: "Products",
					path: "/products",
					selected: false,
				}
			]
		}
	}

	componentWillMount() {
		this.updateTabSelectionState();
	}

	onTabSelected(event){
		this.props.history.push(event.detail.item.getAttribute("data-key"));
	}

	updateTabSelectionState() {
		const urlPath = this.props.history.location.pathname;

		this.state.tabs = [...this.state.tabs.map((tab) => {
			return Object.assign({}, tab, {selected: urlPath === tab.path})
		})];
	}

	render() {
		return(
			<NavigationBar tabs={this.state.tabs} onTabSelected={this._onTabSelected}/>
		);
	}
}

const NavigationTab = ({tab}) => {
	return (<ui5-tab text={tab.name} selected={tab.selected ? "true" : undefined} data-key={tab.path}></ui5-tab>);
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

export default Navigation;
