// A stub - integrate cloudinary SDK here later
module.exports = {
  upload: async (file) => {
    // return { url: "https://..." }
    return { url: file }; // for now just return the input for dev
  }
};
