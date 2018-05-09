// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import ProgressBar from '../progressBar/ProgressBar';

class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
        }
    }

    componentDidMount() {
        this.setState({
            seconds: this.props.seconds,
        });
    }

    componentWillUpdate() {
        setTimeout(() => {
            this.setState({ seconds: this.state.seconds - 1 })
        }, 1000);
    }

    render() {
        const { seconds } = this.state;
        let secondMax = process.env.REACT_APP_SECOND_WAIT_AUCTIONING;
        let h = Math.floor(seconds / 3600);
        let m = Math.floor((seconds % 3600) / 60);
        let s = seconds % 60;
        return (
            <div>
                <p className='count-down'>{`${h} : ${m} : ${s}`}</p>
                <ProgressBar
                    barSize="xs"
                    barStriped={true}
                    barStyle="success"
                    active={true}
                    valueNow={seconds / secondMax * 100}
                    valueMin={0}
                    valueMax={100}
                />
            </div>
        )
    }
}

CountDown.propTypes = {
    second: PropTypes.number,
};

CountDown.defaultProps = {
    second: 0,
};

export default CountDown;
