/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Import internal libraries
*/
import Api from '../../services';
import PostsListPaged from '../../components/posts-list-paged';

class NewsPage extends Component {
    state = {
        posts: [],
        pagination: {
            limit: 5,
            page: 1,
            pages: 1,
            total: 1,
        },
    };

    componentWillMount() {
        this.loadPosts(1);
    }

    loadPosts = (pageIndex) => {
        console.log(pageIndex);
        Api.findAllPosts({ limit: 3, skip: pageIndex })
            .then((data) => {
                const prevPosts = this.state.posts;
                const newPosts = [...prevPosts, ...data.docs];
                this.setState(prevState => ({
                    ...prevState,
                    posts: newPosts,
                    pagination: {
                        limit: data.limit,
                        page: data.page,
                        pages: data.pages,
                        total: data.total
                    },
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    goToPostDetailPage = (id) => {
        this.props.history.push(`/news/${id}`);
    }

    render() {
        const { pagination, posts } = this.state;
        return (
            <React.Fragment>
                <h1 className="hidden">Nieuws</h1>
                <section className="section section--articles">
                    <PostsListPaged posts={posts} pagination={pagination} onReadMore={this.goToPostDetailPage} onLoadMore={this.loadPosts} />
                </section>
            </React.Fragment>
        )
    }
}

export default (NewsPage);