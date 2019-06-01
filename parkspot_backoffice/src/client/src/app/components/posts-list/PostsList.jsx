/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

/*
Styling
*/
import './PostsList.scss'

class PostsLists extends Component {
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }
    render() {
        const { posts } = this.props;

        return (
            <React.Fragment>
                {posts && posts.map( (post, index) => (
                    <article key={ post.id } className={classNames("post--small")}>
                        <h1 className="post__title">{ post.title }</h1>
                        <div className="post__synopsis">{ post.synopsis }</div>
                        <button onClick={(ev) => this.readMoreHandler(ev, post.id)}>More</button>
                    </article>
                ))}
            </React.Fragment>
        );
    }
}

export default (PostsLists);