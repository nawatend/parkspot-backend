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

    name: Yup.string("Enter a Zone name").required("Address is Zone Name").min(2).max(512),
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

class AvoidZoneForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {

        avoidZones: {

            name: "",
        },
    };

    componentWillMount() {
        // this.loadCategories();

        if (this.props.avoidZonesId) {
            this.loadAvoidZone(this.props.avoidZonesId);
        }
    }

    // loadCategories = async () => {
    //     try {
    //         const options = {
    //             method: 'GET',
    //             mode: 'cors',
    //             cache: 'default'
    //         };

    //         const response = await fetch('/api/v1/avoidZones', options);
    //         console.log(response);
    //         const responseJson = await response.json();
    //         if (responseJson) {
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                 avoidZones: responseJson
    //             }));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    loadAvoidZone = async (avoidZonesId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/avoidZones/${avoidZonesId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    avoidZones: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const {
            avoidZonesId
        } = this.props;

        if (avoidZonesId) {
            this.updateAvoidZone(avoidZonesId, values);
        } else {
            this.saveAvoidZone(values);
            console.log('save avoidZones')
        }

    }

    saveAvoidZone = async (avoidZonesData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(avoidZonesData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/avoidZones', options);
            //console.log(JSON.stringify(avoidZonesData));
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

    updateAvoidZone = async (avoidZonesId, avoidZonesData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(avoidZonesData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/avoidZones/${avoidZonesId}`, options);
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
            avoidZones: values
        } = this.state;

        console.log(values);

        return (
            < React.Fragment >
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
                                    avoidZones={
                                        this.state.avoidZones
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

export default withStyles(styles)(AvoidZoneForm);