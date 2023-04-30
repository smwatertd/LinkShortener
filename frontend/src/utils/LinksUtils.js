export const normalizeShortUrl = (shortUrl) => {
  return window.location.origin + "/" + shortUrl;
};
