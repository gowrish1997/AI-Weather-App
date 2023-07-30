const getBasePath = () => {
  let base_url =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";
  return base_url;
};
export default getBasePath;
