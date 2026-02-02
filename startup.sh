#!/bin/bash

# JAB Interactive Manual - Developer Startup Script
# This script helps beginners get started quickly by checking prerequisites
# and starting the development server with hot-reload enabled.

set -e  # Exit on error

# Color codes for pretty output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "\n${CYAN}════════════════════════════════════════${NC}"
    echo -e "${CYAN}  JAB Interactive Manual - Dev Setup${NC}"
    echo -e "${CYAN}════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_step() {
    echo -e "\n${CYAN}▶${NC} $1"
}

# Ask yes/no question (default yes)
ask_yes_no() {
    local prompt="$1"
    local default="${2:-y}"
    
    if [ "$default" = "y" ]; then
        prompt="$prompt [Y/n]: "
    else
        prompt="$prompt [y/N]: "
    fi
    
    read -p "$(echo -e ${YELLOW}$prompt${NC})" response
    response=${response:-$default}
    
    [[ "$response" =~ ^[Yy]$ ]]
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Homebrew (macOS only)
install_homebrew() {
    print_step "Installing Homebrew (package manager for macOS)"
    print_info "Homebrew helps install developer tools easily."
    
    if ask_yes_no "Would you like to install Homebrew now?"; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for Apple Silicon Macs
        if [[ $(uname -m) == 'arm64' ]]; then
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
        
        print_success "Homebrew installed successfully!"
        return 0
    else
        print_warning "Skipping Homebrew installation. You'll need to install Node.js manually."
        return 1
    fi
}

# Install nvm (Node Version Manager)
install_nvm() {
    print_step "Installing nvm (Node Version Manager)"
    print_info "nvm allows you to easily manage different Node.js versions."
    
    if ask_yes_no "Would you like to install nvm now?"; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        
        # Load nvm
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        print_success "nvm installed successfully!"
        return 0
    else
        print_warning "Skipping nvm installation. You'll need to install Node.js manually."
        return 1
    fi
}

# Install Node.js via nvm
install_node() {
    print_step "Installing Node.js"
    print_info "Node.js is required to run the development server."
    
    if command_exists nvm; then
        nvm install 18
        nvm use 18
        print_success "Node.js 18 installed and activated!"
    else
        print_error "nvm is not available. Cannot install Node.js automatically."
        return 1
    fi
}

# Main script starts here
main() {
    print_header
    
    print_info "This script will check your system and help set up everything needed"
    print_info "to run the JAB Interactive Manual in development mode.\n"
    
    # Step 1: Check operating system
    print_step "Checking operating system"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_success "Running on macOS"
        IS_MAC=true
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_success "Running on Linux"
        IS_MAC=false
    else
        print_warning "Running on $OSTYPE (untested)"
        IS_MAC=false
    fi
    
    # Step 2: Check for Homebrew (macOS only)
    if [ "$IS_MAC" = true ]; then
        print_step "Checking for Homebrew"
        if command_exists brew; then
            print_success "Homebrew is installed"
        else
            print_warning "Homebrew is not installed"
            install_homebrew || true
        fi
    fi
    
    # Step 3: Check for nvm
    print_step "Checking for nvm (Node Version Manager)"
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        \. "$NVM_DIR/nvm.sh"
        print_success "nvm is installed (version: $(nvm --version))"
    else
        print_warning "nvm is not installed"
        if install_nvm; then
            \. "$NVM_DIR/nvm.sh"
        fi
    fi
    
    # Step 4: Check for Node.js
    print_step "Checking for Node.js"
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed ($NODE_VERSION)"
        
        # Check if version is >= 18
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_warning "Node.js version $NODE_VERSION is too old (need >= 18.0.0)"
            if command_exists nvm; then
                if ask_yes_no "Would you like to install Node.js 18?"; then
                    install_node
                fi
            fi
        fi
    else
        print_warning "Node.js is not installed"
        if command_exists nvm; then
            install_node
        else
            print_error "Cannot install Node.js without nvm or manual installation."
            print_info "Please install Node.js 18+ from https://nodejs.org/"
            exit 1
        fi
    fi
    
    # Step 5: Check for npm
    print_step "Checking for npm"
    if command_exists npm; then
        print_success "npm is installed (version: $(npm --version))"
    else
        print_error "npm is not installed (should come with Node.js)"
        exit 1
    fi
    
    # Step 6: Check for node_modules
    print_step "Checking for dependencies (node_modules)"
    if [ -d "node_modules" ]; then
        print_success "Dependencies are already installed"
    else
        print_warning "Dependencies are not installed"
        print_info "Installing dependencies with 'npm install'..."
        npm install
        print_success "Dependencies installed successfully!"
    fi
    
    # Step 7: Start the development server
    print_step "Starting development server"
    print_info "The server will:"
    print_info "  • Watch for file changes (HTML, CSS, JS, JSON)"
    print_info "  • Automatically rebuild when files change"
    print_info "  • Serve the site at http://localhost:8080"
    print_info "  • Open your browser automatically"
    echo ""
    print_info "Press Ctrl+C to stop the server when you're done"
    echo ""
    
    if ask_yes_no "Ready to start the development server?"; then
        print_success "Starting server with hot-reload enabled..."
        echo ""
        c
    else
        print_info "Skipped server startup. You can start it later with:"
        print_info "  npm run dev:preview"
    fi
}

# Run the main function
main
