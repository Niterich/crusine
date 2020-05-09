import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Brand from "./Brand";
import Container from "react-bootstrap/Container";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach((val) => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

class SignupPage extends Component {

    state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            username: "",
            password: "",
            
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                username: "",
                password: "",
                truckName: "",
                },
                loginStatus: false

        };

    handleSubmit = (e) => {
        e.preventDefault();
        // Possible change: send data from state, not from the DOM form element
        if (formValid(this.state)) {

            let data = new FormData(e.target);
            
            // fetch('/signup', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         firstName: e.target.firstName.value,
            //         lastName: e.target.lastName.value,
            //         email: e.target.email.value,
            //         phoneNumber: e.target.phoneNumber.value,
            //         username: e.target.username.value,
            //         password: e.target.password.value,
            //     }),
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //   })
            //   .then(response => response.json())
            //   .then(({ accessToken }) => {
            //         localStorage.setItem('loginToken', accessToken);
                    
            //         this.props.history.push('/truck');
            //   })

            data = {...this.state};


            delete data.formErrors;

            axios.post('/api/createuser', data).then(rest => {
                this.props.handleChange(rest.data.user.id);
                this.setState({ loginStatus: true });
            });



        } else {
            console.log("form is not valid");
        }
    };
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 2
                        ? "minimum 2 characters required"
                        : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3
                        ? "minimum 3 characters required"
                        : "";
                break;
            case "email":
                formErrors.email =
                    emailRegex.test(value)
                        ? ""
                        : "invalid email address";
                break;
            case "phoneNumber":
                formErrors.phoneNumber =
                    value.length < 10
                        ? "phone number must be exactly 10 numbers"
                        : "";
                break;
            case "username":
                formErrors.username =
                    value.length < 5
                        ? "minimum 5 characters required"
                        : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 8
                        ? "minimum 8 characters required"
                        : "";
                break;
            case "truckName":
                formErrors.truckName =
                    value.length < 5
                        ? "minimum 5 characters required"
                        : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, (res) => res);
    };
    render() {
        const { formErrors } = this.state;
        if (this.state.loginStatus) {
            return <Redirect to="/dashboard" />
        } else
        return (
            <div className="login">
                <Container className="login d-flex align-items-center w-100">
                    <Row className="justify-content-center w-100">
                        <Jumbotron className="col-8">
                            <Brand />
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="firstName">
                                                First Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your first name"
                                                name="firstName"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.firstName.length >
                                                0 && (
                                                    <span className="errorMessage">
                                                        {formErrors.firstName}
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="lastName">
                                                Last Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your last name"
                                                name="lastName"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.lastName.length > 0 && (
                                                <span className="errorMessage">
                                                    {formErrors.lastName}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="email">
                                                Email
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@url.com"
                                                name="email"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.email.length > 0 && (
                                                <span className="errorMessage">
                                                    {formErrors.email}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="phoneNumber">
                                                Phone Number
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="5555555555 (no dashes)"
                                                name="phoneNumber"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.phoneNumber.length >
                                                0 && (
                                                    <span className="errorMessage">
                                                        {formErrors.phoneNumber}
                                                    </span>
                                                )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="username">
                                                Username
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.username.length > 0 && (
                                                <span className="errorMessage">
                                                    {formErrors.username}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="password">
                                                Password
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />
                                            {formErrors.password.length > 0 && (
                                                <span className="errorMessage">
                                                    {formErrors.password}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col className="col-6">
                                        <Form.Group>
                                            <Form.Label htmlFor="truckName">
                                                What is your Truck's name?
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Truck name"
                                                name="truckName"
                                                formNoValidate
                                                onChange={this.handleChange}
                                            />{formErrors.truckName.length > 0 && (
                                                <span className="errorMessage">{formErrors.truckName}</span>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Button
                                        className="landing-btn col-4 mt-3"
                                        variant="primary"
                                        type="submit"
                                    // userID={this.state.user}
                                    >
                                        Submit
                                    </Button>
                                </Row>
                                <Row className="justify-content-center">
                                    <a className="mt-3 teal" href="/">
                                        Already a member? Sign in here
                                    </a>
                                </Row>
                            </Form>
                        </Jumbotron>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default SignupPage;