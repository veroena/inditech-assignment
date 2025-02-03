import { Box, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
  setNumberOfAddedCharacters: React.Dispatch<React.SetStateAction<number>>;
  zoomIn: () => void;
  zoomOut: () => void;
}

const ButtonsContainer = ({ setNumberOfAddedCharacters, zoomIn, zoomOut }: Props) => {
  return (
    <Box padding={4} display={'flex'} justifyContent={'space-between'}>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setNumberOfAddedCharacters((prev) => prev + 1)}
      >
        Add Character
      </Button>
      <Box>
        <IconButton onClick={zoomOut}><AddCircleOutlineIcon fontSize='large' /></IconButton>
        <IconButton onClick={zoomIn}><RemoveCircleOutlineIcon fontSize='large' /></IconButton>
      </Box>
    </Box>
  )
}

export default ButtonsContainer
