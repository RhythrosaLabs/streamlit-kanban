import { useState, useRef, useCallback } from "react";

const INITIAL_COLUMNS = [
  {
    id: "backlog",
    title: "Backlog",
    color: "#6366f1",
    cards: [
      { id: "c1", title: "Research competitors", tag: "Research", priority: "low" },
      { id: "c2", title: "Define MVP scope", tag: "Strategy", priority: "high" },
      { id: "c3", title: "Set up design system", tag: "Design", priority: "medium" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    cards: [
      { id: "c4", title: "Build auth flow", tag: "Dev", priority: "high" },
      { id: "c5", title: "Write API docs", tag: "Docs", priority: "medium" },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "#8b5cf6",
    cards: [
      { id: "c6", title: "Landing page redesign", tag: "Design", priority: "high" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#10b981",
    cards: [
      { id: "c7", title: "Project kickoff", tag: "Planning", priority: "low" },
      { id: "c8", title: "Stakeholder interviews", tag: "Research", priority: "medium" },
    ],
  },
];

const PRIORITY_CONFIG = {
  high: { label: "High", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  medium: { label: "Med", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  low: { label: "Low", color: "#6b7280", bg: "rgba(107,114,128,0.12)" },
};

const TAG_COLORS = {
  Research: { color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  Strategy: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  Design: { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  Dev: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  Docs: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  Planning: { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  Bug: { color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  Feature: { color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
};

function getTagStyle(tag) {
  return TAG_COLORS[tag] || { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" };
}

let nextId = 100;
function uid() { return `c${nextId++}`; }

function CardModal({ card, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(card?.title || "");
  const [tag, setTag] = useState(card?.tag || "Dev");
  const [priority, setPriority] = useState(card?.priority || "medium");
  const isNew = !card?.id;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16, padding: 28, width: 420, boxShadow: "0 24px 80px rgba(0,0,0,0.6)"
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.15em", marginBottom: 16 }}>
          {isNew ? "NEW CARD" : "EDIT CARD"}
        </div>
        <textarea
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={{
            width: "100%", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            padding: "12px 14px", resize: "none", outline: "none",
            boxSizing: "border-box", lineHeight: 1.5, minHeight: 80
          }}
          onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#64748b", letterSpacing: "0.1em", marginBottom: 6 }}>TAG</div>
            <select value={tag} onChange={e => setTag(e.target.value)} style={{
              width: "100%", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              padding: "8px 10px", outline: "none", cursor: "pointer"
            }}>
              {Object.keys(TAG_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#64748b", letterSpacing: "0.1em", marginBottom: 6 }}>PRIORITY</div>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{
              width: "100%", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              padding: "8px 10px", outline: "none", cursor: "pointer"
            }}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={() => title.trim() && onSave({ title: title.trim(), tag, priority })}
            disabled={!title.trim()}
            style={{
              flex: 1, background: "#6366f1", color: "white",
              border: "none", borderRadius: 8, padding: "10px 0",
              fontFamily: "'Space Mono', monospace", fontSize: 12,
              letterSpacing: "0.08em", cursor: "pointer",
              opacity: title.trim() ? 1 : 0.4,
            }}>
            {isNew ? "CREATE" : "SAVE"}
          </button>
          {!isNew && (
            <button onClick={onDelete} style={{
              background: "rgba(239,68,68,0.15)", color: "#f87171",
              border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8,
              padding: "10px 16px", fontFamily: "'Space Mono', monospace",
              fontSize: 12, cursor: "pointer"
            }}>DELETE</button>
          )}
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.05)", color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
            padding: "10px 16px", fontFamily: "'Space Mono', monospace",
            fontSize: 12, cursor: "pointer"
          }}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

function KanbanCard({ card, columnId, onEdit, onDragStart, onDragEnd, isDragging }) {
  const p = PRIORITY_CONFIG[card.priority] || PRIORITY_CONFIG.medium;
  const t = getTagStyle(card.tag);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(card.id, columnId)}
      onDragEnd={onDragEnd}
      onClick={() => onEdit(card, columnId)}
      style={{
        background: isDragging ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
        border: isDragging ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10, padding: "12px 14px", cursor: "grab",
        transition: "all 0.15s ease",
        opacity: isDragging ? 0.6 : 1,
        transform: isDragging ? "rotate(1.5deg) scale(0.97)" : "none",
        boxShadow: isDragging ? "0 12px 32px rgba(0,0,0,0.4)" : "0 1px 4px rgba(0,0,0,0.2)",
        userSelect: "none",
      }}
      onMouseEnter={e => {
        if (!isDragging) {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={e => {
        if (!isDragging) {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.2)";
        }
      }}
    >
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#e2e8f0", lineHeight: 1.45, marginBottom: 10 }}>
        {card.title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontSize: 11, padding: "2px 8px", borderRadius: 20,
          background: t.bg, color: t.color,
          fontFamily: "'Space Mono', monospace", letterSpacing: "0.04em"
        }}>{card.tag}</span>
        <span style={{
          fontSize: 10, padding: "2px 7px", borderRadius: 20,
          background: p.bg, color: p.color,
          fontFamily: "'Space Mono', monospace", letterSpacing: "0.04em", marginLeft: "auto"
        }}>{p.label}</span>
      </div>
    </div>
  );
}

function Column({ col, onAddCard, onEditCard, onDragStart, onDragEnd, onDragOver, onDrop, draggingOver, draggingId }) {
  return (
    <div
      onDragOver={e => { e.preventDefault(); onDragOver(col.id); }}
      onDrop={() => onDrop(col.id)}
      style={{
        width: 270, flexShrink: 0, display: "flex", flexDirection: "column",
        background: draggingOver === col.id ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)",
        border: draggingOver === col.id ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14, overflow: "hidden",
        transition: "all 0.15s ease",
        boxShadow: draggingOver === col.id ? "0 0 0 2px rgba(99,102,241,0.2)" : "none"
      }}
    >
      {/* Column header */}
      <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: "#cbd5e1", letterSpacing: "0.1em", flex: 1
          }}>{col.title.toUpperCase()}</span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            color: "#475569", background: "rgba(255,255,255,0.05)",
            padding: "2px 7px", borderRadius: 10
          }}>{col.cards.length}</span>
        </div>
      </div>

      {/* Cards */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "10px 10px",
        display: "flex", flexDirection: "column", gap: 8, minHeight: 120
      }}>
        {col.cards.map(card => (
          <KanbanCard
            key={card.id}
            card={card}
            columnId={col.id}
            onEdit={onEditCard}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggingId === card.id}
          />
        ))}
        {col.cards.length === 0 && (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#334155", fontFamily: "'Space Mono', monospace", fontSize: 11,
            letterSpacing: "0.05em", padding: "20px 0"
          }}>
            drop here
          </div>
        )}
      </div>

      {/* Add card */}
      <div style={{ padding: "8px 10px 10px" }}>
        <button onClick={() => onAddCard(col.id)} style={{
          width: "100%", background: "transparent", border: "1px dashed rgba(255,255,255,0.1)",
          borderRadius: 8, color: "#475569", padding: "8px 0",
          fontFamily: "'Space Mono', monospace", fontSize: 11,
          letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s"
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.color = "#818cf8"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#475569"; }}
        >
          + ADD CARD
        </button>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [modal, setModal] = useState(null); // { card, columnId } or { card: null, columnId }
  const dragging = useRef(null); // { cardId, fromColumnId }
  const [draggingId, setDraggingId] = useState(null);
  const [draggingOver, setDraggingOver] = useState(null);

  // State export display
  const [showState, setShowState] = useState(false);

  const handleDragStart = useCallback((cardId, columnId) => {
    dragging.current = { cardId, columnId };
    setDraggingId(cardId);
  }, []);

  const handleDragEnd = useCallback(() => {
    dragging.current = null;
    setDraggingId(null);
    setDraggingOver(null);
  }, []);

  const handleDragOver = useCallback((columnId) => {
    setDraggingOver(columnId);
  }, []);

  const handleDrop = useCallback((toColumnId) => {
    if (!dragging.current) return;
    const { cardId, fromColumnId } = dragging.current;
    if (fromColumnId === toColumnId) { handleDragEnd(); return; }

    setColumns(cols => {
      const next = cols.map(c => ({ ...c, cards: [...c.cards] }));
      const fromCol = next.find(c => c.id === fromColumnId);
      const toCol = next.find(c => c.id === toColumnId);
      if (!fromCol || !toCol) return cols;
      const cardIdx = fromCol.cards.findIndex(c => c.id === cardId);
      if (cardIdx === -1) return cols;
      const [card] = fromCol.cards.splice(cardIdx, 1);
      toCol.cards.push(card);
      return next;
    });

    handleDragEnd();
  }, [handleDragEnd]);

  const handleAddCard = useCallback((columnId) => {
    setModal({ card: null, columnId });
  }, []);

  const handleEditCard = useCallback((card, columnId) => {
    setModal({ card, columnId });
  }, []);

  const handleSave = useCallback(({ title, tag, priority }) => {
    if (!modal) return;
    const { card, columnId } = modal;
    setColumns(cols => cols.map(col => {
      if (col.id !== columnId) return col;
      if (card?.id) {
        return { ...col, cards: col.cards.map(c => c.id === card.id ? { ...c, title, tag, priority } : c) };
      } else {
        return { ...col, cards: [...col.cards, { id: uid(), title, tag, priority }] };
      }
    }));
    setModal(null);
  }, [modal]);

  const handleDelete = useCallback(() => {
    if (!modal?.card) return;
    setColumns(cols => cols.map(col =>
      col.id === modal.columnId ? { ...col, cards: col.cards.filter(c => c.id !== modal.card.id) } : col
    ));
    setModal(null);
  }, [modal]);

  const totalCards = columns.reduce((s, c) => s + c.cards.length, 0);
  const doneCards = columns.find(c => c.id === "done")?.cards.length || 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        select option { background: #1a1a2e; color: #f1f5f9; }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#0f0f1a",
        backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        padding: "28px 32px", fontFamily: "'DM Sans', sans-serif"
      }}>
        {/* Header */}
        <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "#6366f1", letterSpacing: "0.2em", marginBottom: 6
            }}>KANBAN BOARD</div>
            <h1 style={{
              fontFamily: "'Space Mono', monospace", fontSize: 22,
              color: "#f1f5f9", fontWeight: 700, letterSpacing: "-0.02em"
            }}>Project Flow</h1>
            <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
              {columns.map(col => (
                <div key={col.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.color }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#475569" }}>
                    {col.cards.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Progress */}
            <div style={{ textAlign: "right", marginRight: 8 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#475569", marginBottom: 4 }}>
                {doneCards}/{totalCards} DONE
              </div>
              <div style={{ width: 120, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                <div style={{
                  height: "100%", borderRadius: 2, background: "#10b981",
                  width: `${totalCards ? (doneCards / totalCards) * 100 : 0}%`,
                  transition: "width 0.3s ease"
                }} />
              </div>
            </div>
            <button onClick={() => setShowState(s => !s)} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, color: "#64748b", padding: "8px 14px",
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              letterSpacing: "0.08em", cursor: "pointer"
            }}>
              {showState ? "HIDE" : "EXPORT"} STATE
            </button>
          </div>
        </div>

        {/* Board */}
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12, alignItems: "flex-start" }}>
          {columns.map(col => (
            <Column
              key={col.id}
              col={col}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              draggingOver={draggingOver}
              draggingId={draggingId}
            />
          ))}
        </div>

        {/* State export */}
        {showState && (
          <div style={{
            marginTop: 24, background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#6366f1", letterSpacing: "0.15em", marginBottom: 10 }}>
              BOARD STATE (JSON)
            </div>
            <pre style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#94a3b8",
              overflowX: "auto", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-all"
            }}>
              {JSON.stringify(columns.map(c => ({ id: c.id, title: c.title, cards: c.cards })), null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <CardModal
          card={modal.card}
          onSave={handleSave}
          onClose={() => setModal(null)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
