package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/thebravebyte/backend/internal/handlers"
	customMiddleware "github.com/thebravebyte/backend/internal/middleware"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()

	// Initialize Handlers
	h := handlers.NewHandler()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:8080"}, // Adjust for frontend URL
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/api", func(r chi.Router) {
		r.Route("/articles", func(r chi.Router) {
			r.Get("/", h.GetArticles)
			r.Get("/{id}", h.GetArticle)

			// Protected routes
			r.Group(func(r chi.Router) {
				r.Use(customMiddleware.AuthMiddleware)
				r.Post("/", h.CreateArticle)
				r.Put("/{id}", h.UpdateArticle)
				r.Delete("/{id}", h.DeleteArticle)
			})
		})

		r.Route("/auth", func(r chi.Router) {
			r.Post("/register", h.Register)
			r.Post("/login", h.Login)
			r.Post("/logout", h.Logout)

			// Protected routes
			r.Group(func(r chi.Router) {
				r.Use(customMiddleware.AuthMiddleware)
				r.Get("/me", h.GetMe)
			})
		})
	})

	return r
}
