!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).DiagramEngine=n()}(this,function(){var e=function(){function e(){}return e.setEnginePath=function(n){e.enginePath=n},e.setErrorHandler=function(n){e.globalErrorHandler=n},e.renderDiagram=function(n){var r=n.container,t=n.type,a=n.code,i=n.theme;return new Promise(function(n,o){if(!e.enginePath)throw new Error("Diagram Engine path not set, use DiagramEngine.setEnginePath('path-to-engine')");if(!("string"==typeof r?document.querySelector(r):r))throw new Error("Could not find container DOM element");var d=r.querySelector("iframe[diagram-renderer]");if(!d)throw new Error("Please call DiagramEngine.init(container) to initialize the engine first");e.addMessageHandler("diagram-render-finished",d,function(e){n()},!0),d.contentWindow.postMessage({type:"render-diagram",data:{type:t,code:a,theme:i}},"*")})},e.init=function(n){try{return Promise.resolve(new Promise(function(r){var t=n.querySelector("iframe[diagram-renderer]");t&&t.remove(),n.innerHTML="",(t=document.createElement("iframe")).style.width="100%",t.style.height="100%",t.style.border="none",t.style.minWidth="400px",t.style.minHeight="400px",t.setAttribute("diagram-renderer",""),t.setAttribute("ready","false"),t.src=e.enginePath,e.addMessageHandler("diagram-render-engine-ready",t,function(e){e.data&&"diagram-render-engine-ready"===e.data.type&&(t.setAttribute("ready","true"),r(t))},!0),n.appendChild(t)}))}catch(e){return Promise.reject(e)}},e.getSvg=function(n){var r=n.container;return new Promise(function(n){var t=r.querySelector("iframe[diagram-renderer]");if(!t)throw new Error("Please call DiagramEngine.init(container) to initialize the engine first");e.addMessageHandler("rendered-svg-response",t,function(e){console.log("getSvg handler ev:",e),n(e.data)},!0),t.contentWindow.postMessage({type:"request-rendered-svg"},"*")})},e.addMessageHandler=function(n,r,t,a){void 0===a&&(a=!1),e.handlers.push({eventName:n,iframe:r,cb:t,once:a})},e}();return window.addEventListener("message",function(n){if(n.data&&n.data.type){var r=e.handlers.find(function(e){return e.eventName===n.data.type&&e.iframe.contentWindow===n.source});if(r&&(r.cb(n),r.once)){var t=e.handlers.indexOf(r);e.handlers.splice(t,1)}n.data&&"diagram-render-error"===n.data.type&&e.globalErrorHandler&&e.globalErrorHandler(n.data)}}),e.handlers=[],e});
//# sourceMappingURL=diagram-codes-engine-client.umd.js.map
