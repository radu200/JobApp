import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchRole } from '../../redux/auth/operators'
import {getAuthSelector, getRoleSelector } from '../../redux/auth/selectors'
import { loadState } from '../../Utils/persistState'

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
         const { role,auth, history } = this.props
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
    
 })

  return connect(mapState, {fetchRole})(JobSeeker)

}

export default withAuthJobSeeker;