'use strict';

import * as React from "react"
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Button, FormGroup, ControlLabel, FormControl, Breadcrumb } from "react-bootstrap";

import MatesStore from '../store/MatesStore';
import Mate from '../store/Mate';


class MateWithSetters extends Mate {
  constructor(mate: Mate = new Mate()) {
    super(mate.guid, mate.age, mate.name, mate.email);
  }
  public setFirstName = (firstName: string):void => {
    this.name.first = firstName;
  };

  public setLastName = (lastName: string):void => {
    this.name.last = lastName;
  };

  public setAge = (age: number):void => {
    this.age = age;
  };

  public setEmail = (email: string):void => {
    this.email = email;
  };
}

@observer
export class EditMate extends React.Component<RouteComponentProps<{id: string}>, any> {

	private mate: MateWithSetters;
	private mateGuid: string;
	private isMateFound: boolean;
	private isNewMate: boolean;


	private getMate = () => {
		if (this.mateGuid) {
			const mate = MatesStore.getByGuid(this.mateGuid);

			if (mate) {
        this.mate = new MateWithSetters(mate);

				this.isMateFound = true;
			} else {
				this.isMateFound = false;
			}
		} else {
      this.mate = new MateWithSetters();
			this.isNewMate = true;
		}
	};

	private updateMate = () => {
		if (MatesStore.update(this.mateGuid, this.mate)) {
			toastr.success("Mate was updated", 'Success', { timeOut: 2000 });
		}
	};

	private createMate = () => {
		if (MatesStore.create(this.mate)) {
			toastr.success("New mate was created", 'Success', { timeOut: 2000 });
		}
	};

	private handleChange = (voidName: string) => {
		return ((event: React.FormEvent<HTMLInputElement>) => {
      this.mate[voidName](event.currentTarget.value);
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
									defaultValue={ this.mate.name.first }
									onChange={ this.handleChange.call(this, "setFirstName") }
									placeholder="First Name"
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Last Name</ControlLabel>
								<FormControl
									type="text"
									label="Enter Last Name"
									defaultValue={ this.mate.name.last }
									onChange={ this.handleChange.call(this, "setLastName") }
									placeholder="Last Name"
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Age</ControlLabel>
								<FormControl
									type="number"
									label="Enter Age"
									defaultValue={ String(this.mate.age) }
									onChange={ this.handleChange.call(this, "setAge") }
								/>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Email Address</ControlLabel>
								<FormControl
									type="email"
									label="Enter Email Address"
									defaultValue={ this.mate.email }
									onChange={ this.handleChange.call(this, "setEmail") }
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
