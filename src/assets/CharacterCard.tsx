import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Character, Id } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'

interface Props {
  character: Character;
  deleteCharacter: (id: Id) => void;
}

const CharacterCard = ({ character, deleteCharacter }: Props) => {

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: character.id,
    data: {
      type: 'Character',
      character
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (<div className="dragging-card" ref={setNodeRef} style={style} />)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card key={character.id} sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={character.imageUrl}
          title={character.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {character.title}
          </Typography>
          <IconButton aria-label="delete" onClick={() => deleteCharacter(character.id)}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  )
}

export default CharacterCard
