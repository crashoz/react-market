/**
 *
 * Vault
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import VaultItem from 'components/VaultItem';

import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLoggedIn } from 'containers/Header/selectors';
import { loadVault } from './actions';
import { makeSelectVault, makeSelectVaultData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0 0;
  padding: 0 0;
  display: grid;
  grid: auto-flow / repeat(10, 1fr);

  @media (max-width: 700px) {
    grid: auto-flow / repeat(10, 1fr);
  }
  @media (max-width: 400px) {
    grid: auto-flow / repeat(5, 1fr);
  }
`;

const Container = styled.div`
  margin: 10px 10px;
`;

export class Vault extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadVault());
  }

  render() {
    if (!this.props.loggedIn) {
      return (
          <Container>
            <p>Connectez vous pour voir votre coffre</p>
          </Container>
        )
    }
    return (
      <Container>
        <h1>Coffre Personnel</h1>
        <Ul>
          {this.props.vaultData.map((elt) => (<VaultItem item={elt} />))}
        </Ul>
      </Container>
    );
  }
}

Vault.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vault: makeSelectVault(),
  vaultData: makeSelectVaultData(),
  loggedIn: makeSelectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'vault', reducer });
const withSaga = injectSaga({ key: 'vault', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Vault);
