
import { fromJS } from 'immutable';
import vaultReducer from '../reducer';

describe('vaultReducer', () => {
  it('returns the initial state', () => {
    expect(vaultReducer(undefined, {})).toEqual(fromJS({}));
  });
});
