import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStories, deleteStory } from '../../actions/stories';


export class Stories extends Component {
    static propTypes = {
        stories: PropTypes.array.isRequired,
        getStories: PropTypes.func.isRequired,
        deleteStory: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getStories();
    }

    render() {
        return (
            <div>
                <h1>Story List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>EMail</th>
                            <th>Message</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.stories.map(story => (
                            <tr key={story.id}>
                                <td>{story.id}</td>
                                <td>{story.name}</td>
                                <td>{story.email}</td>
                                <td>{story.message}</td>
                                <td><button onClick={this.props.deleteStory.bind(this, story.id)}>Delete</button></td>
                            </tr>
                        )) } 
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    stories: state.stories.stories
})

export default connect(mapStateToProps, { getStories, deleteStory })(Stories);
