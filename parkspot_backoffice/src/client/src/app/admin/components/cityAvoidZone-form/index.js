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
        cityId: Yup.string("Select a City Name").required(false),
        avoidZoneId: Yup.string("Select a Avoid Zone Name").required(false),

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

class CityAvoidZoneForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        avoidZones: [],
        cities: [],
        cityAvoidZone: {
            cityId: "",
            avoidZoneId: "",
        },
    }


    componentWillMount() {
        this.loadAvoidZones();
        this.loadCities();
        if (this.props.cityAvoidZoneId) {
            this.loadCityAvoidZone(this.props.cityAvoidZoneId);
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

    loadCities = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/cities', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    cities: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }



    loadCityAvoidZone = async (cityAvoidZoneId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/cityAvoidZones/${cityAvoidZoneId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    cityAvoidZone: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const { cityAvoidZoneId } = this.props;

        if (cityAvoidZoneId) {
            this.updateCityAvoidZone(cityAvoidZoneId, values);
        } else {
            this.saveCityAvoidZone(values);
        }

    }

    saveCityAvoidZone = async (cityAvoidZoneData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cityAvoidZoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/cityAvoidZones', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateCityAvoidZone = async (cityAvoidZoneId, cityAvoidZoneData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cityAvoidZoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/cityAvoidZones/${cityAvoidZoneId}`, options);
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
        const { cityAvoidZone: values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} avoidZones={this.state.avoidZones} cities={this.state.cities} />}
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

export default withStyles(styles)(CityAvoidZoneForm);