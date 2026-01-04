package logger

import (
	"go.uber.org/zap"
)

var Log *zap.Logger

func Init() {
	var err error
	// Using NewDevelopment for more human-readable logs during dev,
	// switch to NewProduction for JSON logs in prod.
	Log, err = zap.NewDevelopment()
	if err != nil {
		panic(err)
	}
}

func Sync() {
	if Log != nil {
		_ = Log.Sync()
	}
}
