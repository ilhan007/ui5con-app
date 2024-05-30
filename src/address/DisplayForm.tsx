import React, { Component, useState, useEffect } from "react";
import "./Address.css";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton";
import Input from "@ui5/webcomponents/dist/Input";
import Select from "@ui5/webcomponents/dist/Select";

type FormData = {
	name: string,
	city: string,
	street: string,
	website: string,
	country: string,
	rating: number,
}

type DisplayFormState = {
}

type DisplayFormProps = {
	data: FormData,
	editable: boolean,
	edit: () => void,
}

class DisplayForm extends Component<DisplayFormProps, DisplayFormState> {

	inpName :React.RefObject<Input>;
	inpCity:React.RefObject<Input>;
	inpStreet :React.RefObject<Input>;
	inpWebsite :React.RefObject<Input>;
	selCountry :React.RefObject<Select>;

	constructor (props: DisplayFormProps) {
		super(props);
		this.inpName = React.createRef<Input>();
		this.inpCity= React.createRef<Input>();
		this.inpStreet = React.createRef<Input>();
		this.inpWebsite = React.createRef<Input>();
		this.selCountry = React.createRef<Select>();
	}

	render() {
		return <ui5-form layout="S1 M3 L4 XL4" label-span="S12 M12 L12 XL4" item-spacing={this.props.editable ? "Standard" : "Large"}>
			<ui5-bar design="Subheader" slot="header">
				<ui5-title level="H4" slot="startContent">Store Data</ui5-title>
				<ui5-toggle-button slot="endContent" icon="edit" onClick={this.props.edit} pressed={this.props.editable ? true : undefined}>Edit</ui5-toggle-button>
			</ui5-bar>
			<ui5-form-group header-text="Manager">
					<ui5-form-item>
						<ui5-label slot="labelContent">Name:</ui5-label>
						<ui5-text>{this.props.data.name}</ui5-text>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
						<ui5-text>{this.props.data.city}</ui5-text>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label slot="labelContent">Street:</ui5-label>
						<ui5-text>{this.props.data.street}</ui5-text>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">Country:</ui5-label>
						<ui5-text>{this.props.data.country}</ui5-text>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">WebSite:</ui5-label>
						<ui5-link href={this.props.data.website}>{this.props.data.website}</ui5-link>
					</ui5-form-item>
				</ui5-form-group>

				<ui5-form-group header-text="Store">
					<ui5-form-item>
						<ui5-label slot="labelContent">Store Person ID:</ui5-label>
						<ui5-text>0130134223424</ui5-text>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label slot="labelContent">Category</ui5-label>
						<ui5-text>Beverage</ui5-text>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label slot="labelContent">Working Hours:</ui5-label>
						<ui5-text>9 to 18</ui5-text>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">Employees:</ui5-label>
						<ui5-text>18</ui5-text>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">Rating</ui5-label>
						<ui5-text>{`${this.props.data.rating} out of 5`}</ui5-text>
					</ui5-form-item>
				</ui5-form-group>

				<ui5-form-group header-text="Contact">
					<ui5-form-item>
						<ui5-label slot="labelContent">Email:</ui5-label>
						<ui5-link>john.smith@sap.com</ui5-link>
					</ui5-form-item>
					
					<ui5-form-item>
						<ui5-label slot="labelContent">Tel:</ui5-label>
						<ui5-link>+49 6227 747474</ui5-link>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">SMS:</ui5-label>
						<ui5-link>+49 6227 747474</ui5-link>
					</ui5-form-item>

					<ui5-form-item>
						<ui5-label slot="labelContent">Mobile:</ui5-label>
						<ui5-link href="sap.com">+49 6227 747474</ui5-link>
					</ui5-form-item>


					<ui5-form-item>
						<ui5-label slot="labelContent">Fax:</ui5-label>
						<ui5-link href="sap.com">+49 6227 747474</ui5-link>
					</ui5-form-item>
				</ui5-form-group>
		</ui5-form>
	}
}

export default DisplayForm;
