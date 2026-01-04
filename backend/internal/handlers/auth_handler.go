package handlers

import (
	"net/http"

	"github.com/go-chi/render"
	"github.com/thebravebyte/backend/internal/auth"
	"github.com/thebravebyte/backend/internal/models"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (l *LoginRequest) Bind(r *http.Request) error {
	if l.Email == "" {
		return models.ErrEmailRequired
	}
	if l.Password == "" {
		return models.ErrPasswordRequired
	}
	return nil
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"` // Optional, default to user
}

func (r *RegisterRequest) Bind(req *http.Request) error {
	if r.Email == "" {
		return models.ErrEmailRequired
	}
	if r.Password == "" {
		return models.ErrPasswordRequired
	}
	if len(r.Password) < 6 {
		return models.ErrPasswordTooShort
	}
	return nil
}

type AuthResponse struct {
	Token string       `json:"token"`
	User  *models.User `json:"user"`
}

func (rd *AuthResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	data := &RegisterRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	// Check if user exists
	_, err := h.UserRepo.GetByEmail(r.Context(), data.Email)
	if err == nil {
		render.Status(r, http.StatusConflict)
		render.JSON(w, r, map[string]string{"error": "User already exists"})
		return
	}

	hashedPassword, err := auth.HashPassword(data.Password)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	user := &models.User{
		Email:    data.Email,
		Password: hashedPassword,
		Role:     data.Role,
	}
	if user.Role == "" {
		user.Role = "user"
	}

	if err := h.UserRepo.Create(r.Context(), user); err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	token, err := auth.GenerateToken(user.ID.Hex(), user.Role)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Status(r, http.StatusCreated)
	render.Render(w, r, &AuthResponse{Token: token, User: user})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	data := &LoginRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	user, err := h.UserRepo.GetByEmail(r.Context(), data.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			render.Render(w, r, ErrUnauthorized(nil))
			return
		}
		render.Render(w, r, ErrInternal(err))
		return
	}

	if !auth.CheckPasswordHash(data.Password, user.Password) {
		render.Render(w, r, ErrUnauthorized(nil))
		return
	}

	token, err := auth.GenerateToken(user.ID.Hex(), user.Role)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Status(r, http.StatusOK)
	render.Render(w, r, &AuthResponse{Token: token, User: user})
}

func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	// Client side logout (clear token)
	render.Status(r, http.StatusOK)
	render.JSON(w, r, map[string]string{"message": "Logged out successfully"})
}

func (h *Handler) GetMe(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(string)

	user, err := h.UserRepo.GetByID(r.Context(), userID)
	if err != nil {
		render.Render(w, r, ErrNotFound)
		return
	}

	render.JSON(w, r, user)
}
