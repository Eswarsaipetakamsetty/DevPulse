package routes

import (
	"api_gateway/handlers"
	"api_gateway/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetUpRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.All("/auth/*", handlers.ForwardAuth)
	api.All("/team/*", middleware.JWTProtected(), handlers.ForwardTeam)
}
