<div align="center">

# 📋 streamlit-kanban

**A drag-and-drop Kanban board component for Streamlit — manage tasks with columns, cards, tags, and priorities**

<a href="https://pypi.org/project/streamlit-kanban/"><img src="https://img.shields.io/pypi/v/streamlit-kanban.svg?style=flat-square&color=818cf8" alt="PyPI version" /></a>
<a href="https://pypi.org/project/streamlit-kanban/"><img src="https://img.shields.io/pypi/pyversions/streamlit-kanban.svg?style=flat-square" alt="Python versions" /></a>
<a href="https://pypi.org/project/streamlit-kanban/"><img src="https://img.shields.io/pypi/dm/streamlit-kanban.svg?style=flat-square&color=34d399" alt="Downloads" /></a>
<img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License" />

</div>

---

`streamlit-kanban` is a fully interactive Kanban board that runs inside any Streamlit application. Drag cards between columns, edit inline, tag and prioritize work, and get the full board state back as structured JSON — zero runtime dependencies beyond Streamlit.

## ✨ Features

- **Native HTML5 drag-and-drop** — move cards between columns and reorder within them
- **Inline card editor** — click any card to edit title, tag, and priority
- **Color-coded tags** — "Dev", "Design", "Bug", "Docs" auto-colored with distinct hues
- **Priority badges** — `high` (red), `medium` (amber), `low` (cyan)
- **Global progress bar** — Done cards vs. total, displayed in the header
- **Full state round-trip** — every interaction returns the updated board to Python as JSON
- **Column accents** — configurable hex color per column

## 🚀 Quick Start

```bash
pip install streamlit-kanban
```

```python
import streamlit as st
from streamlit_kanban import kanban

result = kanban(board={
    "columns": [
        {"id": "todo",  "title": "To Do",       "color": "#818cf8", "cards": []},
        {"id": "doing", "title": "In Progress",  "color": "#f59e0b", "cards": []},
        {"id": "done",  "title": "Done",         "color": "#34d399", "cards": []},
    ]
})
st.write(result)
```

## 🛠️ Tech Stack

- **React + TypeScript** — frontend component
- **Python / Streamlit** — backend integration
- **HTML5 Drag-and-Drop** — native browser API, no library
- **PyPI** — distributed as `streamlit-kanban`

## 🤝 Contributing

PRs welcome. Open an issue first for major changes.

## 📄 License

MIT

## 💛 Support

If streamlit-kanban keeps your project on track, consider supporting development:

👉 [Donate via PayPal](https://paypal.me/noodlebake) — @noodlebake

---
<div align="center">Made with ❤️ by <a href="https://github.com/RhythrosaLabs">RhythrosaLabs</a></div>
