import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                    id="task"
                    type="text" 
                    placeholder='Dê um nome para o seu projeto' 
                    autoComplete='off' 
                    list='task-suggestions'
                    {...register('task')}
                    disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
                <option value="project 1" />
                <option value="project 2" />
                <option value="project 3" />
                <option value="project 4" />
                <option value="project 5" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number" 
                id="minutesAmount" 
                placeholder='00' 
                autoComplete='off' 
                step={5} 
                min={1}  
                max={60} 
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>minutos</span>
        </FormContainer>
    )
}