import { useContext } from 'react'

import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { HandPalm, Play } from 'phosphor-react'
import {
    HomeContainer,
    StartCountDownButton, 
    StopCountDownButton, 
} from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O ciclo precisa ser de no mínimo 1 minuto').max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})
 
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
    
    const { createNewCycle, activeCycle, InterruptCurrentCycle, } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }


    //variable helpers
    const task = watch('task')
    const isSubmitDisabled = !task

    
    return (
        <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            <FormProvider {...newCycleForm} >
                <NewCycleForm />
            </FormProvider>
            <CountDown />
            {activeCycle ? (
            <StopCountDownButton onClick={InterruptCurrentCycle} type="button">
                <HandPalm size={24} />    
                Interromper
            </StopCountDownButton>
            ) : (
            <StartCountDownButton type="submit" disabled={isSubmitDisabled} >
                <Play size={24} />    
                Iniciar tarefa
            </StartCountDownButton>
            )}
        </form>
    </HomeContainer>
    )
}