

Install tinygo to be able to "control" export in WASM

https://tinygo.org/getting-started/install/linux/

Install wabt 

https://github.com/WebAssembly/wabt


Inspect a WASM

```
$ wasm-objdump -j export -x source.wasm
source.wasm:    file format wasm 0x1

Section Details:

Export[4]:
 - func[862] <wasm_export_run> -> "run"
 - func[863] <wasm_export_resume> -> "resume"
 - func[865] <wasm_export_getsp> -> "getsp"
 - memory[0] -> "mem"
```
