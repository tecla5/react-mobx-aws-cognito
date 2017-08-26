import { Link, Redirect } from "react-router-dom";
import ListErrors from "../lib/ListErrors";
import BasicPage from "../lib/BasicPage";
import React from "react";
import { inject, observer } from "mobx-react";
import { FormGroup, FormControl, Button } from "react-bootstrap";

@inject("authStore")
@observer
export default class Register extends React.Component {
  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.register();
  };

  render() {
    const { values, errors, inProgress, redirectTo } = this.props.authStore;

    return (
      <BasicPage title="Sign up">
        <p>
          <Link to="login">Have an account?</Link>
        </p>

        <ListErrors errors={errors} />

        {redirectTo &&
          redirectTo !== this.props.location.pathname &&
          <Redirect to={redirectTo} />}

        <form onSubmit={this.handleSubmitForm}>
          <FormGroup>
            <FormControl
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={this.handlePasswordChange}
            />
          </FormGroup>

          <Button
            bsSize="large"
            bsStyle="primary"
            type="submit"
            disabled={inProgress}
          >
            Sign up
          </Button>
        </form>
      </BasicPage>
    );
  }
}
