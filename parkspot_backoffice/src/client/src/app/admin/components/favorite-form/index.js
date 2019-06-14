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
    user_id: Yup.string("Enter a user id").required("User ID is required").min(2).max(128),
    address: Yup.string("Enter a address").required("Address is required").min(2).max(512),
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

class FavoriteForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {

        favorite: {
            user_id: "",
            address: "",
        },
    };

    componentWillMount() {
        // this.loadCategories();

        if (this.props.favoriteId) {
            this.loadFavorite(this.props.favoriteId);
        }
    }

    // loadCategories = async () => {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             mode: 'cors',
    //             cache: 'default'
    //         };

    //         const response = await fetch('/api/v1/favorites', options);
    //         console.log(response);
    //         const responseJson = await response.json();
    //         if (responseJson) {
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                 favorites: responseJson
    //             }));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    loadFavorite = async (favoriteId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/favorites/${favoriteId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    favorite: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const {
            favoriteId
        } = this.props;

        if (favoriteId) {
            this.updateFavorite(favoriteId, values);
        } else {
            this.saveFavorite(values);
            console.log('save favorite')
        }

    }

    saveFavorite = async (favoriteData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favoriteData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/favorites', options);
            //console.log(JSON.stringify(favoriteData));
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

    updateFavorite = async (favoriteId, favoriteData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favoriteData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/favorites/${favoriteId}`, options);
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
            favorite: values
        } = this.state;

        console.log(values);

        return ( < React.Fragment >
            <
            div className = {
                classes.container
            } >
            <
            Paper className = {
                classes.paper
            } >
            <
            Formik render = {
                props => < Form {
                    ...props
                }
                favorites = {
                    this.state.favorites
                }
                />}
                initialValues = {
                    values
                }
                validationSchema = {
                    validationSchema
                }
                onSubmit = {
                    (values, actions) => this.submit(values, actions)
                }
                enableReinitialize = {
                    true
                }
                /> </Paper >
                <
                /div> </React.Fragment >
            );
        }
    }

    export default withStyles(styles)(FavoriteForm);