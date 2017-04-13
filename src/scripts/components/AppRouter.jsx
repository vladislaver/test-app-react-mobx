'use strict';

// libs
import React from 'react';
import { observer } from 'mobx-react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import MatesList from './MatesList';
import EditMater from './EditMater';
import Loader from './Loader';
import NotFound from './NotFound';

import MatesStore from '../store/MatesStore';

@observer
class AppRouter extends React.Component {

	componentWillMount() {
		MatesStore.load();
	}

	render() {
		return (
			MatesStore.db.length ? (
				<HashRouter>
					<Switch>
						<Route exact path="/" component={ MatesList }/>
						<Route exact path="/edit/:id" component={ EditMater }/>
						<Route exact path="/new" component={ EditMater }/>
						<Route path="*" component={ NotFound }/>
					</Switch>
				</HashRouter>
			) : (
				<Loader />
			)
		)
	}
}

export default AppRouter;