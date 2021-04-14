import { useEffect, useState } from "react";
import { Button } from '../components/Button';
import { api } from '../services/api';
import IGenreResponseProps from '../interfaces/IGenreResponse'

interface Props {
  onSelectGender: (value: number) => void
}

export function SideBar({ onSelectGender }: Props) {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres')
      .then(response => {
        setGenres(response.data);
        handleClickButton(response.data[0].id)
    });
  }, []);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    onSelectGender(id);
  }


  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>)
}