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

## The rest of the family

`streamlit-kanban` is one of seven Streamlit components I maintain. If this one fits your app, these probably will too:

| Component | What it does |
|---|---|
| [`streamlit-gantt`](https://pypi.org/project/streamlit-gantt/) | Interactive Gantt chart with drag-and-drop task scheduling |
| [`streamlit-stepper`](https://pypi.org/project/streamlit-stepper/) | Multi-step wizard with validation and progress tracking |
| [`streamlit-node-editor`](https://pypi.org/project/streamlit-node-editor/) | ComfyUI/Blueprints-style node graph -- typed ports, drag-to-connect |
| [`streamlit-audio-editor`](https://pypi.org/project/streamlit-audio-editor/) | Browser audio editor and jam recorder -- effects rack, mic input |
| [`streamlit-nle`](https://pypi.org/project/streamlit-nle/) | Non-linear video editor with a multi-track timeline |
| [`st-agent-chat`](https://pypi.org/project/st-agent-chat/) | Drop-in agentic AI chat -- tools, extended thinking, subagents |

**Try them all live:** [demo-components.streamlit.app](https://demo-components.streamlit.app)

## Custom components and consulting

I build custom Streamlit components and AI/audio tooling for clients. If you need something in this shape that does not exist yet -- or need one of these extended for your product -- get in touch:

- **Email:** daniel.j.sheils@gmail.com
- **Portfolio:** [rhythrosalabs.github.io](https://rhythrosalabs.github.io)

## 🤝 Contributing

PRs welcome. Open an issue first for major changes.

## 📄 License

MIT

## 💛 Support

If streamlit-kanban keeps your project on track, consider supporting development:

👉 [Donate via PayPal](https://paypal.me/noodlebake) — @noodlebake

---
<div align="center">

Built by **Daniel Sheils** -- [Rhythrosa Labs](https://rhythrosalabs.github.io) | [GitHub](https://github.com/RhythrosaLabs) | Missoula, MT

*Streamlit Certified Creator*

</div>
