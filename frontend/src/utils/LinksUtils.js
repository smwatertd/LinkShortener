export const normalizeShortUrl = (shortUrl) => {
  return window.location.origin + "/" + shortUrl;
};

export const getShortUrl = (shortUrl) => {
  const temp = shortUrl.split("/");
  return temp[temp.length - 1];
};
