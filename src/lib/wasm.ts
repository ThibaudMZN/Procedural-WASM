/* Go is declared by wasm_exec.js */
declare var Go: any;

const go : any = new Go();

/*
export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response = undefined;

  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };

    response = await fetchAndInstantiateTask();
  }

  return response;
};

const _tinygoPerlin:any = async() => {
    // Get the importObject from the go instance.
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./src-tiny.wasm", importObject);

    // Allow the wasm_exec go instance, bootstrap and execute our wasm module
    go.run(wasmModule.instance);

    return wasmModule.instance.exports;
};

const tinygoPerlin: any = await _tinygoPerlin();
*/

const tinygoPerlin = new Object;
// @ts-nocheck 
tinygoPerlin.NewPerlin = function(a: number) {}
tinygoPerlin.Perlin = function(a: number, b: number) { return 0 };

export { tinygoPerlin };

