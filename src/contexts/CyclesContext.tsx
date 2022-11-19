import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { differenceInSeconds } from 'date-fns'
import { addNewCycleAction, interruptCurrentCycleAction, markCurretCycleAsFinishedAction } from "../reducers/cycles/actions";

import {  CycleProps, cyclesReducer } from '../reducers/cycles/reducer' 

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: CycleProps[]
    activeCycle: CycleProps | undefined
    activeCycleId: string | null
    maskCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
    children: ReactNode
}



export function CyclesContextProvider({ children }:CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, 
        {
            cycles: [],
            activeCycleId: null,
        }, () => {
            const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state')
            if(storedStateAsJSON){
                return JSON.parse(storedStateAsJSON)
            }
        }
    )

    const { cycles, activeCycleId } = cyclesState; 
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)


    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
    }, [cyclesState])
    


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function maskCurrentCycleAsFinished() {
        dispatch(markCurretCycleAsFinishedAction())
    } 

    function createNewCycle(data: CreateCycleData) {

        const id = String(new Date().getTime())

        const newCycle: CycleProps = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        dispatch(addNewCycleAction(newCycle))
//closers
        setAmountSecondsPassed(0)
    }

    function InterruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction())

    
    }


    return (

    <CyclesContext.Provider value={{ 
        activeCycle, 
        activeCycleId , 
        maskCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed, 
        createNewCycle,
        InterruptCurrentCycle,
        cycles
        }}>
            {children}
    </CyclesContext.Provider>

)}