import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
    return (
        <div className="private-header">
            <div className="private-header__content">
                <h1 className="private-header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
            </div>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}

//check react-meteor-data docs for info
export default createContainer(() => {
    return {
        handleLogout: () => Accounts.logout()
    };
}, PrivateHeader);
