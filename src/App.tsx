import throneCharacters from './api/api.mock.json'
import { Id, Character } from './types';
import './App.css';
import Header from './assets/Header';
import ButtonsContainer from './assets/ButtonsContainer';
import CharacterCard from './assets/CharacterCard';
import { useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

function App() {
  const [characters, setCharacters] = useState<Character[]>(throneCharacters);
  const [charactersDivided, setCharactersDivided] = useState<Character[][]>([]);
  const [numberOfAddedCharacters, setNumberOfAddedCharacters] = useState(0);
  const [activeCard, setActiveCard] = useState<Character | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const numberOfColumns = 3;

  useEffect(() => {
    const fewerData = characters.slice(0, characters.length / 2 + numberOfAddedCharacters);
    const GridData = [];
    for (let i = 0; i < fewerData.length; i += numberOfColumns) {
      GridData.push(fewerData.slice(i, i + numberOfColumns));
    }

    setCharactersDivided(GridData);
  }, [numberOfAddedCharacters, characters]);

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

  const charactersIds = useMemo(() => {
    return characters.map(character => character.id)
  }, [characters]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Character') {
      setActiveCard(event.active.data.current.character);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setCharacters(characters => {
      const activeCharacterIndex = characters.findIndex((char) => char.id === activeId);
      const overCharacterIndex = characters.findIndex((char) => char.id === overId);

      return arrayMove(characters, activeCharacterIndex, overCharacterIndex)
    })
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      }
    })
  )

  const zoomIn = () => {
    if (zoom > 0.5) {
      setZoom((prev) => prev - 0.1)
    }
  }

  const zoomOut = () => {
    if (zoom < 1.5) {
      setZoom((prev) => prev + 0.1)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Header title="GoT Marketplace" />
        <ButtonsContainer setNumberOfAddedCharacters={setNumberOfAddedCharacters} zoomIn={zoomIn} zoomOut={zoomOut} />
        <Box display={'flex'} justifyContent={'center'} style={{ zoom: zoom }}>
          <Box maxWidth={1800}>
            {charactersDivided.map((row, index) => (
              <div className='grid-row' key={index} id={'index'}>
                <SortableContext items={charactersIds}>
                  {row.map(character => (
                    <CharacterCard key={character.id} character={character} deleteCharacter={deleteCharacter} />
                  ))}
                </SortableContext>
              </div>
            ))}
          </Box>
        </Box>
        <DragOverlay>
          {activeCard && <CharacterCard key={activeCard.id} character={activeCard} deleteCharacter={deleteCharacter} />}
        </DragOverlay>
      </DndContext>
    </ThemeProvider>
  )
}

export default App
