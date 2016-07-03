import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Message from '../components/Message';

class ChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    userID: React.PropTypes.number,
    fetchHistory: React.PropTypes.func,
    translate: React.PropTypes.func,
  };

  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.history.length !== this.props.history.length;
    const { messageList } = this.refs;
    const scrollPos = messageList.scrollTop;
    const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
    this.scrollAtBottom = (scrollBottom === 0) || (scrollPos === scrollBottom);

  }

  componentDidUpdate() {
    if (this.historyChanged && this.scrollAtBottom) {
        let timer = setInterval(()=>{
          const { messageList } = this.refs;
          const scrollPos = messageList.scrollTop;
          const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
          this.scrollAtBottom = (scrollBottom === 0) || (scrollPos === scrollBottom);
          if(!this.scrollAtBottom) {
            this.scrollToBottom();
          }else{
            clearInterval(timer);
          }
        },300)

    }
  }

  onScroll = () => {
    const { refs, props } = this;
    const scrollTop = refs.messageList.scrollTop;
    if (scrollTop == 0) {
      props.fetchHistory();
    }
  };

  render() {
    const { props, onScroll } = this;
    return (
        <div className="message-content" ref="messageList" onScroll={ onScroll }>
          <ul className="message-list">
            { props.history.map((messageObj,index) => {
              return <Message lng={props.lng} key={ messageObj.When + '-'+index } userID={props.userID} messageText={messageObj.What} message={messageObj}/>
            }) }
          </ul>
        </div>
    );
  }

  static scrollAtBottom = true;

  scrollToBottom = (animate) => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;

  }

  smoothScroll(element, target, duration):Promise<any> {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
      return Promise.reject("bad duration");
    }
    if (duration === 0) {
      element.scrollTop = target;
      return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
      if(point <= start) { return 0; }
      if(point >= end) { return 1; }
      var x = (point - start) / (end - start); // interpolation
      return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
      // This is to keep track of where the element's scrollTop is
      // supposed to be, based on what we're doing
      var previous_top = element.scrollTop;

      // This is like a think function from a game loop
      var scroll_frame = function() {
        if(element.scrollTop != previous_top) {
          reject("interrupted");
          return;
        }

        // set the scrollTop for this frame
        var now = Date.now();
        var point = smooth_step(start_time, end_time, now);
        var frameTop = Math.round(start_top + (distance * point));
        element.scrollTop = frameTop;

        // check if we're done!
        if(now >= end_time) {
          resolve();
          return;
        }

        // If we were supposed to scroll but didn't, then we
        // probably hit the limit, so consider it done; not
        // interrupted.
        if(element.scrollTop === previous_top
            && element.scrollTop !== frameTop) {
          resolve();
          return;
        }
        previous_top = element.scrollTop;

        // schedule next frame for execution
        setTimeout(scroll_frame, 0);
      }

      // boostrap the animation process
      setTimeout(scroll_frame, 0);
    });
  }
  
}

export default ChatHistory;
