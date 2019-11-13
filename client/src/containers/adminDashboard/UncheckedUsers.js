import React, { Component } from "react";
import Admin from "../../components/adminDashboard/Admin/AdminUsers";
import { removeById } from "./helpers";
import axios from "axios";

class CheckUser extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      blackListBtn: null,
      checkedBtn: null,
      offset: 0,
      msg: ""
    };
  }

  async componentDidMount() {
    const { offset, users } = this.state;
    const url = `/api/admin/check?offset=${offset}`;
    try {
      const res = await axios.get(url);
      this.setState({
        users: res.data,
        blackListBtn: true,
        checkedBtn: true,
        offset: offset + 12
      });
    } catch (err) {
      console.log(err);
    }
  }

  getMore = async () => {
    const { users, offset } = this.state;
    const url = `/api/admin/check?offset=${offset}`;
    try {
      const response = await axios.get(url);

      const data = response.data;
      this.setState({
        users: [...users, ...data],
        offset: offset + 12
      });
    } catch (error) {
      console.error(error);
    }
  };

  async handleBlock(id) {
    try {
      const res = await axios.post("/api/admin/black-list", {
        data: {
          id: id,
          statusType: "unchecked"
        }
      });

      const msg = res.data.msg.success;
      if (msg) {
        const { users } = this.state;
        const newUsers = removeById(users, id);

        this.setState({
          msg: msg,
          users: newUsers
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleCheck(id) {
    try {
      const res = await axios.post("/api/admin/check", {
        data: {
          id: id
        }
      });

      const msg = res.data.msg.success;
      if (msg) {
        const { users } = this.state;
        const newUsers = removeById(users, id);

        this.setState({
          msg: msg,
          users: newUsers
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { users, blackListBtn, checkedBtn, msg } = this.state;
    const { getMore, handleBlock, handleCheck } = this;
    return (
      <div>
        <Admin
          users={users}
          blackListBtn={blackListBtn}
          checkedBtn={checkedBtn}
          getMore={getMore}
          handleBlock={handleBlock.bind(this)}
          handleCheck={handleCheck.bind(this)}
          msg={msg}
        />
      </div>
    );
  }
}

export default CheckUser;
