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
        
        
        pricePerHourId: Yup.string("Select a Price per hour zone").required(true),
        avoidZoneId: Yup.string("Select a Avoid zone").required(false),
        zoneId: Yup.string("Select a zone").required(true),
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
        price_per_hour: [],
        distance_from_destination: [],
        avoidZones: [],
        setting: {
            zone: "", price_per_hour: "", distance_from_destination: "",
            avoidZones: {},
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