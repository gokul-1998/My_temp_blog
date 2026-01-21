import '@testing-library/jest-dom';

// Polyfill for Request/Response/Headers/fetch in JSDOM environments.
// This ensures that `fetch` and related constructors are available for testing
// components that rely on them, especially when using Next.js features like
// `NextResponse.json` which internally uses `Response`.
if (typeof global.Request === 'undefined' || typeof global.Response === 'undefined' || typeof global.Headers === 'undefined' || typeof global.fetch === 'undefined') {
    // Dynamically import 'whatwg-fetch' only if necessary.
    // This avoids loading it in environments where it's already present (e.g., modern browsers).
    // Using `require` for conditional loading in Node.js/JSDOM context.
    try {
        const { Request, Response, Headers, fetch } = require('whatwg-fetch');
        if (typeof global.Request === 'undefined') global.Request = Request;
        if (typeof global.Response === 'undefined') global.Response = Response;
        if (typeof global.Headers === 'undefined') global.Headers = Headers;
        if (typeof global.fetch === 'undefined') global.fetch = fetch;
    } catch (e) {
        console.warn("whatwg-fetch could not be loaded. Fetch API polyfill might be missing.", e);
    }
}

// Polyfill for `Response.json` static method.
// `NextResponse.json` uses `Response.json`, which might be missing in older
// environments or JSDOM, especially if `whatwg-fetch` is used which might not
// include this static method by default.
if (typeof global.Response !== 'undefined' && !global.Response.json) {
    global.Response.json = (data, init) => {
        const body = JSON.stringify(data);
        const responseInit = {
            ...init,
            headers: new (global.Headers || Headers)(init?.headers || {}) // Use global.Headers if available, fallback to local Headers
        };
        if (!responseInit.headers.has('content-type')) {
            responseInit.headers.set('content-type', 'application/json');
        }
        return new (global.Response || Response)(body, responseInit); // Use global.Response if available, fallback to local Response
    };
}
