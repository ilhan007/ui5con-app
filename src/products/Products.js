import React, { Component } from "react";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";

class Products extends Component {

	render(){
		return(
			<section className="section">
				<ui5-list id="myList" class="full-width">
					<ui5-li icon="sap-icon://nutrition-activity" description="Tropical plant with an edible fruit">Pineapple</ui5-li>
					<ui5-li icon="sap-icon://nutrition-activity" description="Occurs between red and yellow">Orange</ui5-li>
					<ui5-li icon="sap-icon://nutrition-activity" description="The yellow lengthy fruit">Banana</ui5-li>
					<ui5-li icon="sap-icon://nutrition-activity" description="The tropical stone fruit">Mango</ui5-li>
				</ui5-list>
			</section>
		);
	}
}

export default Products;
