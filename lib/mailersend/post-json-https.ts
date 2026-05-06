import https from "node:https";
import { URL } from "node:url";

export function postJsonHttps(
  urlString: string,
  headerMap: Record<string, string>,
  body: string,
  timeoutMs: number,
): Promise<{ status: number; body: string }> {
  return new Promise(function post(resolve, reject) {
    const url = new URL(urlString);
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        port: 443,
        servername: url.hostname,
        headers: {
          ...headerMap,
          "Content-Length": String(Buffer.byteLength(body, "utf8")),
        },
      },
      function onRes(res) {
        const chunks: Buffer[] = [];
        res.on("data", function onData(c) {
          chunks.push(c);
        });
        res.on("end", function onEnd() {
          clearTimeout(timer);
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") });
        });
      },
    );
    const timer = setTimeout(function onTimeout() {
      req.destroy(new Error(`Connect or request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    req.on("error", function onErr(e) {
      clearTimeout(timer);
      reject(e);
    });
    req.write(body, "utf8");
    req.end();
  });
}
