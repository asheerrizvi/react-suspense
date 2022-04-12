// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

let pokemon
function handleSuccess(resolvedValue) {
  pokemon = resolvedValue
}

let error
function handleFailure(err) {
  error = err
}

const pokemonPromise = fetchPokemon('pikachu').then(
  handleSuccess,
  handleFailure,
)

function PokemonInfo() {
  if (error) {
    throw error
  }

  if (!pokemon) {
    throw pokemonPromise
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<div>Loading...</div>}>
          <PokemonErrorBoundary>
            <PokemonInfo />
          </PokemonErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
