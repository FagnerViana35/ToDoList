import { useDrag } from 'react-dnd'

function Draggable(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'box', id: props.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {props.children}
    </div>
  )
}
export default Draggable;
