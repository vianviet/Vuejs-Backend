const convertMessage = (data) => {
  const result = data.map((each) => {
    return {
      id: each.id,
      message: each.message,
      room_id: each.room_id,
      email: each.User.email,
      avatar: each.User.avatar,
      create_date: new Date(each.create_date).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      update_date: new Date(each.update_date).toLocaleTimeString("en-US", {
        hour12: false,
      }),
    };
  });
  return result;
};

module.exports = { convertMessage };
