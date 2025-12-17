import os
import subprocess
from pathlib import Path
from typing import List

import requests  # installed in the workflow

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"


def run(cmd: List[str], cwd: Path = REPO_ROOT) -> str:
    """Run a shell command and return stdout."""
    result = subprocess.run(
        cmd,
        cwd=cwd,
        text=True,
        capture_output=True,
        check=True,
    )
    return result.stdout.strip()


def get_changed_files(before: str, after: str) -> List[Path]:
    """
    Returns a list of changed code files between before..after.
    Adjust extensions according to your stack.
    """
    if not before or before == "0000000000000000000000000000000000000000":
        # First push to this branch
        diff_range = after
    else:
        diff_range = f"{before}..{after}"

    output = run(["git", "diff", "--name-only", diff_range])

    exts = (".py", ".js", ".ts", ".tsx", ".java", ".cs")
    files = [
        REPO_ROOT / f
        for f in output.splitlines()
        if f.endswith(exts)
    ]
    return files


# ========= PLACE TO PLUG IN YOUR LLM =========
def call_llm(prompt: str) -> str:
    """
    Call your approved LLM endpoint here (GitHub Models, Azure OpenAI, or internal).

    Right now this is a placeholder to keep the script safe and vendor-neutral.
    For hackathon, you can:
      - Replace this with a real HTTP call to an allowed model, OR
      - Temporarily return a dummy string for demo.

    Example pattern (pseudo-code, fill your actual endpoint & headers):

        url = os.getenv("LLM_ENDPOINT")
        headers = {"Authorization": f"Bearer {os.getenv('LLM_TOKEN')}",
                   "Content-Type": "application/json"}
        payload = {
            "model": "your-model-name",
            "messages": [{"role": "user", "content": prompt}],
        }
        resp = requests.post(url, headers=headers, json=payload)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]

    For now, we just return the prompt wrapped so the pipeline works end-to-end.
    """
    return f"# Auto-generated docs (placeholder)\n\nPrompt was:\n\n{prompt[:1000]}"


# =============================================


def generate_doc_for_file(source_path: Path) -> str:
    """
    Build a prompt from the given file and send it to the LLM.
    """
    rel_path = source_path.relative_to(REPO_ROOT)
    code = source_path.read_text(encoding="utf-8", errors="ignore")

    prompt = (
        "Generate clear Markdown documentation for this file. \n\n"
        f"File: {rel_path}\n\n"
        "Code:\n```text\n"
        f"{code}\n"
        "```\n\n"
        "Requirements:\n"
        "- Start with a title\n"
        "- Explain what the file does\n"
        "- List main classes and functiond\n"
        "- Provide examples or usage\n"

    )

    return call_llm(prompt)

