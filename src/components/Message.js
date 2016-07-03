import * as React from 'react';

class Message extends React.Component {
    static propTypes = {
        lng: React.PropTypes.string,
    }
    constructor(props){
        super(props);
        this.state = {
            messageText: '',
            lng:this.props.lng
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({lng:nextProp.lng});

    }
    
    componentDidMount(){
        const { props,state } = this;
        document.addEventListener('languageChanged',(e)=>{
            $.ajax({
                url:'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=es-'+this.state.lng+'&key=trnsl.1.1.20160702T062231Z.b01e74e50f545073.41cbb76d976818cfaa0e1ac3ac78b561079e3420&text='+props.messageText,
                method:"POST",
                contentType: 'application/x-www-form-urlencoded',
            }).success((data)=>{
                this.setState({
                    messageText: data.text[0]

                    //set variable to data
                });

                //console.log(this.state);
            })
        });
    
        $.ajax({
            url:'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=es-'+props.lng+'&key=trnsl.1.1.20160702T062231Z.b01e74e50f545073.41cbb76d976818cfaa0e1ac3ac78b561079e3420&text='+props.messageText,
            method:"POST",
            contentType: 'application/x-www-form-urlencoded',
        }).success((data)=>{
            this.setState({
                messageText: data.text[0]
    
                //set variable to data
            });

            //console.log(this.state);
        })
    
    }

    componentWillUnmount() {
        //document.removeEventListener('languageChanged');
    }
        
    render() {
        const { props,state } = this;
        const messageObj = props.message;
        const imgURL = '//robohash.org/' + messageObj.Who + '?set=set2&bgset=bg2&size=70x70';
        const messageDate = new Date(messageObj.When);
        const messageText = state.messageText;
        const messageDateTime = messageDate.toLocaleDateString() +
            ' at ' + messageDate.toLocaleTimeString();
        var classes = 'message-item avatar' ;
        var me = props.userID == messageObj.Who ? ' me':'';

        classes = classes + me;
        return (
            <li className={classes}>
                <div className="tint"><img src={ imgURL } alt={ messageObj.Who } className="circle" /></div>
                <span className="title">Anonymous robot #{ messageObj.Who }</span>
                <p className="message-text">
                    <span>{messageText}</span>
                </p>
                <span className="message-date">{ messageDateTime }</span>
            </li>
        );
    }
}

export default Message;