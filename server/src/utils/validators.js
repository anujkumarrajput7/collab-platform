exports.required = (obj, keys) => {
  const missing = keys.filter(k => !obj[k]);
  return missing;
};
