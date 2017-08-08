import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
    const navImgSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

    return (
        <div className="private-header">
            <div className="private-header__content">
                <img className="private-header__nav-toggle" src={navImgSrc} onClick={props.handleNavToggle}/>
                <h1 className="private-header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
            </div>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired,
    handleNavToggle: PropTypes.func.isRequired
}

//check react-meteor-data docs for info
export default createContainer(() => {
    return {
        handleLogout: () => Accounts.logout(),
        handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
        isNavOpen: Session.get('isNavOpen')
    };
}, PrivateHeader);
