/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

/*
Styling
*/
import './PostsListPaged.scss'

class PostsListsPaged extends Component {
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }
    loadMoreHandler = (ev, pageIndex) => {
        ev.preventDefault();
        if (typeof this.props.onLoadMore === 'function') {
            this.props.onLoadMore(pageIndex);
        }
    }
    render() {
        const { posts, pagination } = this.props;

        return (
            <React.Fragment>
                {posts && posts.map( (post, index) => (
                    <article key={ post.id } className={classNames("post--small")}>
                        <h1 className="post__title">{ post.title }</h1>
                        <div className="post__synopsis">{ post.synopsis }</div>
                        <button onClick={(ev) => this.readMoreHandler(ev, post.id)}>More</button>
                    </article>
                ))}
                {posts && pagination.page < pagination.pages ? <button onClick={(ev) => this.loadMoreHandler(ev, pagination.page + 1)}>Meer laden</button>: ''}
            </React.Fragment>
        );
    }
}

export default (PostsListsPaged);