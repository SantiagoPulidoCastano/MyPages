import csv
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

class FormHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        data = urllib.parse.parse_qs(
            self.rfile.read(length).decode("utf-8")
        )

        fila = [
            data.get("nombre", [""])[0],
            data.get("email", [""])[0],
            data.get("message", [""])[0],
        ]

        with open("solicitudes.csv", "a", newline="", encoding="utf-8") as archivo:
            csv.writer(archivo).writerow(fila)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Solicitud recibida")

HTTPServer(("localhost", 8080), FormHandler).serve_forever()