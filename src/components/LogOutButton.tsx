interface LogoutButtonProps {
    onLogout: () => void;
  }
  
  const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const handleLogout = () => {
      onLogout();
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  };

  export default LogoutButton;