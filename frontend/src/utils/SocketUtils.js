export const normalizeShortUrl = (shortUrl) => {
  return window.location.origin + "/" + shortUrl;
};

export const normalizeDate = (date) => {
  return new Date(date).toUTCString();
};
