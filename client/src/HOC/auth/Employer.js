import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRole } from '../../redux/auth/operators'
import { getAuthSelector, getRoleSelector } from '../../redux/auth/selectors'
import { loadState } from '../../Utils/persistState'

const withAuthEmployer = (Wrap) => {

   class Employer extends Component {
      componentDidMount() {
         this.getUserData()
      }

      componentDidUpdate() {
         this.getUserData()

      }

      shouldNavigateAway(auth, role) {
         const { history } = this.props
         console.log(role)
         if (auth && role !== "employer") {
            return history.push('/login-err');
         } 
      }

      async getUserData() {
         //  loading state from local storage
         const data = loadState()

         if (data && data.auth.role && data.auth.auth) {
            const { auth, role } = data.auth
            this.shouldNavigateAway(auth, role)
         } else {
            this.props.fetchRole()
            const { role, auth } = this.props
            this.shouldNavigateAway(auth, role)
         }

      }

      render() {
         return <Wrap {...this.props} />
      }
   }

   const mapState = state => ({
      role: getRoleSelector(state),
      auth: getAuthSelector(state)

   })

   return connect(mapState, { fetchRole })(Employer)

}

export default withAuthEmployer;