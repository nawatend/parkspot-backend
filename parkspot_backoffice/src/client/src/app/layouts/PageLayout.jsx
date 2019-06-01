import React from 'react';

/*
Import styling
*/
import logo from '../assets/images/logo.svg';
import './Page.scss';

class PageLayout extends React.Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <header role="header">
                    HEADER
                </header>
                <main className="main" role="main">
                    {children}
                </main>
                <footer className="footer" role="footer">
                    FOOTER
                </footer>
            </div>
        )
    }
}
export default PageLayout;