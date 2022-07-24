/**
 *
 * PokedexApp
 *
 */

import React, { memo, useState, useEffect } from 'react';
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

    const [pokeData, setPokeData] = useState([]);
    const [offsetValue, setOffsetValue] = useState(0);
    const [limitValue, setLimitValue] = useState(20);

    useEffect(() => {
        if (pokeData) {
            setPokeData([]);
            fetchApi();
        }
    }, [offsetValue, limitValue]);

    const fetchApi = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitValue}&offset=${offsetValue}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPokeData(data.results)
            })
    }

    const pageChangeHandler = (action) => {
        if (action === "next") {
            console.log("next");
            setLimitValue(limitValue + 20);
            setOffsetValue(offsetValue + 20);
        } else {
            console.log("previous");
            setLimitValue(limitValue - 20);
            setOffsetValue(offsetValue - 20);
        }
    };

    // const pageChangeHandler = (action) => {
    //     let offset;
    //     if (action === "next") {
    //         offset = offsetValue + 20;
    //     } else {
    //         offset = offsetValue - 20;
    //     }
    //     setOffsetValue(offset);
    // }

    return (
        <React.Fragment>
            <Helmet>
                <title>PokedexApp</title>
                <meta name="description" content="Description of PokedexApp" />
            </Helmet>
            <div className="container my-3">
                <h1 className="header-text">Pokedex App</h1>
                <ul className="list-style-none row">
                    {pokeData && pokeData.map((item, index) => <li key={index} className="col-md-4 my-1">
                        <div className="card">
                            <div className="card-image">
                                <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`} className="card-img-top" alt="pokedex-image" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-warning text-capitalize">{item.name}</h5>
                                <h6 className="text-info">ID: {index + 1}</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-warning">View More</a>
                            </div>
                        </div>
                    </li>
                    )
                    }
                </ul>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" onClick={() => pageChangeHandler("prev")}
                        disabled={offsetValue <= 0}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={() => pageChangeHandler("next")}>Next &rarr;</button>
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
