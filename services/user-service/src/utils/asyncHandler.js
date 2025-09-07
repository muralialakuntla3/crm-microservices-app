export const asyncHandler = (fn) => (req, res, next) => {
Promise.resolve(fn(req, res, next)).catch(next);
};


# File: services/user-service/src/utils/response.js
export const ok = (res, data = {}, meta = {}) => res.status(200).json({ success: true, data, meta });
export const created = (res, data = {}, meta = {}) => res.status(201).json({ success: true, data, meta });
export const fail = (res, code = 400, message = 'Bad Request', details = undefined) =>
res.status(code).json({ success: false, message, details });


# File: services/user-service/src/middlewares/errorHandler.js
export const notFound = (req, res, _next) => {
res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};


export const errorHandler = (err, _req, res, _next) => {
const code = res.statusCode !== 200 ? res.statusCode : 500;
const payload = {
success: false,
message: err.message || 'Internal Server Error',
};
if (process.env.NODE_ENV !== 'production') {
payload.stack = err.stack;
}
res.status(code).json(payload);
};