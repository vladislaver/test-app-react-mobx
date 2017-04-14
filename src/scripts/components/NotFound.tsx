'use strict';

// libs
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class NotFound extends React.Component<RouteComponentProps<{}>, any> {

	render() {
		return (
			<h1>Not found :(</h1>
		)
	}
}

export default NotFound;