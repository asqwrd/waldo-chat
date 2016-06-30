import * as React from 'react';

class ChatUsers extends React.Component {
    static propTypes = {
        users: React.PropTypes.array,
        lng: React.PropTypes.string,
        setLanguage: React.PropTypes.func,
    }

    componentDidMount() {
        $(this.refs.selectBox).material_select(this.onChange.bind(this));
    }

    onChange = () => {
        const { setLanguages } = this.props;
        setLanguages(this.refs.selectBox.value);
        console.log(this.props.lng);
    };

    render() {
        const { users } = this.props;
        const { lng } = this.props;
        const { onChange } = this;
        return (
            <div className="online-user-list">
                <div className="input-field select-box">
                    <select value='en'  ref="selectBox" onChange={onChange}>
                        <option value="">Choose your option</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
                <ul className="online-users">{
                    users.map((userID) => {
                        const name = 'Anonymous Robot #' + userID;
                        const imgURL = '//robohash.org/' + userID + '?set=set2&bgset=bg2&size=70x70';
                        return (
                            <li key={ userID } className="online-user">
                                <img title={ name } alt={ name } src={ imgURL } className="square" />
                            </li>
                        );
                    })
                }
                    <li className="online-users-number valign-wrapper online-user">
                        <span className="valign">{ users.length }</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ChatUsers;
