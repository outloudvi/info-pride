/**
 * Describe a notemap.
 * Negative numbers indicate SP skills, while positive numbers indicate A skills.
 * @param beat Total beat count
 */
type NoteDescription = {
  '1': number[]
  '2': number[]
  '3': number[]
  '4': number[]
  '5': number[]
  beat: number
}

/**
 * All notemaps in the game.
 * @param title Song title
 * @param type Note type, [num]SP[num]A
 * @example {"Prayforyou": {"2SP16A": ...}}
 */
export type WikiNoteMap = {
  [title: string]: { [type: string]: NoteDescription }
}

/**
 * Items of Mana's diary.
 * @param diary Diary text
 * @param date Dary in-game date
 */
type WikiDiaryItem = { diary: string; date: string }

/**
 * Mana's diary.
 */
export type WikiDiary = WikiDiaryItem[]

type WikiCalendarEventType =
  | '通常卡池'
  | '限定卡池'
  | '复刻卡池'
  | '定例活动'
  | 'links活动'
  | 'VENUS对战'
  | 'VENUS赛事活动'
  | '联合对战'

/**
 * @param start Start date, YYYY/M/DD
 * @param end End date, YYYY/M/DD
 * @param link Related wiki article
 * @param title Event type
 * @param type Event type
 */
type WikiCalendarEvent = {
  start: string
  end: string
  link: string
  title: string
  type: WikiCalendarEventType | string
}

/**
 * Event calendar.
 * @param yyyymm YYYY-MM formatted.
 */
export type WikiCalendar = { [yyyymm: string]: WikiCalendarEvent[] }
