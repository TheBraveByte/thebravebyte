package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.uber.org/zap"

	"github.com/thebravebyte/backend/internal/logger"
)

var Client *mongo.Client
var DB *mongo.Database

func Connect(uri, dbName string) {
	if uri == "" {
		logger.Log.Fatal("You must set your 'MONGO_URI' environment variable.")
	}

	var client *mongo.Client
	var err error
	maxRetries := 10
	retryDelay := 2 * time.Second

	for i := 0; i < maxRetries; i++ {
		client, err = mongo.Connect(options.Client().ApplyURI(uri))
		if err != nil {
			logger.Log.Error("Failed to create mongo client", zap.Int("attempt", i+1), zap.Error(err))
			time.Sleep(retryDelay)
			continue
		}

		// Verify connection
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		err = client.Ping(ctx, nil)
		cancel()

		if err == nil {
			logger.Log.Info("Connected to MongoDB")
			Client = client
			DB = client.Database(dbName)
			return
		}

		logger.Log.Warn("Failed to ping database, retrying...", zap.Int("attempt", i+1), zap.Error(err))
		time.Sleep(retryDelay)
	}

	logger.Log.Fatal("Failed to connect to MongoDB after retries", zap.Error(err))
}
