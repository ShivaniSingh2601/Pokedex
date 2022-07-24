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
    const [openModal, setOpenModal] = useState(false);
    const [onePokemonData, setOnePokemonData] = useState();

    useEffect(() => {
        if (pokeData) {
            setPokeData([]);
            fetchApi();
        }
    }, [offsetValue, limitValue]);


    useEffect(() => {
        console.log("onePokemonData", onePokemonData);
    }, [onePokemonData]);

    const fetchApi = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitValue}&offset=${offsetValue}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPokeData(data.results)
            })
    }

    const fetchPokeData = (id) => {
        setOpenModal(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
            .then(data => {
                setOnePokemonData(data.stats);
            })
            .catch(err => console.log(err));
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
                                <a className="btn btn-warning" onClick={() => fetchPokeData(index + 1)}>View More</a>
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

            {openModal &&
                <div className="modal d-block animate__animated animate__slideInDown" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content detail-modal">
                            <div className="modal-header">
                                <h5 className="modal-title">Pokemon Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpenModal(false)}></button>
                            </div>
                            <div className="modal-body row">
                                {onePokemonData && onePokemonData.map((data) => <ul className="col-md-6 my-1 card py-1 px-1 list-style-none">
                                    <li><p className="">Base Stat: {data.base_stat}</p></li>
                                    <li><p className="">Effort: {data.effort}</p></li>
                                    <li><p className="">Stat Name: {data.stat.name}</p></li>
                                </ul>
                                )
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
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
