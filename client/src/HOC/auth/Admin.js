import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRole } from "../../redux/auth/operators";
import { getAuthSelector, getRoleSelector } from "../../redux/auth/selectors";

const withAuthAdmin = Wrap => {
  class Admin extends Component {
    componentDidMount() {
      this.getUserData();
    }

    componentDidUpdate() {
      this.getUserData();
    }

    async getUserData() {
      const { role, history } = this.props;
      await this.props.fetchRole();
      if (role && role !== "admin") {
        return history.push("/login-err");
      }
    }
    render() {
      return <Wrap {...this.props} />;
    }
  }

  const mapState = state => ({
    role: getRoleSelector(state),
    auth: getAuthSelector(state),
  });

  return connect(mapState, { fetchRole })(Admin);
};

export default withAuthAdmin;
