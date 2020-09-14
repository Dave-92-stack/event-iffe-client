import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Events from '../Events'
import Home from '../Home'
import Footer from '../shared/Footer'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateEvent from '../CreateEvent/CreateEvent'
import EventEdit from '../EventEdit/EventEdit'
import MyEvents from '../MyEvents/MyEvents'
import CreateUpload from '../CreateUpload/CreateUpload'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' component={Home} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/my-events' render={() => (
            <MyEvents user={user} msgAlert={this.msgAlert} />
          )} />
          <Route user={user} exact path='/events' render={() => (
            <Events user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/create-event' render={() => (
            <CreateEvent msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/events/:id' render={props => (
            <EventEdit {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/uploads' render={() => (
            <CreateUpload msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <Footer />
      </Fragment>
    )
  }
}
//     return (
//       <Fragment>
//         <Header user={user} />
//         {msgAlerts.map((msgAlert, index) => (
//           <AutoDismissAlert
//             key={index}
//             heading={msgAlert.heading}
//             variant={msgAlert.variant}
//             message={msgAlert.message}
//           />
//         ))}
//         <main className="container">
//           <Route path='/sign-up' render={() => (
//             <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
//           )} />
//           <Route path='/sign-in' render={() => (
//             <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
//           )} />
//           <AuthenticatedRoute user={user} path='/sign-out' render={() => (
//             <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
//           )} />
//           <AuthenticatedRoute user={user} path='/change-password' render={() => (
//             <ChangePassword msgAlert={this.msgAlert} user={user} />
//           )} />
//           <AuthenticatedRoute user={user} path='/my-events' render={() => (
//             <MyEvents user={user} msgAlert={this.msgAlert} />
//           )} />
//           <Route user={user} exact path='/events' render={() => (
//             <Events user={user} msgAlert={this.msgAlert} />
//           )} />
//           <AuthenticatedRoute user={user} path='/create-event' render={() => (
//             <CreateEvent msgAlert={this.msgAlert} user={user} />
//           )} />
//           <AuthenticatedRoute user={user} path='/events/:id' render={props => (
//             <EventEdit {...props} msgAlert={this.msgAlert} user={user} />
//           )} />
//         </main>
//         <Footer />
//       </Fragment>
//     )
//   }
// }

export default App
