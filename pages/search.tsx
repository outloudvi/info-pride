import { useState, useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import Typography from '@mui/material/Typography'
import { Cards, CardSkillsData } from '../utils/dataset'
import { ColorTypeSimple } from '../utils/wikiPages/types'
import type { Card } from '../utils/wikiPages/cards'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'

import Layout from '../components/Layout'
import CardDesc from '../components/CardDesc'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { IdolNameList, IdolName } from '../data/idols'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

const FilterSelect = <T extends string>({
  label,
  state,
  setState,
  list,
  width,
}: {
  label: string
  state: T[]
  setState: Dispatch<SetStateAction<T[]>>
  list: T[]
  width: number
}) => {
  const sig = 'lbl-filter-' + Buffer.from(label).toString('hex')
  return (
    <FormControl sx={{ m: 1, width }}>
      <InputLabel id={sig}>{label}</InputLabel>
      <Select
        labelId={sig}
        multiple
        value={state}
        onChange={(e) => {
          const value = e.target.value
          setState(
            typeof value === 'string'
              ? (value.split(',') as unknown as T[])
              : value
          )
        }}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
      >
        {list.map((name, key) => (
          <MenuItem key={key} value={name}>
            <Checkbox checked={state.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const CardsFlattened = Object.values(Cards)
  .map((x) => Object.values(x))
  .reduce((a, b) => [...a, ...b]) as Card[]

const SkillesPage = () => {
  const [fKeyword, setfKeyword] = useState('')
  const [fIdol, setfIdol] = useState<IdolName[]>([])
  const [fColor, setfColor] = useState<ColorTypeSimple[]>([])
  const [fCtMin, setfCtMin] = useState(0)
  const [fCtMax, setfCtMax] = useState(-1)

  const selectedCards = useMemo(() => {
    let ret = CardsFlattened
    if (fKeyword !== '') {
      ret = ret.filter((x) => JSON.stringify(x).includes(fKeyword))
    }
    if (fIdol.length > 0) {
      ret = ret.filter((x) => fIdol.includes(x.ownerName as IdolName))
    }
    if (fColor.length > 0) {
      const mappedGroup = fColor.map(
        (x) =>
          ({
            [ColorTypeSimple.Vocal]: '舞蹈',
            [ColorTypeSimple.Dance]: '歌唱',
            [ColorTypeSimple.Visual]: '表演',
          }[x])
      )
      ret = ret.filter((x) => mappedGroup.includes(x.prop))
    }

    // Skill-related part

    ret = ret.filter((x) => {
      const skillList = CardSkillsData[x.ownerName][x.ownerId]
      const skills = [skillList.ski1, skillList.ski2, skillList.ski3]
      if (fCtMin > 0) {
        if (
          skills.filter(
            (x) => x.filter((y) => y.type === 'ct' && y.ct < fCtMin).length > 0
          ).length > 0
        ) {
          console.log(
            skills.filter(
              (x) =>
                x.filter((y) => y.type === 'ct' && y.ct < fCtMin).length > 0
            )
          )
          return false
        }
      }
      if (fCtMax > 0) {
        if (
          skills.filter(
            (x) => x.filter((y) => y.type === 'ct' && y.ct > fCtMax).length > 0
          ).length > 0
        ) {
          console.log(
            skills.filter(
              (x) =>
                x.filter((y) => y.type === 'ct' && y.ct < fCtMin).length > 0
            )
          )
          return false
        }
      }
      return true
    })

    return ret
  }, [fKeyword, fIdol, fColor, fCtMin, fCtMax])

  return (
    <Layout>
      <Typography variant="h2">搜索</Typography>
      <Box className="mt-2 rounded-md border-solid border-6 border-sky-500 p-2 flex items-center">
        <TextField
          label="关键词"
          variant="outlined"
          value={fKeyword}
          onChange={(e) => {
            setfKeyword(e.target.value)
          }}
        />
        <FilterSelect
          label="角色"
          state={fIdol}
          setState={setfIdol}
          list={IdolNameList}
          width={300}
        />
        <FilterSelect
          label="类型"
          state={fColor}
          setState={setfColor}
          list={['Vocal', 'Dance', 'Visual'] as ColorTypeSimple[]}
          width={200}
        />
        <TextField
          label="CT 最小值"
          variant="outlined"
          type="number"
          value={fCtMin}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (Number.isNaN(v)) return
            setfCtMin(v)
          }}
        />
        <TextField
          label="CT 最大值"
          placeholder="无限制"
          variant="outlined"
          type="number"
          value={fCtMax}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (Number.isNaN(v)) return
            setfCtMax(v)
          }}
        />
      </Box>
      <div className="mt-2">
        从 {CardsFlattened.length} 张卡片中找到 {selectedCards.length} 个结果。
      </div>
      <Box className="mt-2">
        {selectedCards.map((item, key) => (
          <CardDesc key={key} card={item} />
        ))}
      </Box>
    </Layout>
  )
}

export default SkillesPage
