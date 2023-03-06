package main

import (
	"github.com/aquilax/go-perlin"
)

// "fmt"

// perlin "github.com/aquilax/go-perlin"

var instance *perlin.Perlin

func main() {
}

/* DON'T ADD SPACE BEFORE export ! */
//export multiply
func Multiply(x, y int) int {
	return x * y
}

//export NewPerlin
func NewPerlin(seed int) int {
	instance = perlin.NewPerlin(2, 2, 1, int64(seed))
	return 0
}

//export Perlin
func Perlin(x, y float32) float32 {
	r := instance.Noise2D(float64(x), float64(y))
	return float32(r)
}
