import { getLocale } from 'next-intl/server'

import BirthdayCommuView from './BirthdayCommuView'

import BirthdayCommuData from '#data/videos/birthday.data'
import type { CharacterId } from '#data/vendor/characterId'

const BirthdayCommu = async ({ charaId }: { charaId: string }) => {
    const locale = await getLocale()

    const birthdayCommuData =
        BirthdayCommuData[locale]?.[charaId as CharacterId] ?? {}

    return <BirthdayCommuView charaId={charaId} data={birthdayCommuData} />
}

export default BirthdayCommu
