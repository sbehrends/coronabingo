import React, { Fragment } from 'react'
import Collapsible from '~/components/Collapsible'
import { Room } from '~/interfaces'

interface Props {
  room: Room
}

export default function Awards({ room }: Props) {
  console.log(room)

  return (
    <Fragment>
      <Collapsible id="line" label="Línea">
        <p>Línea</p>
      </Collapsible>
      <div className="my-4">
        <Collapsible id="board" label="Cartón">
          <p>Cartón</p>
        </Collapsible>
      </div>
      <Collapsible id="coronabingo" label="Coronabingo">
        <p>Coronabingo</p>
      </Collapsible>
    </Fragment>
  )
}
