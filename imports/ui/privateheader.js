import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="private-header">
            <div className="private-header__content">
                <h1 className="private-header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

//to use proptypes in statless functional components, export at the bottom
export default PrivateHeader;