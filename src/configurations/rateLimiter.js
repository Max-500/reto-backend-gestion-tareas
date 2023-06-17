// Importación de express-rate-limit
import rateLimiter from "express-rate-limit";

// Middleware de limitación de velocidad utilizando express-rate-limit
const limiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // Tiempo en que se genera una nueva sesion (5 minutos en este ejemplo)
    max: 50, // Número máximo de peticiones permitidas durante la sesion
    handler: (req, res, next) => { // Manejador personalizado para responder a solicitudes que exceden el límite
      res.status(429).json({ error: 'Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.' });
    },
});

// Exportando el middleware
export default limiter;