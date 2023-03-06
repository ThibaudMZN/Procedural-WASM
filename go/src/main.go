package main

import (
	"fmt"

	"github.com/aquilax/go-perlin"
)

// "fmt"

// perlin "github.com/aquilax/go-perlin"

var instance *perlin.Perlin

func main() {
	p := perlin.NewPerlin(2, 2, 1, 42)

	for x := 0; x <= 1000; x++ {
		for y := 0; y <= 1000; y++ {
			_ = p.Noise2D(float64(x)/100, float64(y)/100)
		}
	}
	fmt.Println("End...")
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
func Perlin(x, y int) int {
	return int(instance.Noise2D(float64(x), float64(y)))
}
