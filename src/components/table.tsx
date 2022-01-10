import React from 'react'
import blogStyles from '../styles/blog.module.css'
import { textBlock } from '../lib/notion/renderers'

const Table = ({ table }) => {
  return (
    <>
      <table>
        {table.Rows.map((rowBlock, j) => {
          return (
            <tr key={`${rowBlock.Id}-${j}`}>
              {rowBlock.TableRow.Cells.map((cell, i) => {
                let tag = 'td'
                if (
                  (table.HasRowHeader && i === 0) ||
                  (table.HasColumnHeader && j === 0)
                ) {
                  tag = 'th'
                }

                return React.createElement(
                  tag,
                  { key: `${rowBlock.Id}-${j}-${i}` },
                  textBlock(cell, true, `${rowBlock.Id}-${j}-${i}-p`)
                )
              })}
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default Table
