import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // Duración de la ventana en milisegundos (15 minutos en este ejemplo)
    max: 30, // Número máximo de peticiones permitidas durante la ventana
    handler: (req, res, next) => { // Manejador personalizado para responder a solicitudes que exceden el límite
      res.status(429).json({ error: 'Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.' });
    },
});

export default limiter;