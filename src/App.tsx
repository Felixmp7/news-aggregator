import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ArticleDrawer } from '@/components/ArticleDrawer'
import { HeroTitle } from '@/components/HeroTitle'
import { NewsGrid } from '@/components/NewsGrid'
import { SelectSource } from '@/components/SelectSource'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Drawer } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NewsapiArticle } from '@/models/news.interfaces'
import { getNews } from "@/services/newsapi.service"


function App() {
    const [articleSelected, setArticleSelected]= useState<NewsapiArticle>()

    const { data, isFetching, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    })

    const handleSelectArticle = (article: NewsapiArticle) => setArticleSelected(article)
    return (
        <main>
            <HeroTitle className='mb-40' />
            <section className='flex items-center justify-between gap-20 container mx-auto mb-10'>
                <Input placeholder='Search by keyword...' />
                <div className='flex items-center gap-5'>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <SelectSource />
                    <DateRangePicker />
                    <Button>Search</Button>
                </div>
            </section>
            <Drawer open={!!articleSelected} onClose={() => setArticleSelected(undefined)}>
                <NewsGrid
                    articles={data?.articles}
                    isLoading={isFetching || isLoading}
                    onSelectArticle={handleSelectArticle}
                />
                <ArticleDrawer articleSelected={articleSelected} />
            </Drawer>
        </main>
    )
}

export default App
