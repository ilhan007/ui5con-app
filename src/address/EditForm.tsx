import React, { Component, useState, useEffect } from "react";
import "./Address.css";
import Input from "@ui5/webcomponents/dist/Input";
import Select from "@ui5/webcomponents/dist/Select";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton";
import RatingIndicator from "@ui5/webcomponents/dist/RatingIndicator";

type FormData = {
	name: string,
	city: string,
	street: string,
	website: string,
	country: string,
	rating: number,
}

type FormDataSetter = (formData: FormData) => void

type EditFormProps = {
	editFormData: () => void,
	saveFormData: FormDataSetter,
	editable: boolean,
	data: FormData,
}

type EditFormState= {

}


class EditForm extends Component<EditFormProps, EditFormState> {

	inpName :React.RefObject<Input>;
	inpCity:React.RefObject<Input>;
	inpStreet :React.RefObject<Input>;
	inpWebsite :React.RefObject<Input>;
	selCountry :React.RefObject<Select>;
	ratingInd :React.RefObject<RatingIndicator>;

	constructor (props: EditFormProps) {
		super(props);
		this.inpName = React.createRef<Input>();
		this.inpCity= React.createRef<Input>();
		this.inpStreet = React.createRef<Input>();
		this.inpWebsite = React.createRef<Input>();
		this.selCountry = React.createRef<Select>();
		this.ratingInd = React.createRef<RatingIndicator>();
	}

	save() {
		this.props.saveFormData({
			name: this.inpName!.current!.value, 
			city: this.inpCity!.current!.value, 
			street: this.inpStreet!.current!.value, 
			website: this.inpWebsite!.current!.value, 
			country:this.selCountry!.current!.value,
			rating: this.ratingInd!.current!.value,
		});
	};

	edit() {
		this.props.editFormData();
	}

	cancel() {
		this.props.editFormData();
	}


	render() {
		return <ui5-form layout="S1 M3 L4 XL4" label-span="S12 M12 L12 XL4" item-spacing={this.props.editable ? "Standard" : "Large"}>
			<ui5-bar design="Subheader" slot="header">
				<ui5-title level="H4" slot="startContent">Store Dep B321</ui5-title>
				<ui5-button slot="endContent" onClick={this.save.bind(this)} hidden={this.props.editable ? undefined : true} design="Emphasized">Save</ui5-button>
				<ui5-button slot="endContent" onClick={this.cancel.bind(this)}>Cancel</ui5-button>
			</ui5-bar>
			<ui5-form-group header-text="Manager">
				<ui5-form-item>
					<ui5-label slot="labelContent">Name:</ui5-label>
					<ui5-input ref={this.inpName} value={this.props.data.name}></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
					<ui5-input ref={this.inpCity} value={this.props.data.city}></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Street:</ui5-label>
					<ui5-input ref={this.inpStreet} value={this.props.data.street}></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Country:</ui5-label>
					<ui5-select ref={this.selCountry}>
						<ui5-option selected={this.props.data.country === "Italy" ? true : undefined}>Italy</ui5-option>
						<ui5-option selected={this.props.data.country === "Germany" ? true : undefined}>Germany</ui5-option>
						<ui5-option selected={this.props.data.country === "France" ? true : undefined}>France</ui5-option>
					</ui5-select>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">WebSite:</ui5-label>
					<ui5-input ref={this.inpWebsite} value={this.props.data.website}></ui5-input>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group header-text="Store">
				<ui5-form-item>
					<ui5-label slot="labelContent">Store Person ID:</ui5-label>
					<ui5-input value="0130134223424"></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label slot="labelContent">Category</ui5-label>
					<ui5-input value="Beverage"></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label slot="labelContent">Working Hours:</ui5-label>
					<ui5-input value="9 to 18"></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Employees:</ui5-label>
					<ui5-step-input value={18}></ui5-step-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Rating</ui5-label>
					<ui5-rating-indicator ref={this.ratingInd} value={4}></ui5-rating-indicator>
				</ui5-form-item>
			</ui5-form-group>

			<ui5-form-group header-text="Contact">
				<ui5-form-item>
					<ui5-label slot="labelContent">Email:</ui5-label>
					<ui5-input value="john.smith@sap.com"></ui5-input>
				</ui5-form-item>
				
				<ui5-form-item>
					<ui5-label slot="labelContent">Tel:</ui5-label>
					<ui5-input value="+49 6227 747474"></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">SMS:</ui5-label>
					<ui5-input value="+49 6227 747474"></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Mobile:</ui5-label>
					<ui5-input value="+49 6227 747474"></ui5-input>
				</ui5-form-item>

				<ui5-form-item>
					<ui5-label slot="labelContent">Fax:</ui5-label>
					<ui5-input value="+49 6227 747474"></ui5-input>
				</ui5-form-item>
			</ui5-form-group>
		</ui5-form>
	}
};


export default EditForm;
