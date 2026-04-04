# streamlit-kanban

A drag-and-drop Kanban board component for Streamlit. Move cards between columns, add and edit cards with tags and priority levels, and get the full board state back as JSON.

![Kanban screenshot](https://raw.githubusercontent.com/yourusername/streamlit-kanban/main/docs/screenshot.png)

## Features

- Drag-and-drop cards between columns (native HTML5, no external DnD lib)
- Click any card to edit title, tag, and priority
- Add cards to any column
- Color-coded tag and priority badges
- Progress bar tracking Done / Total
- Export board state as JSON
- Zero runtime dependencies beyond Streamlit

## Installation

```bash
pip install streamlit-kanban
```

## Quickstart

```python
import streamlit as st
from streamlit_kanban import st_kanban

columns = [
    {
        "id": "todo",
        "title": "To Do",
        "color": "#6366f1",
        "cards": [
            {"id": "c1", "title": "Write tests",    "tag": "Dev",    "priority": "high"},
            {"id": "c2", "title": "Update docs",    "tag": "Docs",   "priority": "low"},
        ],
    },
    {
        "id": "in-progress",
        "title": "In Progress",
        "color": "#f59e0b",
        "cards": [
            {"id": "c3", "title": "Build auth flow", "tag": "Dev", "priority": "high"},
        ],
    },
    {
        "id": "done",
        "title": "Done",
        "color": "#10b981",
        "cards": [],
    },
]

st.title("My Project Board")

if "board" not in st.session_state:
    st.session_state.board = columns

result = st_kanban(st.session_state.board, key="kanban")

if result:
    st.session_state.board = result
```

## API

```python
st_kanban(columns, key=None)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `columns` | `list[dict]` | Column definitions (see schema below) |
| `key` | `str` | Streamlit widget key |

**Returns:** Updated `columns` list on any interaction, `None` on first render.

### Column schema

```python
{
    "id":    str,          # unique identifier
    "title": str,          # display name
    "color": str,          # hex accent color for the column dot
    "cards": [
        {
            "id":       str,   # unique card id
            "title":    str,   # card text
            "tag":      str,   # e.g. "Dev", "Design", "Bug"
            "priority": str,   # "high" | "medium" | "low"
        }
    ]
}
```

## Development

```bash
git clone https://github.com/yourusername/streamlit-kanban
cd streamlit-kanban

# Frontend
cd streamlit_kanban/frontend
npm install
npm start          # dev server on :3001

# Python (separate terminal)
cd ../..
pip install -e .
# In streamlit_kanban/__init__.py, set _RELEASE = False
streamlit run example.py
```

## License

MIT
