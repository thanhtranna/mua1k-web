// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';

const notifyModal = ({
    id,
    title,
    message,
    btnText,
    messageKey,
}) => {
    return (
        <div className="modal fade modal-common-small" id={id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <div className="button-area-2">
                            <button
                                type="button"
                                className={
                                    cx({
                                        'btn': true,
                                        'btn-square': true,
                                        'btn-green-2': messageKey === 'exchange_coin_success',
                                        'btn-pink': messageKey !== 'exchange_coin_success',
                                    })
                                }
                                data-dismiss="modal"
                            >
                                {btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

notifyModal.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    btnText: PropTypes.string,
    messageKey: PropTypes.string,
};

notifyModal.defaultProps = {
    id: '',
    title: 'Message',
    message: '',
    btnText: 'Close',
    messageKey: '',
};

export default notifyModal;
