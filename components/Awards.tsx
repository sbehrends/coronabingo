import classnames from 'classnames'
import React, { FormEvent, Fragment, useState } from 'react'
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi'
import Collapsible from '~/components/Collapsible'
import { Player, Room } from '~/interfaces'
import Button from './Button'
import Select from './Select'

interface Props {
  players: Player[]
  room: Room
}

const defaultSelection = { id: '', name: '' }

export default function Awards({ players, room }: Props) {
  const [winners, setWinners] = useState<Partial<Player>[]>([])
  const [currentSelection, setCurrentSelection] = useState(defaultSelection)

  const addWinner = (event: FormEvent) => {
    event.preventDefault()

    setWinners([...winners, currentSelection])
    setCurrentSelection(defaultSelection)
  }

  const onSelectChange = (id: string) => {
    setCurrentSelection({
      id,
      name: players.find(p => p.id === id)?.name || '',
    })
  }

  const onSave = () => {
    console.log('onSave')
  }

  const onRemoveWinner = (index: number) => {
    const winnersCopy = [...winners]
    winnersCopy.splice(index, 1)

    setWinners(winnersCopy)
  }

  const playersWithoutWinners = players.filter(p1 =>
    winners.findIndex(p2 => p2.id === p1.id),
  )

  return (
    <Fragment>
      <Collapsible id="line" label="Línea">
        <form onSubmit={addWinner}>
          <div className="flex">
            <div className="flex-auto">
              <Select
                id="name"
                onChange={onSelectChange}
                options={playersWithoutWinners}
                value={currentSelection.name}
                disabled={winners.length === players.length}
              />
            </div>
            <div className="ml-4">
              <Button
                id="add-player"
                aria-label="Add Player"
                className="w-full"
                color="green"
                type="submit"
                disabled={
                  !currentSelection.id || winners.length === players.length
                }
              >
                <FiPlus />
              </Button>
            </div>
          </div>
        </form>
        <div className="my-4">
          {winners.map(({ id, name }, index) => (
            <div
              key={id}
              className={classnames([
                'flex items-center justify-between',
                index && 'mt-4',
              ])}
            >
              <div className="flex-auto">
                <p>{name}</p>
              </div>
              <div className="ml-4">
                <Button
                  color="red"
                  id={`remove-player-${index + 1}`}
                  onClick={() => onRemoveWinner(index)}
                >
                  <FiTrash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button id="save" onClick={onSave}>
            <FiSave />
            <span className="ml-4">Guardar</span>
          </Button>
        </div>
      </Collapsible>
    </Fragment>
  )
}
