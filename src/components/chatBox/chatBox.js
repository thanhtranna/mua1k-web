import React from 'react';
import { sendMessage } from '../../services/api';
import { Button, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import { listenMessage } from "../../services/api";
import CountDown from '../countDown';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      textReceived: '',
    };
    listenMessage(textReceived => this.setState({ textReceived: textReceived.message }));
  }

  onTextChange(input) {
    this.setState({ message: input.target.value });
  }

  render() {
    const { message, textReceived } = this.state;
    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <form className='font-horizontal'>
            <FormGroup>
              <FormControl onChange={this.onTextChange.bind(this)}/>
            </FormGroup>
            <Button onClick={() => sendMessage(message)}>SEND</Button>
            <p>{ textReceived ? textReceived : null }</p>
            <CountDown seconds={180}/>
          </form>
        </Col>
      </Row>
    );
  }
}

export default ChatBox;
