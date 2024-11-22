import React, { Component } from "react";

import data from "./data.json";
//@ts-ignore
import managerImg1 from "../img/woman_avatar_1.png";
//@ts-ignore
import managerImg2 from "../img/woman_avatar_2.png";
//@ts-ignore
import managerImg3 from "../img/woman_avatar_3.png";
//@ts-ignore
import managerImg4 from "../img/woman_avatar_4.png";
//@ts-ignore
import managerImg5 from "../img/man_avatar_1.png";
//@ts-ignore
import managerImg6 from "../img/man_avatar_2.png";
//@ts-ignore
import managerImg7 from "../img/man_avatar_4.png";
//@ts-ignore
import managerImg8 from "../img/man_avatar_5.png";
//@ts-ignore
import managerImg9 from "../img/profile.png";

import "@ui5/webcomponents/Title.js";
import "@ui5/webcomponents/Card.js";
import type Card from "@ui5/webcomponents/dist/Card.js";
import "@ui5/webcomponents/CardHeader.js";
import "@ui5/webcomponents/Avatar.js";
import "@ui5/webcomponents/AvatarGroup.js";
import "@ui5/webcomponents/List.js";
import "@ui5/webcomponents-fiori/Timeline.js";
import "@ui5/webcomponents-fiori/TimelineItem.js";

const imgs = [
	managerImg1, managerImg2, managerImg3,
	managerImg4, managerImg5, managerImg6,
	managerImg7,  managerImg8, managerImg9
];

type HomeProps = {
	navigate: (path: string) => void;
}

type HomeState = {
	data: Data,
}

type Data = {
	featured: Array<CardData>,
	activities: Array<CardActivityData>,
	energystats:  Array<CardEnergyStatsData>
	storesa: Array<CardStoreData>,
	storesb: Array<CardStoreData>,
	actions: Array<CardActionsData>,
	alerts: Array<CardAlertsData>,
}

type CardData = {
	key: string | number,
	heading: string,
	subtitle: string,
	status: string,
	classes: string,
	headerClasses?: string,
	items: Array<{key: string | number, title: string, description: string, icon: string, info?: string, infoState?: string}>
}

type CardActivityData = {
	key: string | number,
	title: string,
	subtitle: string,
	location: string,
	icon: string,
}

type CardEnergyStatsData = {
	key: string | number,
	title: string,
	description: string,
	icon: string,
	info: string,
	infoState: string
}

type CardStoreData = {
	key: string | number,
	title: string,
	description: string,
	selected?: boolean,
}

type CardActionsData = {
	key: string | number,
	type: string,
	title: string,
	subtitle:string,
	status: string,
	columns: Array<{key: string | number, name: string}>
	rows: Array<{key: string | number, cells: Array<{ key: string | number, text: string, error?: string }>}>
}

type CardAlertsData = {
	key: string | number,
	heading: string,
	subtitle: string,
	icon: string,
	text: string,
}

class Home extends Component<HomeProps, HomeState> {

	_navigate: (path: string) => void;
	navToDetail: () => void;
	featuredCardsRefs: Array<Card>;

	constructor (props: HomeProps) {
		super(props);
		this.featuredCardsRefs = [];
		this.state = { 
			data,
		};
		this._navigate = this.props.navigate;
		this.navToDetail = this._navToDetail.bind(this);
	}

	componentDidMount() {
		const inventoryCardRef = this.featuredCardsRefs[0];

		if (inventoryCardRef) {
			inventoryCardRef.addEventListener("click", this.navToDetail);
		}
	}

