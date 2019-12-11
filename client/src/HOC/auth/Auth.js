import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector } from '../../redux/auth/selectors'

const withAuth = (Wrap) => {

class Auth  extends Component {
   componentDidMount(){
      this.props.fetchRole()
   }

   render(){
       const  { auth, role} = this.props
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