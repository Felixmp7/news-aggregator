import { useState } from "react"

import { Article, Source } from "@/models/news-aggregator.types"
import { getDataFromNYTimesSource } from "@/services/new-york-times.service"
import { getDataFromNewsApiSource } from "@/services/newsapi.service"
import { getDataFromTheGuardiansApiSource } from "@/services/the-guardian.service"
import { useDateRangePicker } from "./useDateRangePicker"
import { useQuery } from "./useQuery"
import { useUrlSearchParams } from "./useUrlSearchParams"

export const useNewsAggregator = () => {
    const [articleSelected, setArticleSelected]= useState<Article>()
    const [keywordValues, setKeywordValues]= useState('')
    const [category, setCategory] = useState('')
    const [sourceSelected, setSourceSelected] = useState<Source>('news-api')

    const { dateRange, handleChangeRange } = useDateRangePicker();

    const { search } = useUrlSearchParams({
        keywords: keywordValues,
        source: sourceSelected,
        category: category,
        dateRange: dateRange
    });
    const {
        data: newsData,
        isLoading: isLoadingNewsApi,
        fetch: fetchNewsApi
    } = useQuery(getDataFromNewsApiSource)

    const {
        data: guardianData,
        isLoading: isLoadingGuardian,
        fetch: fetchGuardians
    } = useQuery(getDataFromTheGuardiansApiSource)

    const {
        data: nyTimesData,
        isLoading: isLoadingNYTimes,
        fetch: fetchNYTimes
    } = useQuery(getDataFromNYTimesSource)

    const handleClickSearch = () => {
        search();
        if (sourceSelected === 'news-api') fetchNewsApi()
        if (sourceSelected === 'guardian') fetchGuardians()
        if (sourceSelected === 'new-york-times') fetchNYTimes()
        return
    }

    const handleChangeSource = (source: Source) => setSourceSelected(source)
    const handleChangeKeywords = (keywords: string) => setKeywordValues(keywords)
    const handleChangeCategory = (category: string) => setCategory(category)
    const handleSelectArticle = (article?: Article) => setArticleSelected(article || undefined)

    const dataSource: Record<Source, Article[] | undefined> = {
        'news-api': newsData?.articles,
        'guardian': guardianData?.articles,
        'new-york-times': nyTimesData?.articles
    }

    return {
        sourceSelected,
        keywordValues,
        category,
        dateRange,
        articleSelected,
        articles: dataSource[sourceSelected] ?? [],
        isLoadingNewsApi,
        isLoadingGuardian,
        isLoadingNYTimes,
        handleChangeSource,
        handleChangeKeywords,
        handleChangeCategory,
        handleChangeRange,
        handleClickSearch,
        handleSelectArticle
    }
}
