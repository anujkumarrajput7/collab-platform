exports.ok = (res, data) => res.json({ success: true, data });
exports.err = (res, status, message) => res.status(status).json({ success: false, message });
