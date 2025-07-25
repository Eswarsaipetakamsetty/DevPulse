package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Log *zap.Logger

func InitLogger() {
	config := zap.NewProductionEncoderConfig()
	config.TimeKey = "time"
	config.LevelKey = "level"
	config.NameKey = "logger"
	config.CallerKey = "caller"
	config.MessageKey = "msg"
	config.EncodeTime = zapcore.ISO8601TimeEncoder        // Human-readable time
	config.EncodeLevel = zapcore.CapitalColorLevelEncoder // Colorful logs

	core := zapcore.NewCore(
		zapcore.NewConsoleEncoder(config),
		zapcore.Lock(os.Stdout),
		zapcore.InfoLevel,
	)

	Log = zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
}
