#!/usr/bin/bash

# With standart go
GOOS=js GOARCH=wasm go build -o html/src.wasm

# with tinigo
# GOOJS=js GOARCH=wasm tinygo build -o src-tiny.wasm
tinygo build --target wasm -o html/src-tiny.wasm

# CONS:
# partial support of reflect
# GOMAXPROCS=1 / single core / single thread => call manually runtime.Gosched() to allow other goroutine to work

# option
# -no-debug
# -scheduler=none to disable goroutine
# -gc=leaking to disable GC (!)
# -panic=trap disable helper for error unmanaged
