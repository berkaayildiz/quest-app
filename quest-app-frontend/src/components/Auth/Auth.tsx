
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


type AuthProps = { mode: string; };

export function Auth({mode}: AuthProps)
{
  // Holds if the user is currently logging in or signing up
  const [isLogin, setIsLogin] = useState(mode === 'login');
  // Holds the state of the username and password input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(mode === 'login');
  }, [mode]); // This effect depends on `mode` and runs whenever `mode` changes

  async function handleSubmit() {
    await sendRequest(isLogin ? "login" : "signup");
    setUsername('');
    setPassword('');
    if (isLogin) {
      navigate('/');
      window.location.reload();
    } else {
      navigate('/auth/login');
      setIsLogin(true);
    }
  }

  async function sendRequest(path: string) {
    await fetch("/auth/" + path,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    }
    )
    .then((response) => response.json())
    .then((result) => {
      if (path == "login") {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUserId", result.userId);
        localStorage.setItem("currentUsername", username);
      }
    })
    .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="flex justify-center items-center min-h-[86vh]">
      <Card className="mx-auto max-w-m">
        <CardHeader>
          <CardTitle className="text-2xl">{isLogin ? 'Login' : 'Sign up'}</CardTitle>
          <CardDescription>
            Enter your username below to {isLogin ? 'login' : 'sign up'} to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link to="/" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
