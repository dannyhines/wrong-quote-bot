exports.handler = async function (event: any, _context: any) {
  console.log("in Lambda, EVENT:", event);
  try {
    return { message: "quote" };
  } catch (err) {
    console.log("Caught error: ", err);
    return { message: "Server Error" };
  }
};
