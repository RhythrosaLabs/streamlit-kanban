import streamlit as st
from streamlit_kanban import st_kanban

st.set_page_config(page_title="Kanban Demo", layout="wide")
st.title("📋 streamlit-kanban demo")

DEFAULT_COLUMNS = [
    {
        "id": "backlog",
        "title": "Backlog",
        "color": "#6366f1",
        "cards": [
            {"id": "c1", "title": "Research competitors", "tag": "Research", "priority": "low"},
            {"id": "c2", "title": "Define MVP scope",     "tag": "Strategy", "priority": "high"},
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
        "cards": [
            {"id": "c4", "title": "Project kickoff", "tag": "Planning", "priority": "low"},
        ],
    },
]

if "board" not in st.session_state:
    st.session_state.board = DEFAULT_COLUMNS

result = st_kanban(st.session_state.board, key="demo_board")

if result:
    st.session_state.board = result

with st.expander("Board JSON"):
    st.json(st.session_state.board)
