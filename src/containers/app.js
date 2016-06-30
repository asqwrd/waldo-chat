import React from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';
import ChatUsers from '../components/ChatUsers';
import ChatUsersTyping from '../components/ChatUsersTyping';
import {
    setCurrentUserID,
    addMessage,
    addHistory,
    addUser,
    removeUser,
    addTypingUser,
    removeTypingUser,
} from '../actions';

function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    userID: state.app.get('userID'),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
    users: state.app.get('users').toJS(),
    usersTyping: state.app.get('usersTyping').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
    addUser: (userID) => dispatch(addUser(userID)),
    removeUser: (userID) => dispatch(removeUser(userID)),
    addTypingUser: (userID) => dispatch(addTypingUser(userID)),
    removeTypingUser: (userID) => dispatch(removeTypingUser(userID)),
  };
}

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    userID: React.PropTypes.number,
    addMessage: React.PropTypes.func,
    setUserID: React.PropTypes.func,
    addHistory: React.PropTypes.func,
    lastMessageTimestamp: React.PropTypes.string,
    users: React.PropTypes.array,
    addUser: React.PropTypes.func,
    removeUser: React.PropTypes.func,
    usersTyping: React.PropTypes.array,
    addTypingUser: React.PropTypes.func,
    removeTypingUser: React.PropTypes.func,
  };

  componentDidMount() {
    const ID = Math.round(Math.random() * 1000000);
    this.props.setUserID(ID);
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-4d0f43b0-ff8d-4143-9fce-8adb0639c9f3',
      subscribe_key: 'sub-c-779a8948-3e64-11e6-85a4-0619f8945a4f',
      ssl: (location.protocol.toLowerCase() === 'https:'),
      uuid: ID,
    });
    this.PubNub.subscribe({
      channel: 'DemoChat',
      message: this.props.addMessage,
      presence: this.onPresenceChange,
    });
    this.fetchHistory();
    window.addEventListener('beforeunload', this.leaveChat);
  }

  componentWillUnmount() {
    this.leaveChat();
  }

  onPresenceChange = (presenceData) => {
    switch (presenceData.action) {
      case 'join':
        this.props.addUser(presenceData.uuid);
        break;
      case 'leave':
      case 'timeout':
        this.props.removeUser(presenceData.uuid);
        break;
      case 'state-change':
        if (presenceData.data) {
          if (presenceData.data.isTyping === true) {
            this.props.addTypingUser(presenceData.uuid);
          } else {
            this.props.removeTypingUser(presenceData.uuid);
          }
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { props, sendMessage, fetchHistory, setTypingState } = this;
    return (
        <div className="message-container">
          <ChatUsers users={ props.users } />
          <ChatHistory userID={ props.userID } history={ props.history } fetchHistory={ fetchHistory } />
          <ChatUsersTyping usersTyping={ props.usersTyping } />
          <ChatInput userID={ props.userID } sendMessage={ sendMessage } setTypingState={ setTypingState } />
        </div>
    );
  }

  setTypingState = (isTyping) => {
    this.PubNub.state({
      channel: 'DemoChat',
      uuid: this.props.userID,
      state: { isTyping },
    });
  };

  leaveChat = () => {
    this.PubNub.unsubscribe({ channel: 'DemoChat' });
  }

  fetchHistory = () => {
    const { props } = this;
    this.PubNub.history({
      channel: 'DemoChat',
      count: 15,
      start: props.lastMessageTimestamp,
      callback: (data) => {
        // data is Array(3), where index 0 is an array of messages
        // and index 1 and 2 are start and end dates of the messages
        props.addHistory(data[0], data[1]);
      },
    });
  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'DemoChat',
      message: message,
    });
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
