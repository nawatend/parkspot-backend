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
        zoneId: Yup.string("Select a Zone Name").required(false),
       
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

class CityZoneForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        zones: [],
        cities: [],
        cityZone: {
            cityId: "",
            zoneId:"",
        },
    }


    componentWillMount() {
        this.loadZones();
        this.loadCities();
        if (this.props.cityZoneId) {
            this.loadCityZone(this.props.cityZoneId);
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

    

    loadCityZone = async (cityZoneId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/cityZones/${cityZoneId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    cityZone: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const { cityZoneId } = this.props;

        if (cityZoneId) {
            this.updateCityZone(cityZoneId, values);
        } else {
            this.saveCityZone(values);
        }

    }

    saveCityZone = async (cityZoneData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cityZoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/cityZones', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateCityZone = async (cityZoneId, cityZoneData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cityZoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/cityZones/${cityZoneId}`, options);
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
        const { cityZone: values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props}  zones={this.state.zones} cities={this.state.cities} />}
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

export default withStyles(styles)(CityZoneForm);