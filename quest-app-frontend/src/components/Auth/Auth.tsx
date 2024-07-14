import { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { AuthUser } from "@/types/AuthUser"
import { AuthProps } from "@/types/props/AuthProps"
import { API_URL } from "@/constants"


const Auth: FC<AuthProps> = ({ mode }) =>
{
  // Holds the state of whether the fetch has completed
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  // Holds if the user is currently logging in or signing up
  const [isLogin, setIsLogin] = useState(mode === 'login');
  // Holds the state of the username and password input fields
  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  // Get the navigate function from the router
  const navigate = useNavigate();
  // Displays a toast message when the user logs in or signs up
  const { toast } = useToast();


  // Update the isLogin state when the mode prop changes
  useEffect(() => { setIsLogin(mode === 'login'); }, [mode]);

  // Handle the form submission
  async function handleSubmit() {
    // Validate the username and password input fields
    if (!usernameField || !passwordField || usernameField.length < 4 || passwordField.length < 4) {
      toast({ description: "Please fill in all the fields and ensure they are at least 4 characters long" })
      return;
    }

    // Send the request to the server
    const response = await sendRequest(isLogin);
    // Check if the response is null
    if (!response) return;

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
    setIsLoaded(false);
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameField, password: passwordField }),
      });
      if (!response.ok) {
        const error = await response.json();
        toast({ description: error.message }); setIsLoaded(true);
        return null;
      } else {
        toast({ description: isLoginRequest ? "Logged in successfully" : "Signed up successfully" }); setIsLoaded(true);
        return response.json();
      }
    } catch (error) {
      toast({ description: "Something went wrong..." }); setIsLoaded(true);
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
                { isLogin && (<Link to="/404" className="ml-auto inline-block text-sm underline">Forgot your password?</Link>) }
              </div>
              <Input
                id="password"
                type="password"
                required
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
              />
            </div>
              <Button
                type="submit"
                className={`w-full ${isLoaded ? 'bg-primary' : 'bg-gray-400'}`}
                onClick={handleSubmit}
                disabled={!isLoaded}
              >
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
