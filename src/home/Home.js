import React, { Component } from "react";
import managerImg from "../img/profile.png";
import data from "./data.json";

class Home extends Component {

	constructor (props) {
		super(props);
		
		this.featuredCardsRefs = [];
		this._navToDetail = this.navToDetail.bind(this);
		this.state = {data};
	}

	componentDidMount() {
		const inventoryCardRef = this.featuredCardsRefs[0];

		if (inventoryCardRef) {
			inventoryCardRef.addEventListener("headerPress", this._navToDetail);
		}
	}

	navToDetail() {
		this.props.history.push("/detail");
	}

	render(){
		const data = this.state.data;

		return(
			<div className="app-content">

				{/* Featured */}
				<ui5-title>Featured</ui5-title>
				<section className="section">
					{
						data.featured.map((dataObj, index) => 
							<ui5-card
								ref={ref => this.featuredCardsRefs[index] = ref}
								key={dataObj.key}
								heading={dataObj.heading}
								subtitle={dataObj.subtitle}
								status={dataObj.status}
								class="ui5card">
									<ui5-list separators="Inner">
										{
											dataObj.items.map(item =>
												<ui5-li
													key={item.key}
													icon={item.icon}
													description={item.description}
													info={item.description}
													info-state={item.infoState}
													class="ui5list-item">{item.title}</ui5-li>
											)
										}
									</ui5-list>
							</ui5-card>
							)
					}
				</section>

				{/* Today */}
				<ui5-title>Today at a glance</ui5-title>
				<section className="section">

					<ui5-card
						heading="Upcoming Activities"
						subtitle="28 Jun 2019"
						class="ui5card">
						<ui5-timeline>
							{data.activities.map(item =>
								<ui5-timeline-item
									key={item.key}
									icon={item.icon}
									title-text={item.title}
									subtitle-text={item.subtitle}
									class="ui5list-item">
										<div>{item.location}</div>
								</ui5-timeline-item>
							)}
						</ui5-timeline>
					</ui5-card>

					<ui5-card
						heading="Energy Efficiency"
						subtitle="Smart Store A"
						class="ui5card">
							<ui5-list separators="Inner">
								{data.energystats.map(item =>
									<ui5-li
										key={item.key}
										icon={item.icon}
										description={item.description}
										class="ui5list-item">
											{item.title}
										</ui5-li>
								)}
							</ui5-list>
					</ui5-card>
					
					<ui5-card
						avatar="sap-icon://retail-store"
						heading="Smart Stores"
						subtitle="Bulgaria"
						status="6 of 6"
						class="ui5card ui5card-large">
							<div className="card-content">
								<ui5-list separators="Inner" class="card-content-child">
								{data.storesa.map(store =>
									<ui5-li key={store.key} image={managerImg} description={store.description}>{store.title}</ui5-li>
								)}
								</ui5-list>
								<ui5-list separators="Inner" class="card-content-child">
								{data.storesb.map(store =>
									<ui5-li  key={store.key} image={managerImg} description={store.description}>{store.title}</ui5-li>
								)}
								</ui5-list>
							</div>
					</ui5-card>
				</section>

				{/* Actions Required */}
				<ui5-title>Action Required</ui5-title>
				<section className="section">

					{data.actions.map(action =>
						<ui5-card key={action.key} heading="Smart Store 1" subtitle="today" status="3 of 6" class="ui5card ui5card-large">
							<ui5-table>
								{
									action.columns.map(column => 
										<ui5-table-column key={column.key} slot="columns">
											<div slot="header">
												<ui5-label>{column.name}</ui5-label>
											</div>
										</ui5-table-column>
									)
								}
								{
									action.rows.map(dataObj => 
										<ui5-table-row key={dataObj.key} slot="rows">
											{
												dataObj.cells.map(cell =>
													<ui5-table-cell key={cell.key}>
														<ui5-label class={cell.error}>{cell.text}</ui5-label>
													</ui5-table-cell>
												)
											}
										</ui5-table-row>
									)
								}
							</ui5-table>
						</ui5-card>
					)}

					{/* Alerts */}
					{data.alerts.map(alert => {
						return <ui5-card
							key={alert.key} 
							heading={alert.heading}
							subtitle={alert.subtitle}
							class="ui5card ui5card-alert">
								<div className="ui5card-alert-content"> 
									<ui5-icon src={alert.icon} class="ui5icon-size ui5card-alert-icon"></ui5-icon>
									<ui5-label class="ui5label-size error">{alert.text}</ui5-label>
								</div>
						</ui5-card>
					})}
				</section>
			</div>
		);
	}
}

export default Home;
