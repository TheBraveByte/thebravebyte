package seed

import (
	"context"
	"time"

	"github.com/thebravebyte/backend/internal/auth"
	"github.com/thebravebyte/backend/internal/database"
	"github.com/thebravebyte/backend/internal/logger"
	"github.com/thebravebyte/backend/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.uber.org/zap"
)

func AdminUser(email, password string) {
	// Fallback to hardcoded credentials if not provided
	if email == "" {
		email = "ayaaakinleye@gmail.com"
	}
	if password == "" {
		password = "@Akinleye@123"
	}

	if email == "" || password == "" {
		logger.Log.Warn("Admin email or password not set, skipping admin seeding")
		return
	}

	coll := database.DB.Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if admin exists
	var existingUser models.User
	err := coll.FindOne(ctx, bson.M{"email": email}).Decode(&existingUser)
	if err == nil {
		logger.Log.Info("Admin user already exists", zap.String("email", email))
		return
	}

	hashedPassword, err := auth.HashPassword(password)
	if err != nil {
		logger.Log.Error("Failed to hash admin password", zap.Error(err))
		return
	}

	admin := models.User{
		Email:     email,
		Password:  hashedPassword,
		Role:      "admin",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err = coll.InsertOne(ctx, admin)
	if err != nil {
		logger.Log.Error("Failed to create admin user", zap.Error(err))
		return
	}

	logger.Log.Info("Admin user created successfully", zap.String("email", email))
}
