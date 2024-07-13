import { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AuthUser } from "@/types/AuthUser"
import { AuthProps } from "@/types/props/AuthProps"


const Auth: FC<AuthProps> = ({ mode }) =>
{
  // Holds if the user is currently logging in or signing up
  const [isLogin, setIsLogin] = useState(mode === 'login');
  // Holds the state of the username and password input fields
  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  // Get the navigate function from the router
  const navigate = useNavigate();


  // Update the isLogin state when the mode prop changes
  useEffect(() => { setIsLogin(mode === 'login'); }, [mode]);

  // Handle the form submission
  async function handleSubmit() {
    // Send the request to the server
    const response = await sendRequest(isLogin);

    if (isLogin) {
      // Save the logged in user credentials to local storage
      const authUser: AuthUser = { id: response.userId, username: usernameField, accessToken: response.accessToken, refreshToken: response.refreshToken };
      localStorage.setItem("authUser", JSON.stringify(authUser));
      // Redirect the user to the home page
      navigate('/');
      window.location.reload();
    } else {
      // Redirect the user to the login page
      navigate('/auth/login');
    }

    // Clear the input fields
    setUsernameField('');
    setPasswordField('');
  }

  // Send the login or sign up request to the server
  async function sendRequest(isLoginRequest: boolean) {
    const endpoint = isLoginRequest ? "login" : "signup";
    try {
      const response = await fetch(`/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameField, password: passwordField }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  // Render the login or sign up form
  return (
    <div className="flex justify-center items-center min-h-[86vh]">
      <Card className="mx-auto max-w-m">
        <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? 'Login' : 'Sign up'}</CardTitle>
            <CardDescription> Enter your username below to {isLogin ? 'login' : 'sign up'} to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                required
                value={usernameField}
                onChange={(e) => setUsernameField(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                { isLogin && (<Link to="/" className="ml-auto inline-block text-sm underline">Forgot your password?</Link>) }
              </div>
              <Input
                id="password"
                type="password"
                required
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
              />
            </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                {isLogin ? 'Login' : 'Sign up'}
              </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isLogin ? 'Don\'t' : 'Already'} have an account?{' '}
            <Link to="" className="underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth
