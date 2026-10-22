import type React from 'react'
import { useId } from 'react'

import { useDrawingText } from './drawing-text'
import ListDrawingArtwork from './list-drawing.svg?react'

/** Hand-drawn List screens: the office laptop writing a new line, and the shopper's phone ticking one, struck out on both. */
export const ListDrawing: React.FC = () => {
  const text = useDrawingText('list')
  const titleId = useId()

  return (
    <ListDrawingArtwork aria-labelledby={titleId} className='screen' role='img'>
      <title id={titleId}>{text.title}</title>
      <g className='drawing-letter' fill='var(--ink)'>
        <g transform='translate(16 40)'>
          <g fontSize='20' fontWeight='800' letterSpacing='0.5'>
            <text x='22' y='70'>
              {text.listTitleTop}
            </text>
            <text x='22' y='94'>
              {text.listTitleBottom}
            </text>
          </g>
          <g fontSize='10.5'>
            <text className='struck' x='168' y='53.5'>
              <tspan>{text.paperTowels}</tspan>
            </text>
            <text className='struck' x='168' y='73.5'>
              <tspan>{text.coffeeBeans}</tspan>
            </text>
            <text x='168' y='93.5'>
              {text.kebab}
            </text>
            <text className='struck' x='168' y='113.5'>
              <tspan>{text.lemons}</tspan>
            </text>
            <text x='168' y='133.5'>
              {text.oatMilk}
            </text>
            <text x='168' y='153.5'>
              {text.batteries}
            </text>
            <text x='168' y='173.5'>
              {text.binBags}
            </text>
            <text x='156' y='195.5'>
              {text.cake}
              <tspan fill='var(--violet)'>|</tspan>
            </text>
          </g>
        </g>
      </g>
      <g className='drawing-letter' fill='var(--ink)'>
        <g transform='translate(384 72)'>
          <g fontSize='14' fontWeight='800' letterSpacing='0.5'>
            <text x='18' y='66'>
              {text.listTitleTop}
            </text>
            <text x='18' y='82'>
              {text.listTitleBottom}
            </text>
          </g>
          <g fontSize='9.5'>
            <text className='struck' x='33' y='110.5'>
              <tspan>{text.paperTowels}</tspan>
            </text>
            <text className='struck' x='33' y='132.5'>
              <tspan>{text.coffeeBeans}</tspan>
            </text>
            <text x='33' y='154.5'>
              {text.kebab}
            </text>
            <text className='struck' x='33' y='176.5'>
              <tspan>{text.lemons}</tspan>
            </text>
            <text x='33' y='198.5'>
              {text.oatMilk}
            </text>
            <text x='33' y='220.5'>
              {text.batteries}
            </text>
            <text x='33' y='242.5'>
              {text.binBags}
            </text>
          </g>
        </g>
      </g>
      <g className='drawing-letter' fill='var(--ink)'>
        <g fontSize='13'>
          <text fontWeight='700' letterSpacing='1' x='384' y='40'>
            {text.tickedInShop}
          </text>
          <text fill='var(--ink-soft)' x='384' y='56'>
            {text.struckEverywhere}
          </text>
          <text fontWeight='700' letterSpacing='1' x='166' y='304'>
            {text.lineAndName}
          </text>
          <text fill='var(--ink-soft)' x='166' y='320'>
            {text.nameAskedOnce}
          </text>
          <text
            fontWeight='700'
            letterSpacing='1'
            textAnchor='end'
            x='354'
            y='338'
          >
            {text.noAccount}
          </text>
          <text fill='var(--ink-soft)' textAnchor='end' x='354' y='354'>
            {text.linkIsKey}
          </text>
        </g>
      </g>
    </ListDrawingArtwork>
  )
}
