import React from 'react';
import "./Detail.css";


const Detail = () => {
	return (
		<div className="detail-page">
			<header className="detail-page-header">

				<div class="detail-page-header-bar">
					<ui5-title>Inventory</ui5-title>
					<ui5-button type="Transparent" icon="sap-icon://action" class="action-button"></ui5-button>
				</div>

				<ui5-tabcontainer fixed collapsed class="detail-page-header-menu">
					<ui5-tab text="All Items (9, 231)"></ui5-tab>
					<ui5-tab text="Non-Perishable (4)"></ui5-tab>
					<ui5-tab text="Perishable (4)"></ui5-tab>
					<ui5-tab text="Alerts (3)"></ui5-tab>
				</ui5-tabcontainer>
			</header>

			<main className="detail-page-content">
				<div className="details-page-filter-bar">
					<ui5-title level="H3">My Title</ui5-title>

					<div className="details-page-filter-bar-actions">
						<ui5-button type="Transparent">Delete</ui5-button>
						<ui5-button icon="sap-icon://sort-descending" type="Transparent"></ui5-button>
						<ui5-button icon="sap-icon://sort-ascending" type="Transparent"></ui5-button>
						<ui5-button icon="sap-icon://excel-attachment" type="Transparent"></ui5-button>
					</div>
				</div>
				<ui5-table class="items-table">
					<ui5-table-column slot="columns">
						<ui5-checkbox class="table-column-header-content" slot="header" text="Product"></ui5-checkbox>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label class="table-column-header-content" slot="header">Price</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label class="table-column-header-content" slot="header">Shelf Stock</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label class="table-column-header-content" slot="header">Location</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label class="table-column-header-content" slot="header">Image</ui5-label>
					</ui5-table-column>

					<ui5-table-column slot="columns">
						<ui5-label class="table-column-header-content" slot="header">Status</ui5-label>
					</ui5-table-column>


					{/* Rows ...  */}

					<ui5-table-row slot="rows">
						<ui5-table-cell>
							<b><ui5-checkbox class="table-cell-content" text="Broccoli"></ui5-checkbox></b>
						</ui5-table-cell>
						<ui5-table-cell>
							<span class="table-cell-content">2.99 USD</span>
						</ui5-table-cell>
						<ui5-table-cell>
							<span class="table-cell-content">27 Each</span>
						</ui5-table-cell>
						<ui5-table-cell>
							<span class="table-cell-content">Aisle 3, Section 5</span>
						</ui5-table-cell>
						<ui5-table-cell>
							<span class="table-cell-content">
								<img className="image-cell" src="https://www.myfarm.bg/wp-content/uploads/2013/10/brokoli-e1382302960606.jpg" />
							</span>
						</ui5-table-cell>
						<ui5-table-cell>
							<span class="table-cell-content">Deterioating</span>
						</ui5-table-cell>
					</ui5-table-row>
				</ui5-table>
			</main>
		</div>
	);
}

export default Detail;
