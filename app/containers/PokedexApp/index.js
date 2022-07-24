/**
 *
 * PokedexApp
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPokedexApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function PokedexApp() {
    useInjectReducer({ key: 'pokedexApp', reducer });
    useInjectSaga({ key: 'pokedexApp', saga });

    return (
        <React.Fragment>
            <Helmet>
                <title>PokedexApp</title>
                <meta name="description" content="Description of PokedexApp" />
            </Helmet>
            <div className="container">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

PokedexApp.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    pokedexApp: makeSelectPokedexApp(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(PokedexApp);
