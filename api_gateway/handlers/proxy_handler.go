package handlers

import (
	"api_gateway/pkg/logger"
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

func forwardRequest(ctx *fiber.Ctx, serviceURL string) error {
	originalPath := ctx.OriginalURL()
	apiPrefix := "/api"
	path := originalPath
	if strings.HasPrefix(originalPath, apiPrefix) {
		path = originalPath[len(apiPrefix):]
	}

	url := fmt.Sprintf("%s%s", serviceURL, path)
	logger.Log.Info("Forwarding Request", zap.String("url", url), zap.String("method", ctx.Method()))

	req, err := http.NewRequest(ctx.Method(), url, bytes.NewReader(ctx.BodyRaw()))
	if err != nil {
		logger.Log.Error("Failed to create request", zap.Error(err))
		return ctx.Status(500).SendString("Failed to create request")
	}

	for key, values := range req.Header {
		logger.Log.Info("Forwarding header", zap.String("key", key), zap.Strings("values", values))
	}

	for key, values := range ctx.GetReqHeaders() {
		for _, value := range values {
			req.Header.Add(key, value)
		}
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		logger.Log.Error("Service unreachable", zap.Error(err))
		return ctx.Status(500).SendString("Service unreachable")
	}
	defer resp.Body.Close()

	ctx.Set("Content-Type", resp.Header.Get("Content-Type"))
	ctx.Status(resp.StatusCode)

	body, _ := io.ReadAll(resp.Body)
	return ctx.Send(body)
}

func ForwardAuth(c *fiber.Ctx) error {
	return forwardRequest(c, os.Getenv("AUTH_SERVICE_URL"))
}

func ForwardTeam(c *fiber.Ctx) error {
	return forwardRequest(c, os.Getenv("TEAM_SERVICE_URL"))
}
