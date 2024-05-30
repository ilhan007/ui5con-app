import React, { Component, MouseEventHandler } from "react";

// UI5 Web Components
import "@ui5/webcomponents/Button";
import "@ui5/webcomponents/Bar";
import "@ui5/webcomponents/Label";
import "@ui5/webcomponents/Input";
import type Input from "@ui5/webcomponents/dist/Input";


type FilterProps = {
	filter: (value: string) => void,
	sortDesc: () => void,
	sortAsc: () => void,
	toggleEdit: () => void,
}

type FilsterState = {}

class TableFilterBar extends Component<FilterProps, FilsterState> {
	searchInput: React.RefObject<Input>;

	constructor(props: FilterProps) {
		super(props);

		this.searchInput = React.createRef<Input>();
	}

	componentDidMount() {
		this.searchInput.current!.addEventListener('input', event => {
			const value = (event.target! as Input).value;

			this.props.filter(value);
		});
	}

	render() {
		return (
			<div className="details-page-filter-bar">
				<ui5-title level="H3">Products</ui5-title>

				<div className="details-page-filter-bar-actions">
					<ui5-input class="details-page-searchfield" placeholder="Search" ref={this.searchInput}>
						<ui5-icon slot="icon" name="search"></ui5-icon>
					</ui5-input>
					<ui5-button onClick={this.props.sortDesc.bind(this)} icon="sort-descending" design="Transparent" title="Sort By Status"></ui5-button>
					<ui5-button onClick={this.props.sortAsc.bind(this)} icon="sort-ascending" design="Transparent" title="Sort By Status"></ui5-button>
					<ui5-button icon="excel-attachment" design="Transparent"></ui5-button>
				</div>
			</div>
		)
	}
}

export default TableFilterBar;
