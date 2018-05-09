// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { I18n } from 'react-i18next';
import { validate } from './validation';
import { imagesPreview } from '../../../helpers';
import $ from 'jquery';
import PropTypes from 'prop-types';
// import auth                  from '../../services/auth';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // userAuth:
  nickname: string,
  avatar: string,
  token: string
};

// #endregion

class EditProfile extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handlePreviewImage = this.handlePreviewImage.bind(this);
    this.handlePickImage = this.handlePickImage.bind(this);
  }
  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // userAuth:
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  };
  // #endregion

  static defaultProps = {
    isEditting: false
  };

  state = {
    avatarInput: undefined,
    nickNameInput: '',
    avatarValue: '',
    isOK: true
  };

  // #region propTypes
  static propTypes = {
    // containers props:
    enterHelp: PropTypes.func.isRequired,
    leaveHelp: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
  };
  // #endregion

  handlePickImage(e) {
    if (e) {
      e.preventDefault();
    }
    $('#avatar-profile').click();
  }

  handlePreviewImage(e) {
    if (e.target.files[0]) {
      this.setState({
        avatarInput: e.target.files[0],
        avatarValue: e.target.value
      });
      imagesPreview(e.target.files[0], '.image_preview');
    } else {
      this.setState({ avatarValue: e.target.value });
    }
    $('#avatar-value').focus();
  }

  componentDidMount() {
    this.props.enterEditProfile();
    this.setState({ nickNameInput: this.props.nickname });
  }

  componentWillUnmount() {
    this.props.leaveEditProfile();
    this.props.resetUserStates();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
      this.setState({ isOK: false });
    } else {
      this.setState({ isOK: true });
    }
  }

  resetForm(nickname) {
    this.setState({
      avatarInput: undefined,
      nickNameInput: nickname,
      avatarValue: '',
      isOK: true
    });
  }

  renderField = ({
    input,
    placeholder,
    type,
    fieldValue,
    trans,
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="form-group">
        <label className="control-label" htmlFor="nickNameInput">
          {trans('Nickname')}
        </label>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          className={`form-control`}
          id={`nickname-profile`}
          value={fieldValue}
          onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
        />
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  renderFileInputField = ({
    input,
    type,
    fieldValue,
    trans,
    meta: { touched, error, warning }
  }) => {
    return (
      <div>
        <div className="input-group" style={{ margin: '5px 0' }}>
          <span className="input-group-btn">
            <button onClick={this.handlePickImage} className="btn btn-default">
              {trans('Browse')}
            </button>
          </span>
          <input
            {...input}
            type={type}
            className={`form-control`}
            id={`avatar-value`}
            style={{ cursor: `not-allowed` }}
            value={fieldValue}
            readOnly={true}
          />
        </div>
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  // #region on login button click callback
  handleUpdateClick = async (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const {
      updateProfile, // action
      errorBadRequest, // action
      token
    } = this.props;
    const { avatarInput, nickNameInput } = this.state;
    let formData = new FormData();
    formData.append('avatar', avatarInput);
    let newInfo = {
      nickname: nickNameInput,
      avatar: formData
    };
    try {
      console.log({ newInfo });
      updateProfile(newInfo, token);
      this.resetForm(nickNameInput);
    } catch (error) {
      errorBadRequest();
      /* eslint-disable no-console */
      console.log('send contact went wrong..., error: ', error);
      this.resetForm(this.props.nickname);
      /* eslint-enable no-console */
    }
  };
  // #endregion

  render() {
    const { avatar, nickname, isEditting, errorMessage, isError } = this.props;
    const { nickNameInput, avatarValue, isOK } = this.state;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content" style={{ minHeight: '903px' }}>
            <div>
              <div className="text-center">
                <h3 className="mgt-20">{t('Profile')}</h3>
              </div>
              <div className="mgt-20">
                <form>
                  <div className="text-center">
                    {isError ? (
                      <span className="text-danger">{t(errorMessage)}</span>
                    ) : (
                      <span className="text-success">{t(errorMessage)}</span>
                    )}
                  </div>
                  <div className="user_box_avatar col-md-offset-4">
                    <div className="image_preview">
                      <img
                        src={avatar || `/images/preview.png`}
                        alt={nickname}
                        title={nickname}
                      />
                      <input
                        type="file"
                        id="avatar-profile"
                        style={{ display: 'none' }}
                        onChange={this.handlePreviewImage}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="input-group" style={{ margin: '5px 0' }}>
                      <span className="input-group-btn">
                        <button
                          onClick={this.handlePickImage}
                          className="btn btn-default"
                        >
                          {t('Browse')}
                        </button>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="avatar-value"
                        style={{ cursor: `not-allowed` }}
                        value={avatarValue}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <Field
                    name="nickNameInput"
                    type="text"
                    component={this.renderField}
                    placeholder="Nhập biệt danh mới"
                    fieldValue={nickNameInput}
                    trans={t}
                  />
                  <div className="text-center">
                    <button
                      disabled={
                        isEditting || (isOK && nickname !== nickNameInput)
                      }
                      className="btn btn-green-2 btn-square btn-square-sm"
                      onClick={this.handleUpdateClick}
                    >
                      {isEditting ? (
                        <span>
                          {`${t('Updating')}...`}
                          &nbsp;
                          <i className="fa fa-spinner fa-pulse fa-fw" />
                        </span>
                      ) : (
                        <span>{t('Save')}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
  // #endregion
}

export default reduxForm({
  form: 'syncValidation',
  validate
})(EditProfile);
