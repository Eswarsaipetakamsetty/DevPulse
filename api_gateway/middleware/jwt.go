package middleware

import (
	"api_gateway/pkg/logger"
	"encoding/base64"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.uber.org/zap"
)

func JWTProtected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenStr := c.Get("Authorization")[len("Bearer "):]
		decodedSecret, err := base64.StdEncoding.DecodeString(os.Getenv("JWT_SECRET"))
		if err != nil {
			logger.Log.Error("Cannot decode token", zap.Error(err))
		}
		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			return []byte(decodedSecret), nil
		})

		if err != nil || !token.Valid {
			logger.Log.Error("Invalid token")
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"detail": "Invalid token"})
		}
		return c.Next()
	}
}
