/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Autocomplete from 'react-autocomplete';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import items from 'assets/items.json';

import LoginModal from 'components/LoginModal';
import RegisterModal from 'components/RegisterModal';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectHeader, makeSelectRegisterError , makeSelectLoginError, makeSelectLoggedIn, makeSelectUUID } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginRequest, registerError, registerRequest, logout, checkLogin } from './actions'

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(checkLogin());
  }

  login(username, password) {
    this.props.dispatch(loginRequest(username, password));
  }

  register(username, password1, password2, code) {
    if (password1 != password2) {
      this.props.dispatch(registerError('passwords-differ'));
    } else {
      this.props.dispatch(registerRequest(username,password1,code))
    }
  }

  onSelectItem(val, item) {
    this.setState({value: val});
    this.props.dispatch(push(`/echange/${item.slug}+${item.meta}`));
  }

  render() {
    const registerModal = !this.props.loggedIn && this.state.registerModal;
    const loginModal = !this.props.loggedIn && this.state.loginModal;

    return (
      <FlexDiv>
        <h1 style={{flex: 1, margin: 0, marginLeft: '2em', fontSize: '1.5em'}}>Grand Marché</h1>
        <Autocomplete
          items={items}
          shouldItemRender={(item, value) => value.length > 2 && item.fr_name.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={(item) => item.fr_name}
          menuStyle={{
            display: 'grid',
            position: 'absolute',
            top: '30px',
            left: 0,
            right: 0,
            zIndex: 1,
            //  gridTemplateColumns: 'repeat(auto-fill,minmax(160px, 1fr))'
            grid: 'auto-flow / 1fr 1fr 1fr'
          }}
          renderItem={(item, isHighlighted) =>
            <div key={`${item.id}:${item.meta}`}
              style={{
                background: '#ffffff',
                border: `1px solid ${isHighlighted ? '#cccccc' : '#777777'}`,
              }}>
              <img src={`/assets/images/items/${item.img}`} />
              {item.fr_name}
            </div>
          }
          renderInput={(props) =>
            <input {...props} style={{
              border: '1px solid #8b8b8b',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
              height: '2em',
              padding: '5px',
              width: '100%',
            }}/>
          }
          wrapperStyle={{
            flex: 5,
            margin: '10px 10px',
            position: 'relative'
          }}
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
          onSelect={this.onSelectItem}
        />

        {this.props.loggedIn ? (<button onClick={(event) => this.props.dispatch(logout())} style={{flex: 1}}>Logout</button>) :
        (<button onClick={(event) => this.setState({loginModal: true})} style={{flex: 1}}>Login</button>)
        }


        <LoginModal callRegister={() => this.setState({loginModal: false, registerModal: true})} login={this.login} loginError={this.props.loginError} display={loginModal} cancelModal={(event) => this.setState({loginModal: false})} />

        <RegisterModal register={this.register} registerError={this.props.registerError} display={registerModal} cancelModal={(event) => this.setState({registerModal: false})} />
      </FlexDiv>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  registerError: makeSelectRegisterError(),
  loginError: makeSelectLoginError(),
  loggedIn: makeSelectLoggedIn(),
  uuid: makeSelectUUID(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
