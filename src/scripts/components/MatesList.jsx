'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import MatesStore from '../store/MatesStore';

@observer
class MatersList extends React.Component {

  constructor() {
    super();

    this.filter = observable.box("");
  }

  @action
  search(ev) {
		this.filter.set(ev.target.value);
  }

  remove(id) {
    return (() => {
      MatesStore.remove(id);
    })
  }

	render() {
    const db = MatesStore.db;
    const filter = this.filter.get();

		return (
      <div className="container">
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <FormGroup>
              <FormControl
                type="text"
                label="Поиск"
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
                  <Link to={`/edit/${item.guid}`}>Edit</Link>
                  <a onClick={ this.remove.call(this, index) }>Delete</a>
                </td>
              </tr>
            )
          }) }
          </tbody>
        </Table>
        <Link to="/new"><Button>Создать</Button></Link>
      </div>
		)
	}
}

export default MatersList;
