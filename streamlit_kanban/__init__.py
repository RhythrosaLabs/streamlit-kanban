import os
import streamlit.components.v1 as components

_RELEASE = True

if _RELEASE:
    _component_func = components.declare_component(
        "streamlit_kanban",
        path=os.path.join(os.path.dirname(__file__), "frontend/build"),
    )
else:
    _component_func = components.declare_component(
        "streamlit_kanban",
        url="http://localhost:3001",
    )


def st_kanban(columns, key=None):
    """
    Render an interactive Kanban board.

    Parameters
    ----------
    columns : list[dict]
        List of column definitions. Each dict has:
          - id (str): unique column identifier
          - title (str): display name
          - color (str): hex accent color
          - cards (list[dict]): each card has id, title, tag, priority
    key : str, optional
        Streamlit widget key for state isolation.

    Returns
    -------
    list[dict] | None
        Updated columns structure after user interaction, or None on first render.

    Example
    -------
    >>> columns = [
    ...     {"id": "todo", "title": "To Do", "color": "#6366f1",
    ...      "cards": [{"id": "c1", "title": "Fix bug", "tag": "Dev", "priority": "high"}]},
    ...     {"id": "done", "title": "Done",  "color": "#10b981", "cards": []},
    ... ]
    >>> result = st_kanban(columns, key="board")
    >>> if result:
    ...     st.write(result)  # updated board state
    """
    return _component_func(columns=columns, key=key, default=None)
