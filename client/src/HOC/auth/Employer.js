import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector } from '../../redux/auth/selectors'

const withAuthEmployer = (Wrap) => {

class Employer extends Component {
   componentDidMount(){
      this.props.fetchRole()
   }

   componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { role, auth, history} = this.props
      if (!auth || role !== 'employer' ) {
         history.push('/login-err');
      }
    }

   render(){
        return <Wrap {...this.props} />
      }
   }

  const mapState = state => ({
       role:getRoleSelector(state),
       auth:getAuthSelector(state)
    
 })

  return connect(mapState, {fetchRole})(Employer)

}

export default withAuthEmployer;