export type GuardianArticle = {
    id: string
    type: string
    sectionId: string
    sectionName: string
    webPublicationDate: string
    webTitle: string
    webUrl: string
    apiUrl: string
    isHosted: boolean
    pillarId: string
    pillarName: string
}

export type GuardianResponse = {
    response: {
        status: string,
        results: GuardianArticle[],
    }
}

