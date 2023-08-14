import React, { Component } from "react";

// import "@ui5con/components/dist/Token.js";
// import Token from "@ui5con/components/dist/Token.js";

type TokenReactComponentProps = {
	productKey: number,
	deleteTag: (key: number, tag: string) => void,
	readonly: boolean | undefined
	text: string
}

class TokenReactComponent extends Component<TokenReactComponentProps> {	
	// tokenRef: React.RefObject<Token>;

	constructor (props: TokenReactComponentProps) {
		super(props);

		// this.tokenRef = React.createRef<Token>();
	}

	// componentDidMount() {
	// 	this.tokenRef.current!.addEventListener("delete", () => {
	// 		this.props.deleteTag(this.props.productKey, this.props.text);
	// 	});
	// }

	render() {
		return (
			<span>{this.props.text}</span>
			// <my-token ref={this.tokenRef} readonly={this.props.readonly}>{this.props.text}</my-token>
		);
	}
}

export default TokenReactComponent;