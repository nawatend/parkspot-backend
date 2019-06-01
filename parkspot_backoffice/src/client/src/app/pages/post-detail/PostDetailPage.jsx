/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Import internal libraries
*/
import Api from '../../services';
import PostDetail from '../../components/post-detail';

class PostDetailPage extends Component {
    state = {
        post: null,
    };

    componentWillMount() {
        this.loadPost(this.props.match.params.id);
    }

    loadPost = (id) => {
        Api.findOnePost(id)
            .then((data) => {
                this.setState(prevState => ({
                    ...prevState,
                    post: data
                }));
            })
            .catch((error) => {

            });
    }

    render() {
        const { post } = this.state;
        console.log(post);
        return (
            <React.Fragment>
                <PostDetail data={post} />
            </React.Fragment>
        )
    }
}

export default (PostDetailPage);