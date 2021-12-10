import { useRef, useState } from 'react'
import { login, logout, signup } from '../firebase'

const Authentication = ( props : { currentUser : any } ) => {

    const [ loading, setLoading ] = useState( false )
  
    const emailRef : any = useRef()
    const passwordRef : any = useRef()
  
    async function handleSignup() {
        setLoading( true )
        await signup( emailRef.current.value, passwordRef.current.value )
        setLoading( false )
    }
  
    async function handleLogin() {
      setLoading( true )
      try {
        await login( emailRef.current.value, passwordRef.current.value )
      } catch {
        alert( "Error!" )
      }
      setLoading( false )
    }
  
    async function handleLogout() {
      setLoading( true )
      try {
        await logout()
      } catch {
        alert( "Error!" )
      }
      setLoading( false )
    }

    const dispCurrentUser = () => {
        if ( props.currentUser != null )
            return <p>Currently logged in as : { props.currentUser.email }</p>
        else
            return null
    }

    const controls = () => {
        if ( !loading && props.currentUser )
            return (
                <div className="form-group">
                    <button type="button" className="btn btn-secondary" disabled={ loading || !props.currentUser } onClick={ handleLogout }>Log Out</button>
                </div>
            )
        else
            return (
                <div className="form-group">
                    <button type="button" className="btn btn-secondary col-4" disabled={ loading || props.currentUser } onClick={ handleSignup }>Sign Up</button>
                    <button type="button" className="btn btn-secondary col-4 float-end" disabled={ loading || props.currentUser } onClick={ handleLogin }>Log In</button>
                </div>
            )
    }

    return (
        <div className="container" id="main">
            { dispCurrentUser() }
            <form>
                { props.currentUser ? null : <div className="form-group">
                    <input className="form-control mb-3" ref={ emailRef } placeholder="Email" />
                    <input className="form-control mb-3" ref={ passwordRef } type="password" placeholder="Password" />
                </div> }
                { controls() }
            </form>
        </div>
    )
}

export default Authentication