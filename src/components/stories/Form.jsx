import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addStory } from '../../actions/stories';

export class Form extends Component {
    state = {
        name: '',
        email: '',
        message: ''
    };

    static propTypes = {
        addStory: PropTypes.func.isRequired
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = this.state;
        const story = { name, email, message };
        this.props.addStory(story);
    };

    render() {
        const { name, email, message  } = this.state;
        return (
            <div>
                <h1>Contribution Form</h1> 
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div>
                        <label>E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div>
                        <label>Message</label>
                        <input
                            type="text"
                            name="message"
                            onChange={this.onChange}
                            value={message}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { addStory })(Form);
