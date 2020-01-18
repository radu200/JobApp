import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector, getUserIdSelector } from '../../redux/auth/selectors'

const withAuthJobSeeker = (Wrap) => {
   class JobSeeker extends Component {
   componentDidMount(){
      this.getUserData()
   }

   componentDidUpdate() {
      this.getUserData()

    }

    async getUserData() {
         await this.props.fetchRole()
         const { role, history } = this.props
         if (role && role !== 'jobseeker' ) {
            return history.push('/login-err');
         }
    }

   render(){
       return <Wrap {...this.props} />
      }
   }

  const mapState = state => ({
       role:getRoleSelector(state),
       auth:getAuthSelector(state),
       user_id:getUserIdSelector(state)

    
 })

  return connect(mapState, {fetchRole})(JobSeeker)

}

export default withAuthJobSeeker;