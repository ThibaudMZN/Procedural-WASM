// import * as WebAssembly from '../../public/wasm_exec.js';

declare var Go: any;

const go : any = new Go();

export const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response = undefined;
  console.log("here");

  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    console.log("streaming", wasmModuleUrl);
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
    console.log(response)
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    console.log("fetch", wasmModuleUrl);
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };

    response = await fetchAndInstantiateTask();
    console.log(response)
  }

  return response;
};

const _goPerlin:any = async() => {
    // Get the importObject from the go instance.
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./src-tiny.wasm", importObject);

    // Allow the wasm_exec go instance, bootstrap and execute our wasm module
    go.run(wasmModule.instance);

    return wasmModule.instance.exports;
};

const goPerlin: any = await _goPerlin();

export { goPerlin };

