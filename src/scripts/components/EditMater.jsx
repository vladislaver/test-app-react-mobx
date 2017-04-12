'use strict'

import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import MatesStore from '../store/MatesStore';

const initialState = {
  "age": 0,
  "firstName": "",
  "lastName": "",
  "email": ""
};

class EditMater extends React.Component {
  constructor() {
    super();
    this.state = { ...initialState };
  }

  save() {
    const mate = { ...this.state };

    if (this.props.mateId != null) {
      MatesStore.update(this.props.mateId, mate);
    } else {
      MatesStore.create(mate);
    }

    this.props.hide();
  }

  handleChange(stateName) {
    return ((ev) => {
      this.setState({ [stateName]: ev.target.value });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mateId != null) {
      const mate = MatesStore.db[nextProps.mateId];

      this.setState({
        "age": mate.age,
        "firstName": mate.name.first,
        "lastName": mate.name.last,
        "email": mate.email
      });

      return;
    }

    this.setState(initialState);
  }

  render() {
    const isShow = this.props.isShow;
    const hide = this.props.hide;
    const mateId = this.props.mateId;

    return (
      <Modal show={ isShow } onHide={ hide }>
        <Modal.Header closeButton>
          <Modal.Title>{ mateId != null ? "Edit Mate" : "New Mate" }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                label="Enter First Name"
                value={ this.state.firstName }
                onChange={ this.handleChange.call(this, "firstName") }
                placeholder="First Name"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                label="Enter Last Name"
                value={ this.state.lastName }
                onChange={ this.handleChange.call(this, "lastName") }
                placeholder="Last Name"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Age</ControlLabel>
              <FormControl
                type="number"
                label="Enter Age"
                value={ this.state.age }
                onChange={ this.handleChange.call(this, "age") }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                label="Enter Email Address"
                value={ this.state.email }
                onChange={ this.handleChange.call(this, "email") }
                placeholder="Enter email"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.save.bind(this) }>{ mateId != null ? "Сохранить" : "Создать" }</Button>
          <Button onClick={ hide }>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditMater;
