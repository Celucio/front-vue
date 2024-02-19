import Cookies from 'js-cookie';

const isAuthenticated = () => {
  // Verifica si hay un token almacenado en las cookies
  const token = Cookies.get('token');
  return !!token; // Devuelve true si el token existe
};

const requireAuth = (to, from, next) => {
  if (!isAuthenticated()) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    next({ name: 'home' });
  } else {
    // Si el usuario está autenticado, permite el acceso a la ruta solicitada
    next();
  }
};

export { requireAuth };
