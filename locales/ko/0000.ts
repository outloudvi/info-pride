const items = async () => ({
    '404': await import('./404.json').then((x) => x.default),
    about: await import('./about.json').then((x) => x.default),
    analyze: await import('./analyze.json').then((x) => x.default),
    cards: await import('./cards.json').then((x) => x.default),
    cards_slug: await import('./cards_slug.json').then((x) => x.default),
    characters: await import('./characters.json').then((x) => x.default),
    colors: await import('./colors.json').then((x) => x.default),
    common: await import('./common.json').then((x) => x.default),
    diary: await import('./diary.json').then((x) => x.default),
    emblems: await import('./emblems.json').then((x) => x.default),
    eventstories: await import('./eventstories.json').then((x) => x.default),
    index: await import('./index.json').then((x) => x.default),
    message_search: await import('./message_search.json').then(
        (x) => x.default,
    ),
    messages: await import('./messages.json').then((x) => x.default),
    moshikoi: await import('./moshikoi.json').then((x) => x.default),
    mtalk: await import('./mtalk.json').then((x) => x.default),
    notemap: await import('./notemap.json').then((x) => x.default),
    notice: await import('./notice.json').then((x) => x.default),
    photos: await import('./photos.json').then((x) => x.default),
    photo_ability_type: await import('./photo_ability_type.json').then(
        (x) => x.default,
    ),
    search: await import('./search.json').then((x) => x.default),
    search_skills: await import('./search_skills.json').then((x) => x.default),
    settings: await import('./settings.json').then((x) => x.default),
    spine_animation: await import('./spine_animation.json').then(
        (x) => x.default,
    ),
    spine: await import('./spine.json').then((x) => x.default),
    stories: await import('./stories.json').then((x) => x.default),
    storyreplay: await import('./storyreplay.json').then((x) => x.default),
    story_search: await import('./story_search.json').then((x) => x.default),
    units: await import('./units.json').then((x) => x.default),
    'v-card-alias': await import('./v-card-alias.json').then((x) => x.default),
    'v-card-name': await import('./v-card-name.json').then((x) => x.default),
    'v-chr': await import('./v-chr.json').then((x) => x.default),
    vendor: await import('./vendor.json').then((x) => x.default),
    'v-event-name': await import('./v-event-name.json').then((x) => x.default),
    'v-group': await import('./v-group.json').then((x) => x.default),
})

export default await items()
