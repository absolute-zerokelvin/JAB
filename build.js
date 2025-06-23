#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JABBuilder {
    constructor() {
        this.sourceDir = __dirname;
        this.distDir = path.join(__dirname, 'dist');
        this.isDev = process.argv.includes('--dev');
        this.version = this.getVersion();
        this.buildTime = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
        this.fileHashes = new Map();
    }

    getVersion() {
        try {
            const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
            return pkg.version;
        } catch {
            return '1.0.0';
        }
    }

    // Generate file hash for cache busting
    generateFileHash(filePath) {
        try {
            const content = fs.readFileSync(filePath);
            return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
        } catch {
            return this.buildTime;
        }
    }

    // Clean and create dist directory
    async prepareDist() {
        console.log('🧹 Cleaning dist directory...');
        await fs.remove(this.distDir);
        await fs.ensureDir(this.distDir);
    }

    // Copy static assets
    async copyAssets() {
        console.log('📁 Copying assets...');
        
        const assetDirs = ['images', 'data'];
        for (const dir of assetDirs) {
            const srcPath = path.join(this.sourceDir, dir);
            const destPath = path.join(this.distDir, dir);
            
            if (await fs.pathExists(srcPath)) {
                await fs.copy(srcPath, destPath);
                console.log(`   ✓ Copied ${dir}/`);
            }
        }
    }

    // Process CSS files with cache busting
    async processCSSFiles() {
        console.log('🎨 Processing CSS files...');
        
        const cssDir = path.join(this.sourceDir, 'css');
        const distCssDir = path.join(this.distDir, 'css');
        
        await fs.ensureDir(distCssDir);
        
        const cssFiles = await fs.readdir(cssDir);
        const processedFiles = new Map();
        
        for (const file of cssFiles) {
            if (path.extname(file) === '.css') {
                const srcPath = path.join(cssDir, file);
                const hash = this.generateFileHash(srcPath);
                const fileName = path.basename(file, '.css');
                const hashedName = this.isDev ? file : `${fileName}.${hash}.css`;
                const destPath = path.join(distCssDir, hashedName);
                
                let content = await fs.readFile(srcPath, 'utf8');
                
                // Minify CSS in production
                if (!this.isDev) {
                    content = this.minifyCSS(content);
                }
                
                await fs.writeFile(destPath, content);
                processedFiles.set(file, hashedName);
                console.log(`   ✓ Processed ${file} → ${hashedName}`);
            }
        }
        
        return processedFiles;
    }

    // Process JavaScript files with cache busting
    async processJSFiles() {
        console.log('⚡ Processing JavaScript files...');
        
        const jsDir = path.join(this.sourceDir, 'js');
        const distJsDir = path.join(this.distDir, 'js');
        
        await fs.ensureDir(distJsDir);
        
        const jsFiles = await fs.readdir(jsDir);
        const processedFiles = new Map();
        
        for (const file of jsFiles) {
            if (path.extname(file) === '.js') {
                const srcPath = path.join(jsDir, file);
                const hash = this.generateFileHash(srcPath);
                const fileName = path.basename(file, '.js');
                const hashedName = this.isDev ? file : `${fileName}.${hash}.js`;
                const destPath = path.join(distJsDir, hashedName);
                
                let content = await fs.readFile(srcPath, 'utf8');
                
                // Update cache-bust.js with build info
                if (file === 'cache-bust.js') {
                    content = this.updateCacheBustFile(content);
                }
                
                // Minify JS in production (simple minification)
                if (!this.isDev) {
                    content = this.minifyJS(content);
                }
                
                await fs.writeFile(destPath, content);
                processedFiles.set(file, hashedName);
                console.log(`   ✓ Processed ${file} → ${hashedName}`);
            }
        }
        
        return processedFiles;
    }

    // Update cache-bust.js with current build info
    updateCacheBustFile(content) {
        content = content.replace(/this\.buildTime = '[^']*'/, `this.buildTime = '${this.buildTime}'`);
        content = content.replace(/this\.version = '[^']*'/, `this.version = '${this.version}'`);
        return content;
    }

    // Process HTML files and update asset references
    async processHTMLFiles(cssMap, jsMap) {
        console.log('📄 Processing HTML files...');
        
        const htmlFiles = [
            'index.html', 
            'story.html',
            'timeline_duration-junior.html', 
            'timeline_duration-senior.html',
            'timeline-k-to-m.html',
            'B1.html',
            'B2.html',
            'B3.html',
            'B4.html',
            'B5.html',
            'B6.html',
            'B7.html',
            'L2.html'

        ];
        
        for (const file of htmlFiles) {
            const srcPath = path.join(this.sourceDir, file);
            
            if (await fs.pathExists(srcPath)) {
                let content = await fs.readFile(srcPath, 'utf8');
                
                // Update CSS references
                for (const [original, hashed] of cssMap) {
                    const regex = new RegExp(`href="\\./css/${original}"`, 'g');
                    content = content.replace(regex, `href="./css/${hashed}"`);
                }
                
                // Update JS references
                for (const [original, hashed] of jsMap) {
                    const regex = new RegExp(`src="\\./js/${original}"`, 'g');
                    content = content.replace(regex, `src="./js/${hashed}"`);
                }
                
                // Add build info comment
                const buildComment = `<!-- Built: ${new Date().toISOString()} | Version: ${this.version} | Build: ${this.buildTime} -->`;
                content = content.replace('</head>', `  ${buildComment}\n</head>`);
                
                const destPath = path.join(this.distDir, file);
                await fs.writeFile(destPath, content);
                console.log(`   ✓ Processed ${file}`);
            }
        }
    }

    // Copy templates directory
    async copyTemplates() {
        console.log('📋 Copying templates...');
        
        const templatesDir = path.join(this.sourceDir, 'templates');
        const distTemplatesDir = path.join(this.distDir, 'templates');
        
        if (await fs.pathExists(templatesDir)) {
            await fs.copy(templatesDir, distTemplatesDir);
            console.log('   ✓ Copied templates/');
        }
    }

    // Simple CSS minification
    minifyCSS(css) {
        return css
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/;\s*}/g, '}') // Remove last semicolon
            .replace(/,\s+/g, ',') // Remove space after commas
            .replace(/{\s+/g, '{') // Remove space after opening braces
            .replace(/}\s+/g, '}') // Remove space after closing braces
            .trim();
    }

    // Simple JS minification
    minifyJS(js) {
        return js
            .replace(new RegExp("(?<!:)//.*$", "gm"), '') // Remove single line comments
            .replace(new RegExp("\\/\\*[\\s\\S]*?\\*\\/", "g"), '') // Remove multi-line comments
            .replace(/^\s+/gm, '') // Remove leading spaces
            .replace(/\s+$/gm, '') // Remove trailing spaces
            .replace(/\n+/g, '\n') // Collapse multiple newlines
            .trim();
    }

    // Generate build manifest
    async generateManifest(cssMap, jsMap) {
        const manifest = {
            version: this.version,
            buildTime: this.buildTime,
            timestamp: new Date().toISOString(),
            files: {
                css: Object.fromEntries(cssMap),
                js: Object.fromEntries(jsMap)
            }
        };
        
        await fs.writeFile(
            path.join(this.distDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        );
        
        console.log('📋 Generated build manifest');
    }

    // Main build process
    async build() {
        console.log('🚀 Starting JAB Manual build...');
        console.log(`📦 Version: ${this.version}`);
        console.log(`🏗️  Build: ${this.buildTime}`);
        console.log(`🎯 Mode: ${this.isDev ? 'Development' : 'Production'}`);
        console.log('');

        try {
            await this.prepareDist();
            await this.copyAssets();
            await this.copyTemplates();
            
            const cssMap = await this.processCSSFiles();
            const jsMap = await this.processJSFiles();
            
            await this.processHTMLFiles(cssMap, jsMap);
            await this.generateManifest(cssMap, jsMap);
            
            console.log('');
            console.log('✅ Build completed successfully!');
            console.log(`📁 Output directory: ${path.relative(process.cwd(), this.distDir)}`);
            
            if (this.isDev) {
                console.log('🔧 Development build - files not minified');
            } else {
                console.log('🚀 Production build - files minified and optimized');
            }
            
        } catch (error) {
            console.error('❌ Build failed:', error.message);
            process.exit(1);
        }
    }
}

// Run the build
const builder = new JABBuilder();
builder.build();
