import { FilmList } from "../components/Lists/FilmList";
import { PeopleList } from "../components/Lists/PeopleList";
import { PlanetsList } from "../components/Lists/PlanetsList";
import { SpeciesList } from "../components/Lists/SpeciesList";
import { StarshipsList } from "../components/Lists/StarshipsList";
import { VehiclesList } from "../components/Lists/VehiclesList";


export const ListPage = () => {
    return (
        <>
          <FilmList />
          <PeopleList />
          <PlanetsList />
          <VehiclesList />
          <StarshipsList />
          <SpeciesList />
        </>
    )
}