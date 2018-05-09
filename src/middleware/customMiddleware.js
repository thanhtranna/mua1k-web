// @flow weak
import { FILTER_LIST_AUCTIONS } from '../constants/auctionType';
import _ from 'lodash';

/* eslint-disable no-unused-vars */
export const customMiddleware = store => next => action => {
  //Filter middleware
  if (action.type === FILTER_LIST_AUCTIONS) {
    switch (action.filterTypeAuction) {
      case 1:
        action.auctions = _.orderBy(
          action.auctions,
          ['aid', 'createdAt'],
          ['desc', 'desc']
        );
        break;
      case 2:
        action.auctions = _.orderBy(action.auctions, ['expiredAt'], ['asc']);
        break;
      case 3:
        action.auctions = _.orderBy(action.auctions, ['startAt'], ['desc']);
        break;
      case 4:
        action.auctions = _.orderBy(
          action.auctions,
          ['product.chanceNumber'],
          ['desc']
        );
        break;
      case 5:
        action.auctions = _.orderBy(
          action.auctions,
          ['product.chanceNumber'],
          ['asc']
        );
        break;
      default:
        break;
    }
  }
  next(action);
};
/* eslint-enable no-unused-vars */
