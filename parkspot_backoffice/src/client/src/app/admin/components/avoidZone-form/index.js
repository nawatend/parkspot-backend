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

class HomeAddressForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {

        homeAddress: {
            user_id: "",
            address: "",
        },
    };

    componentWillMount() {
        // this.loadCategories();

        if (this.props.homeAddressId) {
            this.loadHomeAddress(this.props.homeAddressId);
        }
    }

    // loadCategories = async () => {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             mode: 'cors',
    //             cache: 'default'
    //         };

    //         const response = await fetch('/api/v1/homeAddresses', options);
    //         console.log(response);
    //         const responseJson = await response.json();
    //         if (responseJson) {
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                 homeAddresses: responseJson
    //             }));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    loadHomeAddress = async (homeAddressId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/homeAddresses/${homeAddressId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    homeAddress: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const {
            homeAddressId
        } = this.props;

        if (homeAddressId) {
            this.updateHomeAddress(homeAddressId, values);
        } else {
            this.saveHomeAddress(values);
            console.log('save homeAddress')
        }

    }

    saveHomeAddress = async (homeAddressData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(homeAddressData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/homeAddresses', options);
            //console.log(JSON.stringify(homeAddressData));
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

    updateHomeAddress = async (homeAddressId, homeAddressData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(homeAddressData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/homeAddresses/${homeAddressId}`, options);
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
            homeAddress: values
        } = this.state;

        console.log(values);

        return (< React.Fragment >
            <div className={classes.container} >
                <
                    Paper className={
                        classes.paper
                    } >
                    <
                        Formik render={
                            props => < Form {
                                ...props
                            }
                                homeAddresses={
                                    this.state.homeAddresses
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

export default withStyles(styles)(HomeAddressForm);