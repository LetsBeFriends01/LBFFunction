// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  return res.json(req);
};
