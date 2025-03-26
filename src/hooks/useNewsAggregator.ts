import queryString from 'query-string';
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { deleteQueryParams, getInitialValues, pushQueryParams, setQueryParams } from "@/lib/utils";
import { Article, NewsAggregatorQueryParams, Source } from "@/models/news-aggregator.types";
import { getDataFromNYTimesSource } from "@/services/new-york-times.service";
import { getDataFromNewsApiSource } from "@/services/newsapi.service";
import { getDataFromTheGuardiansApiSource } from "@/services/the-guardian.service";
import { useQuery } from "./useQuery";

export const useNewsAggregator = () => {
    const [articleSelected, setArticleSelected]= useState<Article>()
    const [keywordValues, setKeywordValues]= useState('')
    const [categorySelected, setCategorySelected] = useState('')
    const [sourceSelected, setSourceSelected] = useState<Source>('news-api')
    const [dateRangeSelected, setDateRangeSelected] = useState<DateRange>()

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

    const handleChangeSource = (source: Source) => setSourceSelected(source)
    const handleChangeKeywords = (keywords: string) => setKeywordValues(keywords)
    const handleChangeCategory = (category: string) => setCategorySelected(category)
    const handleSelectArticle = (article?: Article) => setArticleSelected(article || undefined)
    const handleChangeRange = (dateRange: DateRange | undefined) => setDateRangeSelected(dateRange || undefined)

    const fetchBySource = (values: NewsAggregatorQueryParams) => {
        if (sourceSelected === 'news-api') fetchNewsApi(values)
        if (sourceSelected === 'guardian') fetchGuardians(values)
        if (sourceSelected === 'new-york-times') fetchNYTimes(values)
    }

    const handleClickSearch = () => {
        const values = {
            category: categorySelected,
            from: dateRangeSelected?.from?.toISOString() || null,
            to: dateRangeSelected?.to?.toISOString() || null,
            keywords: keywordValues,
            source: sourceSelected
        }
        setQueryParams(values);
        pushQueryParams(queryString.stringify(values))
        fetchBySource(values)
    }

    const handleSaveFiltersInLocalStorage = () => {
        if (sourceSelected) localStorage.setItem('source', sourceSelected)
        if (keywordValues) localStorage.setItem('keywords', keywordValues)
        if (categorySelected) localStorage.setItem('category', categorySelected)
        if (dateRangeSelected?.from) localStorage.setItem('from', dateRangeSelected.from.toISOString())
        if (dateRangeSelected?.to) localStorage.setItem('to', dateRangeSelected.to.toISOString())
    }

    const fetchWithInitialValues = (initialValues: NewsAggregatorQueryParams) => {
        if (initialValues.source) setSourceSelected(initialValues.source as Source)
        if (initialValues.keywords) setKeywordValues(initialValues.keywords)
        if (initialValues.category) setCategorySelected(initialValues.category)
        setDateRangeSelected({
            from: initialValues.from ? new Date(initialValues.from): undefined,
            to: initialValues.to ? new Date(initialValues.to) : undefined
        })
        fetchBySource(initialValues)
    }

    const clearFilters = () => {
        setSourceSelected('news-api')
        setKeywordValues('')
        setCategorySelected('')
        localStorage.clear();
        setDateRangeSelected(undefined)
        deleteQueryParams()
        pushQueryParams('')
    }

    const dataSource: Record<Source, Article[] | undefined> = {
        'news-api': newsData,
        'guardian': guardianData,
        'new-york-times': nyTimesData
    }

    useEffect(() => {
        const initialValues = getInitialValues();
        const mustFetchWithInitialData = Object.values(initialValues).some((value) => !!value)

        if (mustFetchWithInitialData) {
            fetchWithInitialValues(initialValues)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        sourceSelected,
        keywordValues,
        categorySelected,
        dateRangeSelected,
        articleSelected,
        articles: sourceSelected ? dataSource[sourceSelected] : [],
        isLoadingNewsApi,
        isLoadingGuardian,
        isLoadingNYTimes,
        handleChangeSource,
        clearFilters,
        handleChangeKeywords,
        handleChangeCategory,
        handleChangeRange,
        handleClickSearch,
        handleSelectArticle,
        handleSaveFiltersInLocalStorage
    }
}
