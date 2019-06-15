/*
Import external libraries
*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Formik } from "formik";
import * as Yup from 'yup';
import { EditorState } from 'draft-js';

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
const validationSchema = Yup.object(
    {
        user_id: Yup.string("Enter a user id").required("User ID is required").min(2).max(128),
        zoneId: Yup.string("Enter a zone id").required("Zone ID is required").min(2).max(128),
        price_per_hour: Yup.number("Enter a pricePerHourId between 0 to 10").required("price_per_hour is required").min(0).max(10),
        distance_from_destination: Yup.number("Enter a distance_from_destination between 0 to 1000 m").required("distance_from_destination is required").min(0).max(1000),
        bankcontact: Yup.boolean("True or False bankcontact").required("bankcontact is required"),
        low_emission_zone: Yup.boolean("True or False low_emission_zone").required("low_emission_zone is required"),
        underground: Yup.boolean("True or False underground").required("underground is required"),
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

class SettingForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        zones: [],
        setting: {
            user_id: "",
            zoneId: "", 
            price_per_hour: "", 
            distance_from_destination: "",
            backcontact: "", 
            low_emission_zone: "", 
            underground: "",
        },
    }


    componentWillMount() {
        this.loadZones();

        if (this.props.settingId) {
            this.loadSetting(this.props.settingId);
        }
    }

    loadZones = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/zones', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    zones: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    loadAvoidZones = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/avoidZones', options);
            console.log(response);
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

    loadSetting = async (settingId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/settings/${settingId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    setting: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const { settingId } = this.props;

        if (settingId) {
            this.updateSetting(settingId, values);
        } else {
            this.saveSetting(values);
        }

    }

    saveSetting = async (settingData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settingData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/settings', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateSetting = async (settingId, settingData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settingData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/settings/${settingId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { setting: values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} zones={this.state.zones} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SettingForm);