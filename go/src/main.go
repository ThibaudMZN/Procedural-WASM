package main

import (
    perlin "github.com/aquilax/go-perlin"
    "fmt"
)

func main() {
    p := perlin.NewPerlin(0.4, 0.6, 2, 0xDEADBEEF)

    for x := 0; x <= 1000; x++ {
        for y := 0; y <= 1000; y++ {
            _ = p.Noise2D(float64(x)/100, float64(y)/100)
        }
    }
    fmt.Println("End...")
}
