import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="header-1"><Payments /></li>,
                    <li key="header-3" style={{ margin: '0 10px'}}>Credits: { this.props.auth.credits }</li>,
                    <li key="header-2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="row">
                <nav className="col s12">
                    <div className="nav-wrapper">
                        <Link 
                            // si estoy logeado me lleva a surveys
                            // si no me lleva a root
                            to={this.props.auth ? '/surveys' : '/'} 
                            className="left brand-logo"
                        >
                            Emaily
                        </Link>
                        <ul className="right">
                            { this.renderContent() }
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Header);