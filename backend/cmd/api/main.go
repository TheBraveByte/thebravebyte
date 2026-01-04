package main

import (
	"net/http"

	"go.uber.org/zap"

	"github.com/thebravebyte/backend/internal/auth"
	"github.com/thebravebyte/backend/internal/config"
	"github.com/thebravebyte/backend/internal/database"
	"github.com/thebravebyte/backend/internal/logger"
	"github.com/thebravebyte/backend/internal/routes"
)

func main() {
	// Init Logger
	logger.Init()
	defer logger.Sync()

	// Load config
	cfg := config.LoadConfig()
	logger.Log.Info("Configuration loaded")

	// Init Auth
	auth.Init(cfg.JWTSecret)

	// Connect Database
	database.Connect(cfg.MongoURI, cfg.DBName)

	// Setup Router
	r := routes.SetupRouter()

	// Start Server
	logger.Log.Info("Server starting", zap.String("port", cfg.Port))
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		logger.Log.Fatal("Server failed to start", zap.Error(err))
	}
}
