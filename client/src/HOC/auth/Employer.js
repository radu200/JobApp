import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRole } from '../../redux/auth/operators'
import { getAuthSelector, getRoleSelector, getUserIdSelector } from '../../redux/auth/selectors'

const withAuthEmployer = (Wrap) => {

   class Employer extends Component {
      componentDidMount() {
         this.getUserData()
      }

      componentDidUpdate() {
         this.getUserData()

      }


      async getUserData() {
         const { role, fetchRole, history} = this.props
         await fetchRole()
         if (role && role !== "employer") {
            return history.push('/login-err');
         } 
       
      }

      render() {
         return <Wrap {...this.props} />
      }
   }

   const mapState = state => ({
      role: getRoleSelector(state),
      auth: getAuthSelector(state),
      user_id:getUserIdSelector(state)
   })

   return connect(mapState, { fetchRole })(Employer)

}

export default withAuthEmployer;