	_navToDetail() {
		this._navigate("/inventory");
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
								key={dataObj.key}
								class={dataObj.classes}>
									<ui5-card-header
										// @ts-ignore
										ref={ref => this.featuredCardsRefs[index] = ref}
										interactive
										additional-text={dataObj.status}
										title-text={dataObj.heading}
										subtitle-text={dataObj.subtitle}
										slot="header"
										class={dataObj.headerClasses}
										></ui5-card-header>
									<ui5-list separators="Inner">
										{
											dataObj.items.map(item =>
												<ui5-li
													key={item.key}
													icon={item.icon}
													description={item.description}
													additional-text={item.info}
													additional-text-state={item.infoState}
													class="ui5list-item">{item.title}</ui5-li>
											)
										}
									</ui5-list>
							</ui5-card>
							)
					}

					<ui5-card class="ui5card ui5card--energy">
							<ui5-card-header
										title-text="Energy Efficiency"
										subtitle-text="Smart Store Dep B321"
										slot="header"
										class="ui5card-header-featured ui5card-header-featured--energy"
							></ui5-card-header>
							<ui5-list separators="Inner">
								{data.energystats.map(item =>
									<ui5-li
										key={item.key}
										icon={item.icon}
										description={item.description}
										additional-text={item.info}
										additional-text-state={item.infoState}
										class="ui5list-item">
											{item.title}
										</ui5-li>
								)}
							</ui5-list>
					</ui5-card>
				</section>


					
				<ui5-title level="H3">TO DOs</ui5-title>
				<section className="section">					


					<ui5-card class="ui5card">
						<div className="section--todo-content">
							<ui5-title level="H5" class="section--todo-title">Release Invoice ID - 347812</ui5-title>
							<div className="section--todo-tag-wrapper">
								<ui5-tag design="Set2" color-scheme="1" class="section--todo-tag">Overdue</ui5-tag>
								<ui5-text>10 000 euros, due 04.06.2024</ui5-text>
							</div>
							
							<div className="section--todo-actions">
								<ui5-button design="Positive">Approve</ui5-button>
								<ui5-button design="Negative">Reject</ui5-button>
							</div>
						</div>
					</ui5-card>

					<ui5-card class="ui5card">
						<div className="section--todo-content">
							<ui5-title level="H5" class="section--todo-title">Review Purchase of New Refrigarator</ui5-title>

							<div className="section--todo-tag-wrapper">
								<ui5-tag design="Set2" color-scheme="2" class="section--todo-tag">High</ui5-tag>
								<ui5-text>French Door, Side-by-Side, Top Freezer</ui5-text>
							</div>
							<div className="section--todo-actions">
								<ui5-button design="Positive">Approve</ui5-button>
								<ui5-button design="Negative">Reject</ui5-button>
							</div>
						</div>
					</ui5-card>

					<ui5-card class="ui5card">	
						<div className="section--todo-content">
						<ui5-title level="H5" class="section--todo-title">Review Order 32434-234324-4425</ui5-title>

							<div className="section--todo-tag-wrapper">
								<ui5-tag design="Set2" color-scheme="3" class="section--todo-tag">Medium</ui5-tag>
								<ui5-text>Diary: milk, cheese and yogurt</ui5-text>
							</div>
							<div className="section--todo-actions">
								<ui5-button design="Positive">Approve</ui5-button>
								<ui5-button design="Negative">Reject</ui5-button>
							</div>
						</div>
					</ui5-card>
				</section>

				<section className="section section--mid" data-sap-ui-fastnavgroup="true">
					{/* Upcoming */}
					<section className="section--upcoming">
						<ui5-title level="H3">Upcoming</ui5-title>
						<div className="section--upcoming-cards">
						
							<ui5-card class="ui5card">
								<ui5-card-header
									title-text="Upcoming Activities"
									subtitle-text="25 March, 2021"
									slot="header"
									class="ui5card-header-activies"
								></ui5-card-header>

								<ui5-timeline>
									{data.activities.map(item =>
										<ui5-timeline-item
											key={item.key}
											icon={item.icon}
											title-text={item.title}
											// subtitle-text={item.subtitle}
											class="ui5list-item ui5timeline-item">
												<ui5-text>{item.location}</ui5-text>
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
									class="ui5card ui5card-alert">
											<ui5-card-header
												title-text={alert.heading}
												subtitle-text={alert.subtitle}
												slot="header"
												class="ui5card-header-action-required"
											>
											</ui5-card-header>
										<div className="ui5card-alert-content"> 
											<ui5-icon name={alert.icon} class="ui5icon-size ui5card-alert-icon"></ui5-icon>
											<ui5-label class="ui5label-size error">{alert.text}</ui5-label>
										</div>
								</ui5-card>
							})}
						</div>

						<ui5-card class="ui5card">
							<ui5-card-header
								title-text="Contract Renewal"
								subtitle-text="Smart Store Dep B321"
								slot="header"
							></ui5-card-header>

							<div className="ui5card--staff-content">
								<ui5-avatar-group type="Individual" id="avatar-group-group">
									{["IM", "JD"].map(initials =>
										<ui5-avatar key={initials} size="M" initials={initials}>
										</ui5-avatar>
									)}

									{imgs.map((img, idx) =>
										<ui5-avatar key={idx} size="M">
											<img src={img} alt="employee" />
										</ui5-avatar>
									)}

									{["MI", "LI"].map(initials =>
										<ui5-avatar  key={initials} size="M" initials={initials}></ui5-avatar>
									)}
								</ui5-avatar-group>
							</div>
						</ui5-card>
					</section>
				</section>
			
				<ui5-title level="H3">Stores</ui5-title>
				<section className="section">
					<ui5-card class="ui5card ui5card--large">
							<ui5-card-header
									title-text="Smart Stores"
									subtitle-text="North America"
									additional-text="6/6"
									slot="header"
							>
								<ui5-avatar icon="retail-store" slot="avatar"></ui5-avatar>
							</ui5-card-header>

							<div className="card-content">
								<ui5-list separators="Inner" selection-mode="Single" class="card-content-child">
								{data.storesa.map(store =>
									<ui5-li key={store.key} image={imgs[store.key as number]} description={store.description} selected={store.selected}>{store.title}</ui5-li>
								)}
								</ui5-list>
								<ui5-list separators="Inner" class="card-content-child">
								{data.storesb.map(store =>
									<ui5-li key={store.key} image={imgs[store.key as number]} description={store.description}>{store.title}</ui5-li>
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
