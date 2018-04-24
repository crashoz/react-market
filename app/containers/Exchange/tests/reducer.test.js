
import { fromJS } from 'immutable';
import exchangeReducer from '../reducer';

describe('exchangeReducer', () => {
  it('returns the initial state', () => {
    expect(exchangeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
