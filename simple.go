package main

import (
        "github.com/gin-gonic/gin"
        "runtime"
        ctl "./controllers"
)


func main() {
        gin.SetMode(gin.ReleaseMode)
        r := gin.Default()

        r.LoadHTMLGlob("templates/**/*")
        r.Static("/static", "./static")

        r.GET("/", ctl.Index)
        r.Run(":8080")
}

func init() {
        runtime.GOMAXPROCS(runtime.NumCPU())
}
