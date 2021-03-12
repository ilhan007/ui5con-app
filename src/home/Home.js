import React, { Component } from "react";
import managerImg1 from "../img/woman_avatar_1.png";
import managerImg2 from "../img/woman_avatar_2.png";
import managerImg3 from "../img/woman_avatar_3.png";
import managerImg4 from "../img/woman_avatar_4.png";
import managerImg5 from "../img/man_avatar_1.png";
import managerImg6 from "../img/man_avatar_2.png";
import managerImg7 from "../img/man_avatar_4.png";
import managerImg8 from "../img/man_avatar_5.png";
import data from "./data.json";


const imgs = [
	managerImg1, managerImg2, managerImg3, managerImg4,
	managerImg5, managerImg6,  managerImg7,  managerImg8
];

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
			inventoryCardRef.addEventListener("headerClick", this._navToDetail);
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
				<ui5-title level="H3">Featured</ui5-title>
				<section className="section">
					{
						data.featured.map((dataObj, index) => 
							<ui5-card
								ref={ref => this.featuredCardsRefs[index] = ref}
								key={dataObj.key}
								heading={dataObj.heading}
								subheading={dataObj.subtitle}
								status={dataObj.status}
								header-interactive
								class="ui5card">
									<ui5-list separators="Inner">
										{
											dataObj.items.map(item =>
												<ui5-li
													key={item.key}
													icon={item.icon}
													description={item.description}
													info={item.info}
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
				<ui5-title level="H3">Today at a glance</ui5-title>
				<section className="section">
					
					<ui5-card
						heading="Work Calendar"
						subheading="Q2, 2021"
						class="ui5card">
						<ui5-calendar format-pattern="dd/MM/yyyy">
							<ui5-date value="March 25, 2021"></ui5-date>
						</ui5-calendar>
					</ui5-card>
				
					<ui5-card
						heading="Upcoming Activities"
						subheading="25 March, 2021"
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
						subheading="Smart Store Dep B321"
						class="ui5card ui5card--energy">
							<ui5-list separators="Inner">
								{data.energystats.map(item =>
									<ui5-li
										key={item.key}
										icon={item.icon}
										description={item.description}
										info={item.info}
										info-state={item.infoState}
										class="ui5list-item">
											{item.title}
										</ui5-li>
								)}
							</ui5-list>
					</ui5-card>
					
					<ui5-card
						avatar="retail-store"
						heading="Smart Stores"
						subheading="North America"
						status="6 of 6"
						class="ui5card ui5card-large">
							<div className="card-content">
								<ui5-list separators="Inner" mode="SingleSelect" class="card-content-child">
								{data.storesa.map(store =>
									<ui5-li key={store.key} image={imgs[store.key]} description={store.description} selected={store.selected}>{store.title}</ui5-li>
								)}
								</ui5-list>
								<ui5-list separators="Inner" class="card-content-child">
								{data.storesb.map(store =>
									<ui5-li  key={store.key} image={imgs[store.key]} description={store.description}>{store.title}</ui5-li>
								)}
								</ui5-list>
							</div>
					</ui5-card>
				</section>

				{/* Actions Required */}
				<ui5-title level="H3">Action Required</ui5-title>
				<section className="section">

					{data.actions.map(action =>
						<ui5-card key={action.key} heading="Smart Store 1" subheading="today" status="3 of 6" class="ui5card ui5card-large">
							<ui5-table class="ui5ActionRequiredTbl">
								{
									action.columns.map(column => 
										<ui5-table-column key={column.key} slot="columns">
											<div className="center-align">
												<ui5-label>{column.name}</ui5-label>
											</div>
										</ui5-table-column>
									)
								}
								{
									action.rows.map(dataObj => 
										<ui5-table-row key={dataObj.key}>
											{
												dataObj.cells.map(cell =>
													<ui5-table-cell key={cell.key}>
														<div className="center-align">
															<ui5-label class={cell.error}>{cell.text}</ui5-label>
														</div>
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
							subheading={alert.subtitle}
							class="ui5card ui5card-alert">
								<div className="ui5card-alert-content"> 
									<ui5-icon name={alert.icon} class="ui5icon-size ui5card-alert-icon"></ui5-icon>
									<ui5-label class="ui5label-size error">{alert.text}</ui5-label>
								</div>
						</ui5-card>
					})}

					<ui5-avatar-group type="Group" avatar-size="M" id="avatar-group-group">
						<ui5-avatar initials="M" image="./img/woman_avatar_5.png"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar icon="home"></ui5-avatar>
						<ui5-avatar initials="M" image="./img/Lamp_avatar_01.jpg"></ui5-avatar>
						<ui5-avatar icon="home"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar icon="home" image="./img/John_Miller.png"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar icon="home"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar initials="M" image="./img/woman_avatar_5.png"></ui5-avatar>
						<ui5-avatar icon="home"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar initials="M" image="./img/Lamp_avatar_01.jpg"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
						<ui5-avatar initials="M"></ui5-avatar>
					</ui5-avatar-group>
				</section>
			</div>
		);
	}
}

export default Home;
