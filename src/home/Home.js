import React, { Component } from "react";
import managerImg1 from "../img/woman_avatar_1.png";
import managerImg2 from "../img/woman_avatar_2.png";
import managerImg3 from "../img/woman_avatar_3.png";
import managerImg4 from "../img/woman_avatar_4.png";
import managerImg5 from "../img/man_avatar_1.png";
import managerImg6 from "../img/man_avatar_2.png";
import managerImg7 from "../img/man_avatar_4.png";
import managerImg8 from "../img/man_avatar_5.png";
import managerImg9 from "../img/profile.png";
import data from "./data.json";

import "custom-library/dist/MyNewComponent.js";

const imgs = [
	managerImg1, managerImg2, managerImg3,
	managerImg4, managerImg5, managerImg6,
	managerImg7,  managerImg8, managerImg9
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
								class={dataObj.classes}>
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
				</section>

				<section className="section section--mid">
					{/* Upcoming */}
					<section className="section--upcoming">
						<ui5-title level="H3">Upcoming</ui5-title>
						<div className="section--upcoming-cards">
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
						</div>
					</section>

					{/* Actions Required */}
					<section className="section--actions-required">
						<ui5-title level="H3">Action Required</ui5-title>
						<div className="section--actions-required-cards">
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
						</div>

						<ui5-card class="ui5card" heading="Contract Renewal" subheading="Smart Store Dep B321">
							<div className="ui5card--staff-content">
								<ui5-avatar-group type="Single" avatar-size="M" id="avatar-group-group">
									{["IM", "JD"].map(img =>
										<ui5-avatar key={img} initials={img}></ui5-avatar>
									)}

									{imgs.map((img, idx) =>
										<ui5-avatar key={idx} image={img}></ui5-avatar>
									)}

									{["MI", "LI"].map(img =>
										<ui5-avatar  key={img} initials="M"></ui5-avatar>
									)}
								</ui5-avatar-group>
							</div>
						</ui5-card>
					</section>
				</section>
			
				<ui5-title level="H3">Stores</ui5-title>
				<section className="section">

					<ui5-card
						avatar="retail-store"
						heading="Smart Stores"
						subheading="North America"
						status="6/6"
						class="ui5card ui5card--large">
							<div className="card-content">
								<ui5-list separators="Inner" mode="SingleSelect" class="card-content-child">
								{data.storesa.map(store =>
									<ui5-li key={store.key} image={imgs[store.key]} description={store.description} selected={store.selected}>{store.title}</ui5-li>
								)}
								</ui5-list>
								<ui5-list separators="Inner" class="card-content-child">
								{data.storesb.map(store =>
									<ui5-li key={store.key} image={imgs[store.key]} description={store.description}>{store.title}</ui5-li>
								)}
								</ui5-list>
							</div>
					</ui5-card>
				</section>
				{/* <my-new-component></my-new-component> */}
			</div>
		);
	}
}

export default Home;
