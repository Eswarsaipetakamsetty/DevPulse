package main

import (
	"api_gateway/pkg/logger"
	"api_gateway/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

func main() {
	logger.InitLogger()
	defer logger.Log.Sync()

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env")
	}

	app := fiber.New()
	app.Use(func(ctx *fiber.Ctx) error {
		err := ctx.Next()
		logger.Log.Info("Request",
			zap.String("method", ctx.Method()),
			zap.String("url", ctx.OriginalURL()),
			zap.Int("status", ctx.Response().StatusCode()),
			zap.String("ip", ctx.IP()),
		)
		if err != nil {
			logger.Log.Error("Handler Error: ", zap.Error(err))
		}
		return err
	})

	routes.SetUpRoutes(app)

	logger.Log.Info("Server running on port 8080")
	log.Fatal(app.Listen(":8080"))
}
