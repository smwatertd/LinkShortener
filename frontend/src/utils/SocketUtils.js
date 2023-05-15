export const normalizeShortUrl = (shortUrl) => {
  // Нормализация короткого URL
  return window.location.origin + "/" + shortUrl;
};

export const normalizeDate = (date) => {
  // Нормализация даты
  return new Date(date).toUTCString();
};
