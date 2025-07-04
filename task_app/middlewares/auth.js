function requireLogin(req, res, next) {
  if (!req.session.loginName) {
    res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
  } else {
    next();
  }
}

module.exports = requireLogin;