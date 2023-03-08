package main

import (
	"github.com/aquilax/go-perlin"
    "fmt"
    "time"
)

var instance *perlin.Perlin

func main() {
}

func main_test() {
	start := time.Now()

	p := perlin.NewPerlin(2, 2, 1, 42)
	for x := 0; x <= 5000; x++ {
		for y := 0; y <= 5000; y++ {
			_ = p.Noise2D(float64(x)/100, float64(y)/100)
			_ = p.Noise2D(float64(x)/100, float64(y)/100)
		}
	}
	t := time.Now()
	fmt.Println("It tooks", t.Sub(start), "ms")
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
