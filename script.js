// Function to render Markdown preview
        function renderMarkdown() {
            const input = document.getElementById('markdownInput').value;
            const preview = document.getElementById('markdownPreview');
            preview.innerHTML = marked.parse(input);
            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, preview]);
        }

        // Function to apply text formatting (Bold, Italic, Code)
        function applyFormat(format) {
            const textarea = document.getElementById('markdownInput');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            let selectedText = textarea.value.substring(start, end);
            const before = textarea.value.substring(0, start);
            const after = textarea.value.substring(end);

            if (format === 'bold') {
                selectedText = '**' + selectedText + '**';
            } else if (format === 'italic') {
                selectedText = '*' + selectedText + '*';
            } else if (format === 'code') {
                selectedText = '`' + selectedText + '`';
            }

            textarea.value = before + selectedText + after;
            renderMarkdown();
        }

        // Event listener to update preview when input changes
        document.getElementById('markdownInput').addEventListener('input', renderMarkdown);

        // Function to export content as HTML
        document.getElementById('exportBtn').addEventListener('click', function() {
            const content = `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Exported Markdown</title></head><body>${document.getElementById('markdownPreview').innerHTML}</body></html>`;
            const blob = new Blob([content], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'exported.html';
            a.click();
            URL.revokeObjectURL(a.href);
        });

        // Function to clear the Markdown editor
        document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('markdownInput').value = '';
            renderMarkdown();
        });

        // Initialize preview on page load
        window.addEventListener('load', () => {
            renderMarkdown();
        });
