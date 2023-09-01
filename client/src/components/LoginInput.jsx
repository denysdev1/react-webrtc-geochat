export const LoginInput = ({ username, setUsername }) => {
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <input
      type="text"
      className="l_page_input"
      value={username}
      onChange={handleChange}
    />
  );
};
