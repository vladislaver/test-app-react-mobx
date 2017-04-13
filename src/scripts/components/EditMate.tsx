'use strict';

import * as React from "react"
import { observer } from 'mobx-react';

import { Button, FormGroup, ControlLabel, FormControl, Breadcrumb } from "react-bootstrap";

import MatesStore from '../store/MatesStore';


interface MateProps {
	[key:string]: any;
	age: number
	firstName: string
	lastName: string
	email: string
}

@observer
export class EditMate extends React.Component<any, any> {

	private mate: MateProps = {
		"age": 0,
		"firstName": "",
		"lastName": "",
		"email": ""
	};
	private mateGuid: string;

	private isMateFound: boolean;

	private isNewMate: boolean;

	private getMate = () => {
		if (this.mateGuid) {
			const mate = MatesStore.getByGuid(this.mateGuid);
			if (mate) {
				this.mate.age = mate.age;
				this.mate.firstName = mate.name.first;
				this.mate.lastName = mate.name.last;
				this.mate.email = mate.email;
				this.isMateFound = true;
			} else {
				this.isMateFound = false;
			}
		} else {
			this.isNewMate = true;
		}
	};

	private updateMate = () => {
		if (MatesStore.update(this.mateGuid, this.mate)) {
			toastr.success('Update complete', "", {timeOut: 2000});
		}
	};

	private createMate = () => {
		if (MatesStore.create(this.mate)) {
			toastr.success('Create complete', "", {timeOut: 2000})
		}
	};

	private handleChange = (propertyName: string) => {
		return ((event: React.FormEvent<HTMLInputElement>) => {
			this.mate[propertyName] = event.currentTarget.value;
		});
	};

	componentWillMount() {
		this.mateGuid = this.props.match.params.id;
		this.getMate();
	}

	componentWillReceiveProps(nextProps: any) {
		this.mateGuid = nextProps.match.params.id;
		this.getMate();
	}

	render() {
		return (
			<div className="container">
				{
					(this.isMateFound || this.isNewMate) ? (
						<form>
							<Breadcrumb>
								<Breadcrumb.Item href="#/">Home</Breadcrumb.Item>
								<Breadcrumb.Item active>{ this.isNewMate ? "New Mate" : "Edit Mate" }</Breadcrumb.Item>
							</Breadcrumb>
							<FormGroup>
								<ControlLabel>First Name</ControlLabel>
								<FormControl
									type="text"
									label="Enter First Name"
									defaultValue={ this.mate.firstName }
									onChange={ this.handleChange.call(this, "firstName") }
									placeholder="First Name"
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Last Name</ControlLabel>
								<FormControl
									type="text"
									label="Enter Last Name"
									defaultValue={ this.mate.lastName }
									onChange={ this.handleChange.call(this, "lastName") }
									placeholder="Last Name"
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Age</ControlLabel>
								<FormControl
									type="number"
									label="Enter Age"
									defaultValue={ String(this.mate.age) }
									onChange={ this.handleChange.call(this, "age") }
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Email Address</ControlLabel>
								<FormControl
									type="email"
									label="Enter Email Address"
									defaultValue={ this.mate.email }
									onChange={ this.handleChange.call(this, "email") }
									placeholder="Enter email"
								/>
							</FormGroup>
							<FormGroup>
								{ this.isNewMate ? (
									<Button onClick={ this.createMate.bind(this) }>Создать</Button>
								) : (
									<Button onClick={ this.updateMate.bind(this) }>Сохранить</Button>
								) }
							</FormGroup>
						</form>
					) : (
						<h2>
							{ `Mate with GUID: ${this.mateGuid} not found :(` }
						</h2>
					)
				}
			</div>
		);
	}
}

export default EditMate;
