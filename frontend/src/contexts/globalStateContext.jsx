import { useReducer, createContext } from "react";

const globalInitialState = {
    auth: false,
    pizzas: [],
    ingredientes: []
}

export const GlobalStateContext = createContext(null)

export default function StateContextProvider ({children}) {

    const [state, dispatch] = useReducer(reducer, globalInitialState)

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    )
}

function reducer(state, action) {
    // console.log(action)
    switch (action.type) {
        case "AUTH": {
            return {
                ...state, auth: action.payload
            }
        }
        case "FETCH_ALL_PIZZAS": {
            return {
                ...state, pizzas: action?.payload
            }
        }
        case "FETCH_ALL_INGREDIENTES": {
            return {
                ...state, ingredientes: action?.payload
            }
        }
        case "ADD_PIZZA": {
            return {
                ...state, pizzas: [...state.pizzas, action.payload]
            }
        }
        case "ADD_INGREDIENTE": {
            console.log(action.payload);
            return {
                ...state, ingredientes: [...state.ingredientes, action.payload]
            }
        }
        case "UPDATE_PIZZA": {
            const newState = state.pizzas.map(item => ( item.id === action.payload.id ? action.payload : item))
            return {
                ...state, pizzas: [...newState]
            }
        }
        case "UPDATE_INGREDIENTE": {
            const newState = state.ingredientes.map(item => ( item.id === action.payload.id ? action.payload : item))
            console.log(newState);
            return {
                ...state, ingredientes: [...newState]
            }
        }
        case "DELETE_PIZZA": {
            const newState = state.pizzas.filter(item => ( item.id !== action.payload))
            return {
                ...state, pizzas: [...newState]
            }
        }
        case "DELETE_INGREDIENTE": {
            const newState = state.ingredientes.filter(item => ( item.id !== action.payload))
            return {
                ...state, ingredientes: [...newState]
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }   
}



