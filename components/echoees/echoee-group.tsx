import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { z } from "zod"
import { useFetchArtistsWithFilterQuery } from "../../redux/features/artistApiSlice"
import { ArtistInSchema } from "../../schemas/artist-schemas"
import { EchoeeCard } from "./echoee-card"
import { EchoeeCardSkeleton } from "./echoee-card-skeleton"


type EchoeeGroupProps = {
    category: string,
    title: string
}

export const EchoeeGroup = ({ title, category }: EchoeeGroupProps) => {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const { data: echoees, isLoading, isFetching } = useFetchArtistsWithFilterQuery({
        q: null,
        max_price: null,
        min_price: null,
        genres: [],
        category: category,
        page: page
    })

    const [combinedEchoees, setCombinedEchoees] = useState<z.infer<typeof ArtistInSchema>[]>()

    useEffect(()=>{
        setCombinedEchoees([])
    },[])

    useEffect(() => {
        if (echoees && echoees.results) {
            setCombinedEchoees(prev => [...(prev || []), ...echoees.results]);
            setLoading(false);  // Stop loading once new data is fetched
        }
    }, [echoees])

    const loadMore = () => {
        if(isLoading || isFetching){
            return
        }
        if(echoees && echoees.has_next) setPage(prev=>prev+1)
    }

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                data={combinedEchoees}
                renderItem={({item})=>(
                    <EchoeeCard key={item.id} echoee={item} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={2}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={
                    (isLoading || isFetching) ? (
                        page === 1 ? (
                          <View style={{ flexDirection: 'row' }}>
                            <EchoeeCardSkeleton />
                            <EchoeeCardSkeleton />
                            <EchoeeCardSkeleton />
                            <EchoeeCardSkeleton />
                            <EchoeeCardSkeleton />
                          </View>
                        ) : (
                          <EchoeeCardSkeleton />
                        )
                      ) : null
                  }
            />

        </View>

    )
}



const styles = StyleSheet.create({
    scrollView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
    },
    title: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
        padding: 8,
        fontWeight: 'bold'
    },
    loaderContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
