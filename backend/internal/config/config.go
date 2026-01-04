package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port          string
	MongoURI      string
	DBName        string
	JWTSecret     string
	AdminEmail    string
	AdminPassword string
}

func LoadConfig() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI is required")
	}

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "thebravebyte"
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET is required")
	}

	adminEmail := os.Getenv("ADMIN_EMAIL")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	return &Config{
		Port:          port,
		MongoURI:      mongoURI,
		DBName:        dbName,
		JWTSecret:     jwtSecret,
		AdminEmail:    adminEmail,
		AdminPassword: adminPassword,
	}
}
