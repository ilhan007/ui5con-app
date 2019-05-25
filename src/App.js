import React from 'react';
import './App.css';
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/Input";


function App() {
  return (
	<div className="App">
		<ui5-tabcontainer class="full-width" collapsed fixed show-overflow>
			<ui5-tab text="Home"></ui5-tab>
			<ui5-tab text="What's new" selected></ui5-tab>
			<ui5-tab text="Who are we"></ui5-tab>
			<ui5-tab text="About"></ui5-tab>
			<ui5-tab text="Contacts"></ui5-tab>
		</ui5-tabcontainer>

		<section className="searchBar">
			<ui5-input id="searchInput" placeholder="Enter search criteria ...">
				<ui5-icon
					id="searchIcon"
					slot="icon"
					src="sap-icon://search"
					class="ui5inputIcon"></ui5-icon>
			</ui5-input>
		</section>

		<section className="content">
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

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
					<ui5-list separators="None" class="card-content-child">
						<ui5-li description="Software Architect">Richard Wilson</ui5-li>
						<ui5-li description="Visual Designer">Elena Petrova</ui5-li>
						<ui5-li description="Quality Specialist">John Miller</ui5-li>
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

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>

			<ui5-card
				avatar="sap-icon://group"
				heading="Team 6"
				subtitle="Direct Reports"
				status="6 of 6"
				class="ui5card">
			</ui5-card>
		</section>
	</div>
  );
}

export default App;
