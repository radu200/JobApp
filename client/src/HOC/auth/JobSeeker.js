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

    shouldNavigateAway(auth,role){
      const { history } = this.props
      if (!auth && role !== 'jobseeker' ) {
         return history.push('/login-err');
      }
    }

    async getUserData() {
      //  loading state from local storage
       const data = loadState()
       
       if(data && data.auth.role !== null && data.auth.auth !== null){
          const { auth, role } = data.auth 
          this.shouldNavigateAway(auth, role)
         } else {
            await this.props.fetchRole()
            const { role,auth, } = this.props
            this.shouldNavigateAway(auth,role)
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