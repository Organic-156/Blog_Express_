function isActiveRoute(router, currentRoute) {
    return router === currentRoute ? 'active' : '';
}

module.exports = { isActiveRoute };