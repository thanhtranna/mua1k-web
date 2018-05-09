// @flow weak

import React from 'react';
import PropTypes from "prop-types";

const confirmModal = ({
    id,
    title,
    message,
    btnConfirmText,
    btnDiscardText,
    hrefConfirmBtn,
    onClickConfirmBtn,
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
                            <button type="button" className="btn btn-pink btn-square" data-dismiss="modal">{btnDiscardText}</button>
                            <button
                                type="button"
                                className="btn btn-green-2 btn-square"
                                data-dismiss="modal"
                                data-toggle="modal"
                                onClick={onClickConfirmBtn}
                                href={hrefConfirmBtn}
                            >
                                {btnConfirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

confirmModal.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    btnConfirmText: PropTypes.string,
    btnDiscardText: PropTypes.string,
    hrefConfirmBtn: PropTypes.string,
    onClickConfirmBtn: PropTypes.func,
};

confirmModal.defaultProps = {
    id: '',
    title: 'Confirm',
    message: '',
    btnConfirmText: 'Yes',
    btnDiscardText: 'No',
    hrefConfirmBtn: '',
    onClickConfirmBtn: null,
};

export default confirmModal;
