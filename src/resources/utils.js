export const editList = (data, list) => {
  const idx = list.findIndex((el) => el.id === data.id);
  return [...list.slice(0, idx), data, ...list.slice(idx + 1)];
};
