import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Character, Id } from '../types';

interface Props {
  character: Character;
  deleteCharacter: (id: Id) => void;
}

const CharacterCard = ({ character, deleteCharacter }: Props) => {
  return (
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
  )
}

export default CharacterCard
