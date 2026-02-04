# JAB Interactive Manual - Windows Startup Script
# This script helps Windows developers get started quickly.

$ErrorActionPreference = "Stop"

function Write-Header {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  JAB Interactive Manual - Windows Setup" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$message)
    Write-Host "V $message" -ForegroundColor Green
}

function Write-Info {
    param([string]$message)
    Write-Host "i $message" -ForegroundColor Blue
}

function Write-Warning {
    param([string]$message)
    Write-Host "! $message" -ForegroundColor Yellow
}

function Write-ErrorMsg {
    param([string]$message)
    Write-Host "X $message" -ForegroundColor Red
}

function Check-Command {
    param([string]$command)
    Get-Command $command -ErrorAction SilentlyContinue
}

main {
    Write-Header
    
    Write-Info "Checking your system for development tools..."

    # Step 1: Check for Node.js
    if (-not (Check-Command node)) {
        # Try common installation paths if not in PATH
        $nodePath = "C:\Program Files\nodejs\node.exe"
        if (Test-Path $nodePath) {
            Write-Success "Found Node.js at $nodePath (adding to current session)"
            $env:Path += ";C:\Program Files\nodejs\"
        } else {
            Write-ErrorMsg "Node.js is not installed or not in PATH."
            Write-Info "Please install Node.js LTS from https://nodejs.org/"
            exit 1
        }
    }
    
    $nodeVersion = node -v
    Write-Success "Node.js is ready ($nodeVersion)"

    # Step 2: Check for dependencies
    Write-Info "Checking for dependencies (node_modules)..."
    if (-not (Test-Path "node_modules")) {
        Write-Warning "Dependencies are not installed."
        Write-Info "Installing dependencies with 'npm install'..."
        npm install
        Write-Success "Dependencies installed successfully!"
    } else {
        Write-Success "Dependencies are already installed."
    }

    # Step 3: Start development server
    Write-Host "`nReady to start the development server!" -ForegroundColor Yellow
    Write-Info "The server will:"
    Write-Info "  * Watch for file changes"
    Write-Info "  * Automatically rebuild"
    Write-Info "  * Serve at http://localhost:8080"
    Write-Info "  * Open your browser automatically"
    Write-Host "`nPress Ctrl+C to stop the server when you're done.`n" -ForegroundColor Gray

    $response = Read-Host "Ready to start? [Y/n]"
    if ($response -eq "" -or $response -match "^y") {
        Write-Success "Starting server..."
        npm run dev:preview
    } else {
        Write-Info "Skipped server startup. You can start it later with: npm run dev:preview"
    }
}

main
