import React, { Component } from "react";

// import "@ui5con/components/dist/Token.js";
// import Token from "@ui5con/components/dist/Token.js";

import "@ui5/webcomponents/Tokenizer";
import type Tokenizer from "@ui5/webcomponents/dist/Tokenizer";
import type { TokenizerTokenDeleteEventDetail } from "@ui5/webcomponents/dist/Tokenizer";

type TokenReactComponentProps = {
	productKey: number,
	deleteTag: (key: number, tag: string) => void,
	readonly: boolean | undefined
	tags: Array<string>,
}

class TokenizerReactComponent extends Component<TokenReactComponentProps> {	
	tokenizerRef: React.RefObject<Tokenizer>;

	constructor (props: TokenReactComponentProps) {
		super(props);

		this.tokenizerRef = React.createRef<Tokenizer>();
	}

	componentDidMount() {
		this.tokenizerRef.current!.addEventListener("token-delete", (event) => {
			const deletedToken = (event as CustomEvent<TokenizerTokenDeleteEventDetail>).detail.tokens[0];
			this.props.deleteTag(parseInt(deletedToken.getAttribute("data-product-key")!), deletedToken.text);
		});
	}

	render() {
		return (
			<ui5-tokenizer readonly={this.props.readonly} ref={this.tokenizerRef} class="table-status-cell-content">
				{
					this.props.tags.map((tag: string, idx: number) => <ui5-token key={idx} data-product-key={this.props.productKey} text={tag}></ui5-token>
				)}
			</ui5-tokenizer>
		);
	}
}

export default TokenizerReactComponent;