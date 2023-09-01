export const LoginButton = ({ handleLogin, disabled }) => {
  return (
    <button
      className="l_page_login_button"
      onClick={handleLogin}
      disabled={disabled}
    >
      Login
    </button>
  );
};
