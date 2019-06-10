import React, { Component } from "react";

class Home extends Component {

	constructor (props) {
		super(props);
		this.card = React.createRef();
		this._navToDetail = this.navToDetail.bind(this);
	}

	componentDidMount() {
		this.card.current.addEventListener("headerPress", this._navToDetail);
	}

	navToDetail() {
		this.props.history.push("/detail");
	}

	render(){
		return(
			<div className="content">

				{/* Featured */}
				<ui5-title>Featured</ui5-title>
				<section className="section">
					<ui5-card
						ref={this.card}
						heading="Inventory"
						subtitle="28 Jun 2019"
						status="3 of 22"
						class="ui5card">
							<ui5-list separators="Inner">
								<ui5-li icon="sap-icon://product" description="1579340" class="ui5list-item">Soap Bars</ui5-li>
								<ui5-li icon="sap-icon://product" description="1579441" class="ui5list-item">Lettuce</ui5-li>
								<ui5-li icon="sap-icon://product" description="1579542" class="ui5list-item">Broccoli</ui5-li>
							</ui5-list>
					</ui5-card>

					<ui5-card
						heading="Security"
						subtitle="Cameras"
						status="3 of 3"
						class="ui5card">
							<ui5-list separators="Inner">
								<ui5-li icon="sap-icon://video" description="#36" class="ui5list-item">Parking A</ui5-li>
								<ui5-li icon="sap-icon://video" description="#41" class="ui5list-item">Deli Department 1</ui5-li>
								<ui5-li icon="sap-icon://video" description="#75" class="ui5list-item">Warehouse B</ui5-li>
							</ui5-list>
					</ui5-card>

				</section>

				{/* Today */}
				<ui5-title>Today</ui5-title>
				<section className="section">

					<ui5-card
						heading="Upcoming Activities"
						subtitle="28 Jun 2019"
						status="(3)"
						class="ui5card">
						<ui5-timeline>
							<ui5-timeline-item title-text="Weekly Sync - Managers and Tech support" subtitle-text="10:00 - 10:30" icon="sap-icon://calendar">
								<div>MR WDF18 C3(GLASSBOX)</div>
							</ui5-timeline-item>
							<ui5-timeline-item title-text="Video Converence Call - Tech Update" subtitle-text="14:30 - 15:30" icon="sap-icon://calendar">
								<div>St. Leon Rot, NYC</div>
							</ui5-timeline-item>
							<ui5-timeline-item id="test-item" title-text="Call 'Project Nimbus' (Skype Meeting)" subtitle-text="15:00 - 16:30" icon="sap-icon://phone"></ui5-timeline-item>
						</ui5-timeline>
					</ui5-card>

					<ui5-card
						heading="Energy Efficiency"
						subtitle="Smart Store A"
						status="(4)"
						class="ui5card">
							<ui5-list separators="Inner">
								<ui5-li icon="sap-icon://fridge" description="Fridges are On" class="ui5list-item">Fridges</ui5-li>
								<ui5-li icon="sap-icon://lightbulb" description="Light are On" class="ui5list-item">Lights</ui5-li>
								<ui5-li icon="sap-icon://heating-cooling" description="All are On" class="ui5list-item">Air Condition</ui5-li>
								<ui5-li icon="sap-icon://washing-machine" description="Ovens are On" class="ui5list-item">Air Condition</ui5-li>
							</ui5-list>
					</ui5-card>

					<ui5-card
						avatar="sap-icon://retail-store"
						heading="Smart Stores"
						subtitle="Bulgaria"
						status="6 of 6"
						class="ui5card ui5card-large">
						<div class="card-content">
							<ui5-list separators="Inner" class="card-content-child">
								<ui5-li description="New York City">Smart Store 1</ui5-li>
								<ui5-li description="Washington">Smart Store 2</ui5-li>
								<ui5-li description="Boston">Smart Store 3</ui5-li>
							</ui5-list>
							<ui5-list separators="Inner" class="card-content-child">
								<ui5-li description="Los Angeles">Smart 4</ui5-li>
								<ui5-li description="Dallas">Smart Store 5</ui5-li>
								<ui5-li	 description="Chicago">Smart Store 6</ui5-li>
							</ui5-list>
						</div>
					</ui5-card>
				</section>

				{/* Actions Required */}
				<ui5-title>Action Required</ui5-title>
				<section className="section">
					<ui5-card heading="Smart Store 1" subtitle="today" status="3 of 6" class="ui5card ui5card-large">
						<ui5-table>
							<ui5-table-column slot="columns">
								<div slot="header">
									<ui5-label>Product</ui5-label>
								</div>
							</ui5-table-column>

							<ui5-table-column slot="columns">
								<div slot="header">
									<ui5-label>Location</ui5-label>
								</div>
							</ui5-table-column>

							<ui5-table-column slot="columns">
								<div slot="header">
									<ui5-label>Price</ui5-label>
								</div>
							</ui5-table-column>

							<ui5-table-column slot="columns" min-width="450" popin-text="Status" demand-popin>
								<div slot="header">
									<ui5-label>Status</ui5-label>
								</div>
							</ui5-table-column>

							<ui5-table-row slot="rows">
								<ui5-table-cell>
									<ui5-label>Soap bars</ui5-label>
								</ui5-table-cell>
								<ui5-table-cell>
									<ui5-label>Aisle 23, Section 21</ui5-label>
								</ui5-table-cell>
								<ui5-table-cell>
										<ui5-label>5.49 USD</ui5-label>
								</ui5-table-cell>
								<ui5-table-cell>
									<span class="status-error">Re-stock</span>
								</ui5-table-cell>
							</ui5-table-row>
						</ui5-table>
					</ui5-card>

					<ui5-card
						heading="Fridge #37"
						subtitle="Temparature too low"
						class="ui5card ui5card-small">
							<div className="card--action-content"> 
								<ui5-icon src="sap-icon://fridge" class="ui5icon-size card--action-icon"></ui5-icon>
								<ui5-label class="ui5label-size normal">-9 deg</ui5-label>
							</div>
					</ui5-card>

					<ui5-card
						heading="Room A"
						subtitle="Temparature high"
						class="ui5card ui5card-small">
							<div className="card--action-content"> 
								<ui5-icon src="sap-icon://temperature" class="ui5icon-size card--action-icon"></ui5-icon>
								<ui5-label class="ui5label-size critical">28 deg</ui5-label>
							</div>
					</ui5-card>

					<ui5-card
						heading="Entrance Lamp"
						subtitle="Maintenance overdue"
						class="ui5card ui5card-small">
							<div className="card--action-content"> 
								<ui5-icon src="sap-icon://lightbulb" class="ui5icon-size card--action-icon"></ui5-icon>
								<ui5-label class="ui5label-size critical">5 days</ui5-label>
							</div>
					</ui5-card>
				</section>
			</div>
		);
	}
}

export default Home;
