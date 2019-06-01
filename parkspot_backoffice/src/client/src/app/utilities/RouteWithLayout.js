import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route as ReactRoute} from 'react-router';

/*class RouteWithLayout extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    layout: PropTypes.func,
    path: PropTypes.string,
    exact: PropTypes.bool,
  }

  render = () => {
    const {component, layout, path, exact} = this.props;
    let routeComponent = props => React.createElement(component, props);

    if (layout) {
      routeComponent = props =>
        React.createElement(layout, props, React.createElement(component, props));
    }

    return <ReactRoute path={path} exact={exact} render={routeComponent}/>;
  }
}*/

const renderMergedProps = (component, layout, routeProps) => {
    return (layout) ? React.createElement(layout, routeProps, React.createElement(component, routeProps)) : React.createElement(component, routeProps);
}

const RouteWithLayout = ({ component, layout, ...rest }) => {
    return (
        <ReactRoute {...rest} render={routeProps => {
            return renderMergedProps(component, layout, routeProps);
        }}/>
    );
}

export default RouteWithLayout;