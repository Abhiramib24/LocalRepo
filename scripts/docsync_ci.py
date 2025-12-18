import os
from pathlib import Path
from typing import List

import requests  # kept for future real LLM use, not required if you use a placeholder

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"

# Adjust this to match your languages
CODE_EXTS = (".py", ".js", ".ts", ".tsx", ".java", ".cs")


def find_code_files(root: Path) -> List[Path]:
    """Find all code files in the repo, skipping some standard dirs."""
    excluded_dirs = {".git", "docs", "node_modules", "__pycache__"}

    code_files: List[Path] = []

    for dirpath, dirnames, filenames in os.walk(root):
        # Skip excluded dirs
        dirnames[:] = [d for d in dirnames if d not in excluded_dirs]

        for filename in filenames:
            if filename.endswith(CODE_EXTS):
                full_path = Path(dirpath) / filename
                code_files.append(full_path)

    return code_files


# ------------ LLM / placeholder ------------
def call_llm(prompt: str) -> str:
    """
    For now, this is a placeholder.

    If you want to use a local LLM only on your machine,
    keep the real LLM version in docsync_local.py
    and leave this one as a safe stub for CI.
    """
    return (
        "# Auto-generated documentation (placeholder)\n\n"
        "This is a stub response from call_llm() running in CI.\n\n"
        "In a real deployment with an approved LLM, this would contain\n"
        "true AI-generated documentation based on the code.\n"
    )
# -------------------------------------------


def generate_doc_for_file(source_path: Path) -> str:
    """Create a prompt and call the LLM/placeholder."""
    rel_path = source_path.relative_to(REPO_ROOT)

    try:
        code = source_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        return (
            "# Documentation generation failed\n\n"
            f"Could not read file {rel_path}: {e}\n"
        )

    prompt = (
        "You are a documentation assistant.\n\n"
        "Generate clear Markdown documentation for the following source file.\n\n"
        f"File path: {rel_path}\n\n"
        "Source code:\n```text\n"
        f"{code}\n"
        "```\n\n"
        "Documentation requirements:\n"
        "- Start with an H1 title using the file name.\n"
        "- Briefly describe what this file/module does.\n"
        "- List and explain the main classes and functions.\n"
        "- Add a 'Usage' section with example usage if possible.\n"
        "- Use Markdown headings and bullet points.\n"
    )

    return call_llm(prompt)


def write_doc_file(source_path: Path, markdown: str) -> Path:
    """
    Write documentation into docs/, mirroring the source structure.

    e.g. src/foo/bar.py -> docs/src/foo/bar.py.md
    """
    rel_source = source_path.relative_to(REPO_ROOT)
    doc_path = DOCS_DIR / rel_source
    doc_path = doc_path.with_suffix(doc_path.suffix + ".md")

    doc_path.parent.mkdir(parents=True, exist_ok=True)
    doc_path.write_text(markdown, encoding="utf-8")

    return doc_path


def main():
    print(f"Repo root: {REPO_ROOT}")

    DOCS_DIR.mkdir(exist_ok=True)

    code_files = find_code_files(REPO_ROOT)

    if not code_files:
        print("No code files found. Adjust CODE_EXTS or directory structure.")
        return

    print(f"Found {len(code_files)} code files to document.")

    for i, source_path in enumerate(code_files, start=1):
        print(f"\n[{i}/{len(code_files)}] Generating docs for: {source_path}")
        markdown = generate_doc_for_file(source_path)
        output_path = write_doc_file(source_path, markdown)
        print(f" -> Wrote docs to: {output_path}")

    print("\n✅ DocSync CI run complete. Check the 'docs/' folder for generated files.")

if __name__=="__main__":
    main()