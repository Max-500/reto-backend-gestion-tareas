import rateLimiter from "express-rate-limit";

const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // Duración de la ventana en milisegundos (15 minutos en este ejemplo)
    max: 1, // Número máximo de peticiones permitidas durante la ventana
    message: 'Excediste el límite de solicitudes. Por favor, intenta de nuevo más tarde.', // Mensaje de error mostrado cuando se excede el límite
    handler: (req, res, next) => { // Manejador personalizado para responder a solicitudes que exceden el límite
      res.status(429).json({ error: 'Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.' });
    },
});

export default limiter;