import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  
  const { loginWithRedirect } = useAuth0();

  return <Button id="login" variant="contained" onClick={() => loginWithRedirect()}>התחברות</Button>;
};

export default LoginButton;