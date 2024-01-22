import Avatar from "react-avatar";

const Users = ({ username }) => {
  return (
    <div className="text-center">
      <Avatar name={username} size={50} round="14px" />
      <h1 className="overflow-hidden">{username}</h1>
    </div>
  );
};

export default Users;
