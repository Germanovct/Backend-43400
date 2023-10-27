

export const checkRoleMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) { 
      const user = req.user;
  
      if (user.isAdmin) {
        
        next(); 
      } else {
        
        res.status(403).json({ message: "No tienes permisos para acceder a esta ruta" });
      }
    } else {
      res.status(401).json({ message: "Usuario no autenticado" });
    }
  };
  