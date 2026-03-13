// draggableNode.js
export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '4px',
        borderRadius: '10px',
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)',
        transition: 'all 0.2s ease',
        userSelect: 'none',
      }}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(99,102,241,0.2)';
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span style={{ color: '#cbd5e1', fontSize: '10px', fontWeight: '600' }}>
        {label}
      </span>
    </div>
  );
};