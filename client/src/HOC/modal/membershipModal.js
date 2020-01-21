import React, { Component } from "react";

const withMembershipModal = Wrap => {
  class Modal extends Component {
    constructor() {
      super();
      this.state = {
        open: false,
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
      this.setState({ open: true });
    }
    handleClose() {
      this.setState({ open: false });
    }

    render() {
      return (
        <Wrap
          openModalMembership={this.state.open}
          handleModalClose={this.handleClose}
          handleModalOpen={this.handleOpen}
          {...this.props}
        />
      );
    }
  }

  return Modal;
};

export default withMembershipModal;
