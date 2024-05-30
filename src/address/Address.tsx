import React, { Component, useState, useEffect } from "react";
import "./Address.css";
import EditForm from "./EditForm";
import DisplayForm from "./DisplayForm";

type FormData = {
	name: string,
	city: string,
	street: string,
	website: string,
	country: string,
	rating: number,
}

type AddressProps = {
}

type AddressState = {
	editable: boolean,
	formData: FormData,
}

class Address extends Component<AddressProps, AddressState> {

	editFormData() {
		this.setState({
			...this.state,
			editable: !this.state.editable,
		})
	};


	saveFormData(formData: FormData) {
		this.setState({
			...this.state,
			editable: false,
			formData,
		})
	}

	constructor(props: AddressProps) {
		super(props);

		this.state = {
			editable: false,
			formData: {
				name: "Smart Store Dep B321", 
				city: "411 Maintown",
				street: "Main St 1618",
				website: "sap.com",
				country: "Germany",
				rating: 4,
			}
		}
	}


	render(){
		return(
			<div className="app-address">
				{ this.state.editable ? <EditForm saveFormData={this.saveFormData.bind(this)} editFormData={this.editFormData.bind(this)} editable={this.state.editable} /> : <DisplayForm edit={this.editFormData.bind(this)} editable={this.state.editable} data={this.state.formData}/> }
			</div>
		);
	}
}

// const Form = () => {
// 	const [editable, setEditable] = useState(false);
// 	const [formData, setFormData] = useState({ 
// 		name: "Smart Store Dep B321", 
// 		city: "411 Maintown",
// 		street: "Main St 1618",
// 		website: "sap.com",
// 		country: "Germany",
// 	});
  
// 	const edit = () => {
// 		setEditable(!editable);
// 	};

// 	const save = () => {
// 		setEditable(!editable);
// 	};

// 	return (
// 		{ editable ? <EditForm save={save} edit={edit} editable={editable} editData={setFormData} /> : <DisplayForm save={save} edit={edit} editable={editable} data={formData}/> }
// 	);
//   }

export default Address;
