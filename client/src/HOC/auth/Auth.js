import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector } from '../../redux/auth/selectors'
import { loadState } from '../../Utils/persistState'

const withAuth = (Wrap) => {
  class Auth  extends Component {
   componentDidMount(){
      this.getAuth()
   }

   getAuth = () => {
      const data = loadState()
      if(data.auth && data.auth.role !== null && data.auth.auth !== null){
          return{ role: data.auth.role, auth:data.auth.auth}
       } else {
         const {fetchRole, role,auth } = this.props
         fetchRole()
         return { auth, role}
        }
      }
   
   render(){
       return <Wrap {...this.props}  />
      }
   }

  const mapState = state => ({
       auth:getAuthSelector(state),
       role: getRoleSelector(state)
 })

  return connect(mapState, {fetchRole})(Auth)

}

export default withAuth;