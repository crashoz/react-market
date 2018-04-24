/**
 *
 * Exchange
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectExchange, makeSelectOrderBook, makeSelectCandles } from './selectors';
import { requestOrderBook, requestBuyOrder, requestSellOrder } from './actions'
import reducer from './reducer';
import saga from './saga';

const Container = styled.div`
  margin: 10px 10px;
`;

const OrderContainer = styled.div`
  margin: 10px 10px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
`;

const OrderInput = styled.input`
  border: 1px dotted #000000;
`

export class Exchange extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.onBuyOrder = this.onBuyOrder.bind(this);
    this.onSellOrder = this.onSellOrder.bind(this);
  }

  componentDidMount() {
    const { slug, meta } = this.props.match.params;
    const item = `${slug}:${meta}`;
    this.props.dispatch(requestOrderBook(item));
  }

  onBuyOrder(event) {
    const buyPrice = event.target.buyPrice.value;
    const buyQuantity = event.target.buyQuantity.value;
    const { slug, meta } = this.props.match.params;

    this.props.dispatch(requestBuyOrder(`${slug}:${meta}`, buyQuantity, buyPrice));
    event.preventDefault();
  }

  onSellOrder(event) {
    const sellPrice = event.target.sellPrice.value;
    const sellQuantity = event.target.sellQuantity.value;
    const { slug, meta } = this.props.match.params;

    this.props.dispatch(requestSellOrder(`${slug}:${meta}`, sellQuantity, sellPrice));
    event.preventDefault();
  }

  render() {
    const orderbook = this.props.orderBook.toJS();
    console.log(orderbook);
    return (
      <Container>
        <h1>Echange</h1>
        <p>test</p>

        <FlexContainer>
          <OrderContainer>
            <Table>
              <thead>
                <tr><th>Prix</th><th>Quantité</th></tr>
              </thead>
              <tbody>
                {orderbook[1].map((elt) => (<tr key={elt._id}><td>{elt.price}</td><td>{elt.quantity}</td></tr>))}
              </tbody>
            </Table>

            <form onSubmit={this.onBuyOrder}>
              <input type="text" name="buyPrice" placeholder="Prix" />
              <input type="text" name="buyQuantity" placeholder="Quantité" />
              <OrderInput type="submit" value="Ordre d'achat" />
            </form>
          </OrderContainer>
          <OrderContainer>
            <Table>
              <thead>
                <tr><th>Prix</th><th>Quantité</th></tr>
              </thead>
              <tbody>
                {orderbook[0].map((elt) => (<tr key={elt._id}><td>{elt.price}</td><td>{elt.quantity}</td></tr>))}
              </tbody>
            </Table>

            <form onSubmit={this.onSellOrder}>
              <input type="text" name="sellPrice" placeholder="Prix" />
              <input type="text" name="sellQuantity" placeholder="Quantité" />
              <OrderInput type="submit" value="Ordre de vente" />
            </form>
          </OrderContainer>
        </FlexContainer>
      </Container>
    );
  }
}

Exchange.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  exchange: makeSelectExchange(),
  orderBook: makeSelectOrderBook(),
  candles: makeSelectCandles(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'exchange', reducer });
const withSaga = injectSaga({ key: 'exchange', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Exchange);
