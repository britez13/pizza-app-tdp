import { useReducer, createContext } from "react";

const globalInitialState = {
    auth: false,
    pizzas: [],
    ingredientes: []
}

export const GlobalStateContext = createContext(null)

export function StateContextProvider ({children}) {

    const [state, dispatch] = useReducer(reducer, globalInitialState)

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    )
}

function reducer(state, action) {
    switch (action.type) {
        case "AUTH": {
            return {
                ...state, auth: action.payload
            }
        }
        case "FETCH_ALL_PIZZAS": {
            return {
                ...state, pizzas: [action.payload]
            }
        }
        case "FETCH_ALL_INGREDIENTES": {
            return {
                ...state, pizzas: [action.payload]
            }
        }
        case "ADD_PIZZA": {
            return {
                ...state, pizzas: [...state.pizzas, action.payload]
            }
        }
        case "ADD_INGREDIENTES": {
            return {
                ...state, pizzas: [...state.ingredientes, action.payload]
            }
        }
    }   
}



