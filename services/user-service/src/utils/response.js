export const ok = (res, data, meta = undefined) => {
  return res.status(200).json({ success: true, data, meta });
};

export const created = (res, data) => {
  return res.status(201).json({ success: true, data });
};

export const fail = (res, status = 400, message = 'Request failed', errors = undefined) => {
  return res.status(status).json({ success: false, message, errors });
};


