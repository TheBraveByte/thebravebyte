package handlers

import "github.com/thebravebyte/backend/internal/repository"

type Handler struct {
	ArticleRepo *repository.ArticleRepository
	UserRepo    *repository.UserRepository
}

func NewHandler() *Handler {
	return &Handler{
		ArticleRepo: repository.NewArticleRepository(),
		UserRepo:    repository.NewUserRepository(),
	}
}
