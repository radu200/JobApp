import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMembership } from "../../redux/membership/operators";
import { getMemberSelector } from "../../redux/membership/selectors";

const withAuthMembership = Wrap => {
  class Member extends Component {
    componentDidMount() {
      this.props.fetchMembership();
    }
   

    render() {    
      return <Wrap {...this.props} />;
    }
  }

  const mapState = state => ({
    member: getMemberSelector(state)
  });

  return connect(mapState, { fetchMembership })(Member);
};

export default withAuthMembership;
