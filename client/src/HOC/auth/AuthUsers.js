import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector, getUserIdSelector } from '../../redux/auth/selectors'

const withAuth = (Wrap) => {
  class Auth  extends Component {
   componentDidMount(){
      this.getAuth()
   }

   async getAuth () {
         const {fetchRole, role,auth, history } = this.props
         await fetchRole()
         if(auth && !auth){
            return history.push('/login-err');
         }
      }
   
   render(){
       return <Wrap {...this.props}  />
      }
   }

  const mapState = state => ({
       auth:getAuthSelector(state),
       role: getRoleSelector(state),
       user_id:getUserIdSelector(state)

 })

  return connect(mapState, {fetchRole})(Auth)

}

export default withAuth;