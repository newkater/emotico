/**
 * Login path
 * @type {string}
 */
export const LOGIN_PATH = "/login";

/**
 * Register path
 * @type {string}
 */
export const REGISTER_PATH = "/register";

/**
 * Sign-Up path
 * @type {string}
 */
export const SIGN_UP_PATH = "/signup";


/**
 * 
 * Logout path
 * @type {string}
 */
export const LOGOUT_PATH = "/signout";


/**
 * Default path
 * @type {string}
 */
export const DEFAULT_PATH = "/";


/**
 * A list of routes used for authentication
 * @type {string[]}
 */
export const authRoutes = [LOGIN_PATH, REGISTER_PATH, SIGN_UP_PATH];


/**
 * The default route to redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";


/**
 * A list of public routes
 * @type {string[]}
 */
export const publicRoutes = ["/", "/companies", "/video", "/candidate"];