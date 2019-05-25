import React from 'react';
import './App.css';
import profile from './img/profile.png';
import "@ui5/webcomponents/dist/Label"
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Timeline";


function App() {
  return (
	<div className="App">
		<ui5-shellbar
			primary-title="Dashboard"
			show-notifications
			notification-count="12"
			profile={profile}>
		</ui5-shellbar>
		<ui5-tabcontainer class="full-width" collapsed fixed show-overflow>
			<ui5-tab text="Home"></ui5-tab>
			<ui5-tab text="What's new" selected></ui5-tab>
			<ui5-tab text="Who are we"></ui5-tab>
			<ui5-tab text="About"></ui5-tab>
			<ui5-tab text="Contacts"></ui5-tab>
		</ui5-tabcontainer>

		<div className="content">
			{/* Input group */}
			<section className="section">
				<ui5-datepicker placeholder="start date" class="ui5datepicker"></ui5-datepicker>
				<ui5-datepicker placeholder="end date"	 class="ui5datepicker"></ui5-datepicker>
				<ui5-input id="searchInput" placeholder="Enter search criteria ..." class="ui5input">
					<ui5-icon
						id="searchIcon"
						slot="icon"
						src="sap-icon://search"
						class="ui5inputIcon"></ui5-icon>
				</ui5-input>
			</section>

			{/* Small Cards */}
			<ui5-title>Overview</ui5-title>
			<section className="section">
				<ui5-card
					heading="9,894"
					subtitle="members online"
					class="ui5card">
				</ui5-card>

				<ui5-card
					heading="154,786"
					subtitle="Weekly visitors"
					class="ui5card">
				</ui5-card>

				<ui5-card
					heading="1,4 M"
					subtitle="Q3 revenue"
					class="ui5card">
				</ui5-card>

			</section>

			{/* Large Cards */}
			<ui5-title>Shedule</ui5-title>
			<section className="section">
				<ui5-timeline>
					<ui5-timeline-item id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="sap-icon://phone" item-name="John Smith" item-name-clickable></ui5-timeline-item>
					<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.07.2017 (11:00 - 12:30)" icon="sap-icon://calendar">
						<div>MR SOF02 2.43</div>
					</ui5-timeline-item>
					<ui5-timeline-item title-text="Video Converence Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="sap-icon://calendar">
						<div>Online meeting</div>
					</ui5-timeline-item>
				</ui5-timeline>

				<ui5-card
					avatar="sap-icon://activities"
					heading="TODO"
					subtitle="12 Jul 2020"
					status="6 of 6"
					class="ui5card">
						<ui5-list separators="None" class="card-content-child">
							<ui5-li description="Software Architect">Call Richard Wilson</ui5-li>
							<ui5-li description="at NY Stock Exchange">Check Stocks market</ui5-li>
						</ui5-list>
				</ui5-card>

				<ui5-card
					avatar="sap-icon://group"
					heading="Team 6"
					subtitle="Direct Reports"
					status="6 of 6"
					class="ui5card">
						<ui5-list separators="None" class="card-content-child">
							<ui5-li description="User Researcher">Alain Chevalier</ui5-li>
							<ui5-li description="Artist">Monique Legrand</ui5-li>
							<ui5-li description="UX Specialist">Michael Adams</ui5-li>
						</ui5-list>
				</ui5-card>
			</section>

			<section className="section">
			</section>
		</div>
	</div>
  );
}

export default App;
