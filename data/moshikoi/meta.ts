import type { CharacterId } from '#data/vendor/characterId'

const MoshikoiMeta: Record<
    string,
    {
        title: string
        characterId: CharacterId
        startStory: string
        img: string
    }
> = {
    '230514': {
        title: 'もしも君の手に触れたら',
        characterId: 'char-rei',
        startStory: 'st-love-23-0514-001',
        img: 'img_photo_full_photo-love-23-0514-01',
    },
    '231114': {
        title: 'もしも幼なじみと恋をしたら',
        characterId: 'char-ngs',
        startStory: 'st-love-23-1114-001',
        img: 'img_photo_full_photo-love-23-1114-01',
    },
    '240517': {
        title: 'もしも君と恋をしたら',
        characterId: 'char-mei',
        startStory: 'st-love-24-0517-001',
        img: 'img_photo_full_photo-love-24-0517-01',
    },
}

export default MoshikoiMeta
