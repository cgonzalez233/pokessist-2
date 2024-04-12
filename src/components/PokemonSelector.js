import React, { useState, useEffect } from "react";

const PokemonSelector = () => {
  const [generation, setGeneration] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegionPokemon, setSelectedRegionPokemon] = useState({});
  const [displayedSprites, setDisplayedSprites] = useState({});

  //   useEffect(() => {
  //     if (generation) {
  //       fetch(`https://pokeapi.co/api/v2/generation/${generation}/`)
  //         .then((response) => response.json())
  //         .then(async (data) => {
  //           const species = data.pokemon_species;
  //           const pokemonDetailsList = await Promise.all(
  //             species.map(async (pokemon) => {
  //               let details;
  //               try {
  //                 const directResponse = await fetch(
  //                   `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //                 );
  //                 details = directResponse.ok
  //                   ? await directResponse.json()
  //                   : null;

  //                 if (!details) {
  //                   const speciesResponse = await fetch(pokemon.url);
  //                   const speciesDetails = await speciesResponse.json();
  //                   const defaultVariety = speciesDetails.varieties?.find(
  //                     (v) => v.is_default
  //                   )?.pokemon;
  //                   if (defaultVariety) {
  //                     const varietyResponse = await fetch(defaultVariety.url);
  //                     details = await varietyResponse.json();
  //                   }
  //                 }
  //               } catch (error) {
  //                 console.error(
  //                   `Error fetching data for ${pokemon.name}:`,
  //                   error
  //                 );
  //               }

  //               if (!details) return null;

  //               const generationKey = `generation-${romanize(generation)}`;
  //               const mainGames = mainGamesByGeneration[generation];
  //               const gameSprites = Object.entries(
  //                 details.sprites.versions[generationKey] || {}
  //               )
  //                 .filter(([game, _]) => mainGames.includes(game))
  //                 .map(([game, sprites]) => ({
  //                   game: game.replace(/-/g, " ").toUpperCase(),
  //                   front_default: sprites.front_default,
  //                   front_shiny: sprites.front_shiny,
  //                 }));

  //               return {
  //                 name: capitalizeFirstLetter(pokemon.name),
  //                 id: details.id,
  //                 gameSprites,
  //               };
  //             })
  //           );

  //           setPokemonList(
  //             pokemonDetailsList
  //               .filter((item) => item)
  //               .sort((a, b) => a.id - b.id)
  //           );
  //         });
  //     }
  //   }, [generation]);

  useEffect(() => {
    if (generation) {
      // Simulated fetch function to get regions by generation
      fetchRegionsByGeneration(generation).then((regionData) => {
        setRegions(regionData);

        // Initialize selected region pokemon state
        const initialRegionPokemon = {};
        regionData.forEach((region) => {
          initialRegionPokemon[region.name] = null;
          // Simulated fetch function to get Pokémon list by region
          fetchPokemonByRegion(region.name).then((pokemonList) => {
            setPokemonList((prev) => ({
              ...prev,
              [region.name]: pokemonList.sort((a, b) => a.id - b.id), // Sorting by Pokémon ID
            }));
          });
        });
        setSelectedRegionPokemon(initialRegionPokemon);
      });
    }
  }, [generation]);

  function romanize(num) {
    const lookup = { VII: 7, VI: 6, V: 5, IV: 4, III: 3, II: 2, I: 1 };
    let roman = "";
    for (let i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman.toLowerCase();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRegionsByGeneration = async (generation) => {
    try {
      const response = await fetch(
        `https://your-api-url.com/regions/${generation}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch regions");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching regions:", error);
      return [];
    }
  };

  const fetchPokemonByRegion = async (regionName) => {
    try {
      const response = await fetch(
        `https://your-api-url.com/pokemon/${regionName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pokemon");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching pokemon by region:", error);
      return [];
    }
  };

  const fetchPokemonSprites = async (pokemonId, generation) => {
    try {
      const response = await fetch(
        `https://your-api-url.com/pokemon/sprites/${pokemonId}/${generation}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sprites");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching pokemon sprites:", error);
      return null;
    }
  };

  const mainGamesByGeneration = {
    1: ["red-blue", "yellow"],
    2: ["gold", "silver", "crystal"],
    3: ["ruby-sapphire", "emerald", "firered-leafgreen"],
    4: ["diamond-pearl", "platinum", "heartgold-soulsilver"],
    5: ["black-white"],
    6: ["x-y", "omegaruby-alphasapphire"],
    7: ["ultra-sun-ultra-moon"],
    // Add more generations and their main games as needed
  };

  const handleGenerationSelect = (gen) => {
    setGeneration(gen);
    setSelectedPokemon(null);
    setPokemonList([]);
  };

  const handlePokemonSelect = (regionName, pokemon) => {
    const updatedSelection = {
      ...selectedRegionPokemon,
      [regionName]: pokemon,
    };
    setSelectedRegionPokemon(updatedSelection);

    // Fetch and display generation-specific sprites
    fetchPokemonSprites(pokemon.id, generation).then((sprites) => {
      // Assuming sprites are returned in the desired format
      setDisplayedSprites(sprites);
    });
  };

  return (
    <div>
      <div className="btn-group mt-3">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((gen) => (
          <button
            key={gen}
            type="button"
            onClick={() => handleGenerationSelect(gen)}
            className={`btn ${
              generation === gen ? "btn-primary" : "btn-secondary"
            }`}
          >
            Generation {gen}
          </button>
        ))}
      </div>
      <br />
      {regions.map((region) => (
        <div key={region.name} className="mt-3">
          <label>{region.name}</label>
          <div className="dropdown w-50">
            <button
              className="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id={`${region.name}Dropdown`}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedRegionPokemon[region.name]?.name || "Select a Pokémon"}
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby={`${region.name}Dropdown`}
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {pokemonList[region.name]?.map((pokemon) => (
                <li key={pokemon.id}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handlePokemonSelect(region.name, pokemon)}
                  >
                    #{pokemon.id} - {pokemon.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {selectedRegionPokemon &&
        Object.values(selectedRegionPokemon).some((pokemon) => pokemon) && (
          <div>
            <h2>Selected Pokémon Details</h2>
            {Object.entries(selectedRegionPokemon)
              .filter(([_, pokemon]) => pokemon)
              .map(([region, pokemon]) => (
                <div key={region}>
                  <h3>
                    {region}: {pokemon.name}
                  </h3>
                  <img
                    src={pokemon.sprites.front_default}
                    alt={`Front default of ${pokemon.name}`}
                  />
                  {pokemon.sprites.front_shiny && (
                    <img
                      src={pokemon.sprites.front_shiny}
                      alt={`Front shiny of ${pokemon.name}`}
                    />
                  )}
                </div>
              ))}
          </div>
        )}
    </div>
  );

  //   return (
  //     <div>
  //       <div className="btn-group mt-3">
  //         {Array.from({ length: 7 }, (_, i) => i + 1).map((gen) => (
  //           <button
  //             key={gen}
  //             type="button"
  //             onClick={() => handleGenerationSelect(gen)}
  //             className={`btn ${
  //               generation === gen ? "btn-primary" : "btn-secondary"
  //             }`}
  //           >
  //             Generation {gen}
  //           </button>
  //         ))}
  //       </div>
  //       <br />
  //       {generation && (
  //         <div className="mt-3">
  //           <div className="form-group">
  //             <label>Select Pokémon</label>
  //             <div className="dropdown w-50">
  //               <button
  //                 className="btn btn-secondary dropdown-toggle w-100"
  //                 type="button"
  //                 id="pokemonDropdown"
  //                 data-toggle="dropdown"
  //                 aria-haspopup="true"
  //                 aria-expanded="false"
  //               >
  //                 {selectedPokemon
  //                   ? `${selectedPokemon.id} - ${selectedPokemon.name}`
  //                   : "Select a Pokémon"}
  //               </button>
  //               <ul
  //                 className="dropdown-menu"
  //                 aria-labelledby="pokemonDropdown"
  //                 style={{ maxHeight: "300px", overflowY: "auto" }}
  //               >
  //                 {pokemonList.map((pokemon) => (
  //                   <li key={pokemon.id}>
  //                     <button
  //                       type="button"
  //                       className="dropdown-item"
  //                       onClick={() => handlePokemonSelect(pokemon)}
  //                     >
  //                       #{pokemon.id} - {pokemon.name}
  //                     </button>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       {selectedPokemon && (
  //         <div>
  //           <h2>
  //             <b>#{selectedPokemon.id}</b> {selectedPokemon.name}
  //           </h2>
  //           {selectedPokemon.gameSprites?.map((sprite, index) => (
  //             <div key={index}>
  //               <p>{sprite.game}</p>
  //               <img
  //                 src={sprite.front_default}
  //                 alt={`${selectedPokemon.name} default in ${sprite.game}`}
  //               />
  //               {sprite.front_shiny && (
  //                 <img
  //                   src={sprite.front_shiny}
  //                   alt={`${selectedPokemon.name} shiny in ${sprite.game}`}
  //                 />
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default PokemonSelector;
