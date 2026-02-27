import http.server
import os
import socketserver
import argparse
import sys
import ssl
import subprocess
from pathlib import Path

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Get the full path
        path = self.path.split('?')[0]  # Remove query string
        
        # Check if the file exists
        file_path = os.path.join(os.getcwd(), path.lstrip('/'))
        
        # If it's not a real file and doesn't look like an asset, serve index.html
        if not os.path.isfile(file_path):
            # Check if it's likely an asset (has a file extension)
            asset_extensions = ['.js', '.css', '.png', '.ico', '.json', '.webmanifest', '.svg', '.woff', '.woff2', '.ttf', '.eot']
            is_asset = any(path.endswith(ext) for ext in asset_extensions)
            
            if not is_asset:
                self.path = '/index.html'
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def find_or_generate_ssl_certificates(cert_file='cert.pem', key_file='key.pem'):
    """Find existing mkcert certificates or generate self-signed SSL certificates for HTTPS"""
    # Check for mkcert-generated certificates first (they have + in the name)
    import glob
    mkcert_certs = glob.glob('*+[0-9].pem')
    if mkcert_certs:
        for cert in mkcert_certs:
            key_candidate = cert.replace('.pem', '-key.pem')
            if os.path.exists(key_candidate):
                print(f"Found mkcert certificates: {cert}, {key_candidate}")
                return cert, key_candidate
    
    # Check for provided paths
    if os.path.exists(cert_file) and os.path.exists(key_file):
        return cert_file, key_file
    
    print(f"Generating self-signed SSL certificates...")
    try:
        # Use openssl to generate self-signed certificate
        subprocess.run([
            'openssl', 'req', '-x509', '-newkey', 'rsa:2048',
            '-keyout', key_file, '-out', cert_file,
            '-days', '365', '-nodes',
            '-subj', '/CN=localhost'
        ], check=True, capture_output=True)
        print(f"✓ Certificates generated: {cert_file}, {key_file}")
        return cert_file, key_file
    except FileNotFoundError:
        print("Error: openssl not found. Please install OpenSSL or provide existing cert/key files.")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error generating certificates: {e}")
        sys.exit(1)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='SPA HTTP Server')
    parser.add_argument('--dir', default='.', help='Directory to serve (default: current directory)')
    parser.add_argument('--port', type=int, default=8080, help='Port to serve on (default: 8080)')
    parser.add_argument('--ssl', action='store_true', help='Enable HTTPS with self-signed certificates')
    parser.add_argument('--cert', default='cert.pem', help='Path to SSL certificate file (default: cert.pem)')
    parser.add_argument('--key', default='key.pem', help='Path to SSL key file (default: key.pem)')
    
    args = parser.parse_args()
    
    # Save original directory for certificate lookup
    original_dir = os.getcwd()
    
    # Convert certificate paths to absolute paths before changing directory
    cert_file = os.path.abspath(args.cert)
    key_file = os.path.abspath(args.key)
    
    # Setup SSL if requested (do this BEFORE changing directory)
    use_ssl = args.ssl
    
    if use_ssl:
        # Search for certs in original directory if not found in current paths
        if not os.path.exists(cert_file) or not os.path.exists(key_file):
            import glob
            mkcert_certs = glob.glob(os.path.join(original_dir, '*+[0-9].pem'))
            if mkcert_certs:
                cert = mkcert_certs[0]
                key = cert.replace('.pem', '-key.pem')
                if os.path.exists(key):
                    cert_file = cert
                    key_file = key
                    print(f"Found mkcert certificates: {os.path.basename(cert_file)}, {os.path.basename(key_file)}")
    
    # Change to the specified directory
    os.chdir(args.dir)
    
    with socketserver.TCPServer(("", args.port), SPAHandler) as httpd:
        if use_ssl:
            # Make sure we have cert files
            if not os.path.exists(cert_file) or not os.path.exists(key_file):
                # Try one more time to find them with fallback generation
                cert_file, key_file = find_or_generate_ssl_certificates(cert_file, key_file)
            
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain(cert_file, key_file)
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            protocol = "https"
        else:
            protocol = "http"
        
        print(f"Server running at {protocol}://localhost:{args.port}")
        print(f"Serving from: {os.getcwd()}")
        if use_ssl:
            import socket
            hostname = socket.gethostname()
            print(f"Also accessible at: {protocol}://{hostname.lower()}:{args.port}")
            print("Note: Using mkcert certificates - they're trusted on this machine!")
        httpd.serve_forever()
