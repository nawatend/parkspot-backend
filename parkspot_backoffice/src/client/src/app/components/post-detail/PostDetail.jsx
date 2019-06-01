/*
Import external libraries
*/
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import classNames from 'classnames';

/*
Styling
*/
import './PostDetail.scss'

class PostDetail extends Component {
    render() {
        const { data: post } = this.props;

        return (
            <React.Fragment>
                {post ? (
                    <article key={ post.id } className={classNames("post--large")}>
                        <h1 className="post__title">{ post.title }</h1>
                        <div className="post__synopsis">{ post.synopsis }</div>
                        <div className="post__body">{Parser(post.body)}</div>
                    </article>
                ) : '<p>LOADING</p>'}
            </React.Fragment>
        );
    }
}

export default (PostDetail);