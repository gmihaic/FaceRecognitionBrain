export const isUrlValid = (url) => {
  try {
    new URL(url);
  } catch {
    return false;
  }

  return true;
}