/*
Import external libraries
*/
import React, {
    Component
} from "react";
import PropTypes from 'prop-types';
import {
    Formik
} from "formik";
import * as Yup from 'yup';
import {
    EditorState
} from 'draft-js';

/*
Material UI
*/
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

/*
Custom Form
*/
import Form from "./Form";

/*
Validation
*/
const validationSchema = Yup.object({
    email: Yup.string("Enter a Email address").required("E-mail is required").min(2).max(128),
    password: Yup.string("Enter a password").required("Password is required").min(2).max(128),

});

/*
Styling
*/
const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
            .spacing.unit * 5}px`
    },
    container: {

    }
});

class UserForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {

        user: {
            email: "",
            password: "",
        },
    };

    componentWillMount() {
        // this.loadCategories();

        if (this.props.userId) {
            this.loadUser(this.props.userId);
        }
    }

    // loadCategories = async () => {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             mode: 'cors',
    //             cache: 'default'
    //         };

    //         const response = await fetch('/api/v1/categories', options);
    //         console.log(response);
    //         const responseJson = await response.json();
    //         if (responseJson) {
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                 categories: responseJson
    //             }));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    loadUser = async (userId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/users/${userId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    user: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const {
            userId
        } = this.props;

        if (userId) {
            this.updateUser(userId, values);
        } else {
            this.saveUser(values);
            console.log('save user')
        }

    }

    saveUser = async (userData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/users', options);
            //console.log(JSON.stringify(userData));
            const responseJson = await response.json();

            if (responseJson) {
                console.log(responseJson);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async (userId, userData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/users/${userId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            user: values
        } = this.state;

        console.log(values);

        return (<React.Fragment >
            <div className={
                classes.container
            } >
                <
                    Paper className={
                        classes.paper
                    } >
                    <
                        Formik render={
                            props => < Form {
                                ...props
                            }
                                categories={
                                    this.state.categories
                                }
                            />}
                        initialValues={
                            values
                        }
                        validationSchema={
                            validationSchema
                        }
                        onSubmit={
                            (values, actions) => this.submit(values, actions)
                        }
                        enableReinitialize={
                            true
                        }
                    /> </Paper >
            </div> </React.Fragment >
        );
    }
}

export default withStyles(styles)(UserForm);