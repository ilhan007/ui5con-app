import React, { Component } from "react";

const API_URL = '//5cf6a60946583900149cba98.mockapi.io/prod';

class Products extends Component {

	constructor (props) {
		super(props);

		this.state = {products: []};
	}

	async componentDidMount() {
		const products = await this.fetchProducts();
		this.setState({products});
	}

	async fetchProducts() {
		return (await fetch(`${API_URL}/products`)).json();
	}

	render(){
		return(
			<section className="section">
				<ProductList products={this.state.products}/>
			</section>
		);
	}
}

const ProductList = ({products}) => {
	return(
		<ui5-list class="full-width">
			{products.map((product) => <Product key={product.createdAt} product={product}/>)}
		</ui5-list>
	);
}

const Product = ({product}) => {
	return <ui5-li image={product.avatar} description={product.createdAt}>{product.name}</ui5-li>;
}

export default Products;
