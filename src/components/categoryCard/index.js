// @flow weak

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

export default class CategoryCard extends Component {
    constructor(props) {
        super(props);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    handleCategoryClick(e) {
        const {
            page,
        } = this.props;
        let cateName = e.target.dataset.catename,
              cateId = e.target.dataset.cateid;
        this.props.resetAuctionStates();
        this.props.getAuctionsIfNeededByCategory(cateId, cateName, page);
    }

    render() {
      const { _id, icon, name } = this.props.category;
      return (
          <div className="item" data-catename={name} data-cateid={_id} onClick={this.handleCategoryClick}>
              <Link to={`/category/${_id}`} data-catename={name} data-cateid={_id} onClick={ (event) => event.preventDefault() } >
                  <img src={icon.thumb} alt={name} data-catename={name} data-cateid={_id}/>
                  {name}
              </Link>
          </div>
      );
    }
}

CategoryCard.propTypes = {
    actions: PropTypes.shape({
        getAuctionsIfNeededByCategory: PropTypes.func.isRequired,
    }),
    category: PropTypes.object,
};

CategoryCard.defaultProps = {
    category: {},
};
