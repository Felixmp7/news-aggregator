import { CommonQueryParams } from "./newsaggregator.types"

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

export type GuardianQueryParams = CommonQueryParams & {
    section: string
    'from-date': string,
    'to-date': string;
    'api-key': string;
}

export type GuardianResponse = {
    response: {
        status: string,
        results: GuardianArticle[],
    }
}

