import React, { Component } from "react";
import Admin from "../../components/adminDashboard/Admin/AdminUsers";
import { removeById, filterByEmail } from "./helpers";
import { getUncheckedUsers, blackListUsers, postCheckUser} from '../../api/admin'
import axios from "axios";

class CheckUser extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      blackListBtn: null,
      checkedBtn: null,
      offset: 0,
      msg: "", 
      query:'',
    };
     this.handleBlock = this.handleBlock.bind(this)
     this.handleCheck = this.handleCheck.bind(this)
     this.handleSearch = this.handleSearch.bind(this)
  }

  async componentDidMount() {
    const { offset } = this.state;
    try {
      const data  = await getUncheckedUsers(offset)
      this.setState({
        users: data,
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
    try {
      const data  = await getUncheckedUsers(offset)

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
      const data = await blackListUsers(id)
      const msg = data.msg.success;
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

      const data = await  postCheckUser(id)
      const msg = data.msg.success;
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

  handleSearch (e){
    const query  = e.target.value
     this.setState({
         query
     })
   }
  render() {
    const { users, blackListBtn, checkedBtn, msg , query} = this.state;
    const { getMore, handleBlock, handleCheck} = this;
    const filteredUsers =  filterByEmail(users, query)
    return (
      <div>
        <Admin
          users={filteredUsers}
          blackListBtn={blackListBtn}
          checkedBtn={checkedBtn}
          getMore={getMore}
          handleBlock={handleBlock}
          handleCheck={handleCheck}
          value={query}
          msg={msg}
        />
      </div>
    );
  }
}

export default CheckUser;
