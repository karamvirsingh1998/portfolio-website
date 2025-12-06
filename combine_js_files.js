// combine_js_files.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateDirectoryTree(directoryPath, ignoreDirs = [], ignoreFiles = [], prefix = "") {
    const output = [];
    const baseName = path.basename(directoryPath);

    if (!prefix) {
        output.push(`📁 ${baseName}/`);
        prefix = "    ";
    }

    try {
        const entries = fs.readdirSync(directoryPath);
        const dirs = [];
        const files = [];

        for (const entry of entries) {
            const fullPath = path.join(directoryPath, entry);
            if (fs.statSync(fullPath).isDirectory() && !ignoreDirs.includes(entry)) {
                dirs.push(entry);
            } else if (
                fs.statSync(fullPath).isFile() &&
                (entry.endsWith('.js') || entry.endsWith('.jsx')) &&
                !ignoreFiles.includes(entry)
            ) {
                files.push(entry);
            }
        }

        dirs.sort();
        files.sort();

        dirs.forEach((dirName, idx) => {
            const isLastDir = idx === dirs.length - 1 && files.length === 0;
            const marker = isLastDir ? "└──" : "├──";
            output.push(`${prefix}${marker} 📁 ${dirName}/`);

            const subdirPrefix = prefix + (isLastDir ? "    " : "│   ");
            const subdirPath = path.join(directoryPath, dirName);
            output.push(...generateDirectoryTree(subdirPath, ignoreDirs, ignoreFiles, subdirPrefix));
        });

        files.forEach((fileName, idx) => {
            const isLast = idx === files.length - 1;
            const marker = isLast ? "└──" : "├──";
            output.push(`${prefix}${marker} 📄 ${fileName}`);
        });

    } catch (error) {
        output.push(`${prefix}└── ⚠️  Error: ${error.message}`);
    }

    return output;
}

function combineJSFiles(directoryPath, outputFile = 'combined_project.js', ignoreDirs = [], ignoreFiles = []) {
    const defaultIgnoreDirs = ['node_modules', '.git', 'dist', 'build'];
    const defaultIgnoreFiles = ['combined_project.js'];

    ignoreDirs = [...new Set([...defaultIgnoreDirs, ...ignoreDirs])];
    ignoreFiles = [...new Set([...defaultIgnoreFiles, ...ignoreFiles])];

    let output = `/**
 * Combined JavaScript Project Files
 * Generated on: ${new Date().toISOString()}
 * Original directory: ${path.resolve(directoryPath)}
 *
 * Project Structure:
 */\n\n`;

    const dirTree = generateDirectoryTree(directoryPath, ignoreDirs, ignoreFiles);
    output += dirTree.join('\n') + '\n\n';

    function walkDir(currentPath) {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
            const filePath = path.join(currentPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory() && !ignoreDirs.includes(file)) {
                walkDir(filePath);
            } else if (
                stat.isFile() &&
                (file.endsWith('.js') || file.endsWith('.jsx')) &&
                !ignoreFiles.includes(file)
            ) {
                const relativePath = path.relative(directoryPath, filePath);
                const content = fs.readFileSync(filePath, 'utf8');

                output += `// ${'='.repeat(50)}\n`;
                output += `// File: ${relativePath}\n`;
                output += `// ${'='.repeat(50)}\n\n`;
                output += content + '\n\n';
            }
        }
    }

    try {
        walkDir(directoryPath);
        fs.writeFileSync(outputFile, output, 'utf8');
        console.log(`Successfully combined JavaScript files into ${outputFile}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        directory: process.cwd(),
        output: 'combined_project.js',
        ignoreDirs: [],
        ignoreFiles: []
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--directory':
            case '-d':
                options.directory = args[++i];
                break;
            case '--output':
            case '-o':
                options.output = args[++i];
                break;
            case '--ignore-dirs':
                i++;
                while (i < args.length && !args[i].startsWith('-')) {
                    options.ignoreDirs.push(args[i++]);
                }
                i--;
                break;
            case '--ignore-files':
                i++;
                while (i < args.length && !args[i].startsWith('-')) {
                    options.ignoreFiles.push(args[i++]);
                }
                i--;
                break;
        }
    }

    return options;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
    const options = parseArgs();
    combineJSFiles(
        options.directory,
        options.output,
        options.ignoreDirs,
        options.ignoreFiles
    );
}

export {
    generateDirectoryTree,
    combineJSFiles
};