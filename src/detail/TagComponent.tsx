import React, { Component } from "react";

import { Product } from "../types";

// import "@ui5con/components/dist/Token.js";
// import Token from "@ui5con/components/dist/Token.js";

type TagComponentProps = {
	item: Product,
	tokenDelete: (item: Product, tag: string) => void,
	readonly: boolean | undefined
	text: string
}

class TagComponent extends Component<TagComponentProps> {	
	// tokenRef: React.RefObject<Token>;

	constructor (props: TagComponentProps) {
		super(props);

		// this.tokenRef = React.createRef<Token>();
	}

	componentDidMount() {
		// this.tokenRef.current!.addEventListener("delete", () => {
		// 	this.props.tokenDelete(this.props.item, this.props.text);
		// });
	}

	render() {
		return (
			<span>{this.props.text}</span>
			// <my-token ref={this.tokenRef} readonly={this.props.readonly} data-item={this.props.item}>{this.props.text}</my-token>
		);
	}
}

export default TagComponent;