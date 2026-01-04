package seed

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.uber.org/zap"

	"github.com/thebravebyte/backend/internal/auth"
	"github.com/thebravebyte/backend/internal/database"
	"github.com/thebravebyte/backend/internal/logger"
)

func AdminUser(email, password string) {
	if email == "" || password == "" {
		logger.Log.Warn("Admin email or password not set, skipping admin seeding")
		return
	}

	coll := database.DB.Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	hashedPassword, err := auth.HashPassword(password)
	if err != nil {
		logger.Log.Error("Failed to hash admin password", zap.Error(err))
		return
	}

	filter := bson.M{"email": email}
	update := bson.M{
		"$set": bson.M{
			"password":   hashedPassword,
			"role":       "admin",
			"updated_at": time.Now(),
		},
		"$setOnInsert": bson.M{
			"created_at": time.Now(),
		},
	}
	opts := options.UpdateOne().SetUpsert(true)

	_, err = coll.UpdateOne(ctx, filter, update, opts)
	if err != nil {
		logger.Log.Error("Failed to seed/update admin user", zap.Error(err))
		return
	}

	logger.Log.Info("Admin user seeded/updated successfully", zap.String("email", email))
}
