import { useEffect, useState } from 'react';
import './App.css';
import throneCharacters from './api/api.mock.json'
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Button, Paper, AppBar, Toolbar, ThemeProvider, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Id, Character } from './types';
import CharacterCard from './assets/CharacterCard';

function App() {
  const [characters, setCharacters] = useState<Character[]>(throneCharacters);
  const [charactersDivided, setCharactersDivided] = useState<Character[][]>([]);
  const [numberOfAddedCharacters, setNumberOfAddedCharacters] = useState(0)

  const numberOfColumns = 3;

  useEffect(() => {
    const fewerData = characters.slice(0, characters.length / 2 + numberOfAddedCharacters);
    const GridData = [];
    for (let i = 0; i < fewerData.length; i += numberOfColumns) {
      GridData.push(fewerData.slice(i, i + numberOfColumns));
    }

    setCharactersDivided(GridData);
  }, [numberOfAddedCharacters]);

  const deleteCharacter = (id: Id) => {
    setNumberOfAddedCharacters((prev) => prev - 1)
    const newCharacters = characters.filter(item => item.id !== id);
    setCharacters(newCharacters);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7e57c2',
      },
      secondary: {
        main: '#d81b60',
      },
    },
  })


  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GoT MarketPlace
          </Typography>
        </Toolbar>
      </AppBar>
      <Box paddingTop={3} paddingBottom={3} display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setNumberOfAddedCharacters((prev) => prev + 1)}
        >
          Add Character
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Box maxWidth={1800}>
          {charactersDivided.map((row, index) => (
            <div className='grid-row' key={index} id={'index'}>
              {row.map(character => (
                <CharacterCard key={character.id} character={character} deleteCharacter={deleteCharacter} />
              ))}
            </div>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
