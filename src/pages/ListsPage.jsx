import { FilmList } from "../components/Lists/FilmList";
import { PeopleList } from "../components/Lists/PeopleList";
import { PlanetsList } from "../components/Lists/PlanetsList";


export const ListPage = () => {
    return (
        <>
          <FilmList />
          <PeopleList />
          <PlanetsList />
        </>
    )
}