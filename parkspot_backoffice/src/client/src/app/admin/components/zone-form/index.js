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
    name: Yup.string("Enter a name").required("Name is required").min(2).max(128),

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

class ZoneForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        zone: {
            name: "",
        },
    };

    componentWillMount() {
        // this.loadCategories();

        if (this.props.zoneId) {
            this.loadZone(this.props.zoneId);
        }
    }


    loadZone = async (zoneId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/zones/${zoneId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    zone: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const {
            zoneId
        } = this.props;

        if (zoneId) {
            this.updateZone(zoneId, values);
        } else {
            this.saveZone(values);
            console.log('save zone')
        }

    }

    saveZone = async (zoneData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(zoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/zones', options);
            //console.log(JSON.stringify(zoneData));
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

    updateZone = async (zoneId, zoneData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(zoneData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/zones/${zoneId}`, options);
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
            zone: values
        } = this.state;

        console.log(values);

        return (<React.Fragment >
            < div className={classes.container} >
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

export default withStyles(styles)(ZoneForm);