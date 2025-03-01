export type NewYorkTimesArticle = {
    abstract: string,
    snippet: string,
    web_url: string,
    lead_paragraph: string;
    source: string
    pub_date: string
    news_desk: string,
    section_name: string
    byline: {
        original: string // Author
    }

}

export type NewYorkTimesResponse = {
    status: string
    response: {
        docs: NewYorkTimesArticle[]
    }
}
