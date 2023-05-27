import { useDrop } from 'react-dnd'

function Dropzone(props) {
  const [{ isOver }, drop] = useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      // handle drop event
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? '#ccc' : '#fff' }}>
      {props.children}
    </div>
  )
}
export default Dropzone;
