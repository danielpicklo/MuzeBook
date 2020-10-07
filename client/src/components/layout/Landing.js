import React from 'react'

export const Landing = () => {
    return (
        <div>
            <h1>Welcome to MuzeBook</h1>
            <h3>Please sign in to continue to the community</h3>
            <div className="form">
                <form>
                    <input type="text" name="username" placeholder="username"/>
                    <input type="password" name="password" placeholder="password"/>
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Landing;