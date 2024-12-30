import { FilmList } from "../components/Lists/FilmList";
import { PeopleList } from "../components/Lists/PeopleList";
import { PlanetsList } from "../components/Lists/PlanetsList";
import { VehiclesList } from "../components/Lists/VehiclesList";


export const ListPage = () => {
    return (
        <>
          <FilmList />
          <PeopleList />
          <PlanetsList />
          <VehiclesList />
        </>
    )
}