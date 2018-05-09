// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';
import Paginate from 'react-js-pagination';

const Pagination = ({
       data,
       page,
       pages,
       limit,
       total,
       onChange
   }) => {
    return (
        <div className="clearfix text-center">
            {
                data.length > 0 ?
                    (
                        <Paginate
                            activePage={page}
                            itemsCountPerPage={limit}
                            totalItemsCount={total}
                            pageRangeDisplayed={(pages > 10) ? 10 : pages}
                            onChange={onChange}
                        />
                    )
                    :
                    null
            }
        </div>
    );
};

Pagination.propTypes = {
    data: PropTypes.array,
    page: PropTypes.number,
    pages: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func
};

Pagination.defaultProps = {
    data: [],
    page: 1,
    pages: 1,
    limit: 10,
    total: 0
};

export default Pagination;
