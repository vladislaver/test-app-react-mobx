'use strict'

import React from 'react';
import { Table, Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { observer } from 'mobx-react';

import EditMater from './EditMater';
import MatesStore from '../store/MatesStore';

@observer
class MatersList extends React.Component {

  constructor() {
    super();
    this.state = {
      editMode: false,
      editMateId: null,
      filter: ""
    }
  }

  search(ev) {
    this.setState({ filter: ev.target.value });
  }

  editOn(id) {

    return (() => {
      this.setState({ editMode: true, editMateId: id });
    });
  }

  editOff() {
    this.setState({ "editMode": false, editMateId: null });
  }

  remove(id) {
    return (() => {
      MatesStore.remove(id);
    })
  }

	render() {
    const db = this.props.db;
    const filter = this.state.filter;

		return (
			<div className="container">
        <Row className="show-grid">
          <Col  xs={6} md={4}>
            <FormGroup>
              <FormControl
                type="text"
                label="Поиск"
                value={ this.state.filter }
                onChange={ this.search.bind(this) }
                placeholder="Поиск"
                bsSize="sm"
              />
            </FormGroup>
          </Col>
        </Row>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { db.map((item, index) => {
              const fullString = `${item.name.first}${item.name.last}${item.age}${item.email}`;

              if (!~fullString.toLowerCase().indexOf(filter.toLowerCase())) {
                return null;
              }

              return (
                <tr key={ index }>
                  <td>{ index + 1 }</td>
                  <td>{ item.name.first }</td>
                  <td>{ item.name.last }</td>
                  <td>{ item.age }</td>
                  <td>{ item.email }</td>
                  <td>
                    <a onClick={ this.editOn.call(this, index) }>Edit</a>
                    <a onClick={ this.remove.call(this, index) }>Delete</a>
                  </td>
                </tr>
              )
            }) }
          </tbody>
        </Table>
        <Button onClick={ this.editOn.call(this, null) }>Создать</Button>
        <EditMater
          mateId={ this.state.editMateId }
          isShow={ this.state.editMode }
          hide={ this.editOff.bind(this) }
        />
      </div>
		)
	}
}

export default MatersList;
