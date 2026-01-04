package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"

	"github.com/thebravebyte/backend/internal/models"
)

type ArticleRequest struct {
	*models.Article
}

func (a *ArticleRequest) Bind(r *http.Request) error {
	if a.Article == nil {
		return nil
	}
	// Add validations here if needed
	return nil
}

type ArticleResponse struct {
	*models.Article
}

func (rd *ArticleResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func NewArticleResponse(article *models.Article) *ArticleResponse {
	return &ArticleResponse{Article: article}
}

func NewArticleListResponse(articles []models.Article) []render.Renderer {
	list := []render.Renderer{}
	for i := range articles {
		list = append(list, NewArticleResponse(&articles[i]))
	}
	return list
}

func (h *Handler) GetArticles(w http.ResponseWriter, r *http.Request) {
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 10
	}

	articles, total, err := h.ArticleRepo.GetAll(r.Context(), page, limit)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.JSON(w, r, map[string]interface{}{
		"articles":   articles,
		"total":      total,
		"page":       page,
		"totalPages": (total + int64(limit) - 1) / int64(limit),
	})
}

func (h *Handler) GetArticle(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")

	// Try by ID first
	article, err := h.ArticleRepo.GetByID(r.Context(), idParam)
	if err != nil {
		// Try by Slug
		article, err = h.ArticleRepo.GetBySlug(r.Context(), idParam)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				render.Render(w, r, ErrNotFound)
				return
			}
			render.Render(w, r, ErrInternal(err))
			return
		}
	}

	render.Render(w, r, NewArticleResponse(article))
}

func (h *Handler) CreateArticle(w http.ResponseWriter, r *http.Request) {
	data := &ArticleRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	article := data.Article
	if article.Published && article.PublishedAt == nil {
		now := time.Now()
		article.PublishedAt = &now
	}

	if err := h.ArticleRepo.Create(r.Context(), article); err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Status(r, http.StatusCreated)
	render.Render(w, r, NewArticleResponse(article))
}

func (h *Handler) UpdateArticle(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")

	data := &ArticleRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	input := data.Article

	updateData := bson.M{}
	if input.Title != "" {
		updateData["title"] = input.Title
	}
	if input.Slug != "" {
		updateData["slug"] = input.Slug
	}
	if input.Content != "" {
		updateData["content"] = input.Content
	}
	if input.Excerpt != "" {
		updateData["excerpt"] = input.Excerpt
	}
	if input.CoverImage != "" {
		updateData["cover_image"] = input.CoverImage
	}
	// Handle boolean properly
	updateData["published"] = input.Published

	if err := h.ArticleRepo.Update(r.Context(), idParam, updateData); err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, map[string]string{"message": "Article updated"})
}

func (h *Handler) DeleteArticle(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")

	if err := h.ArticleRepo.Delete(r.Context(), idParam); err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, map[string]string{"message": "Article deleted"})
}
