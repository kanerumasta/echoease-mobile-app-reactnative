import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { useFetchArtistsWithFilterQuery } from "../../redux/features/artistApiSlice";
import { ArtistInSchema } from "../../schemas/artist-schemas";
import { EchoeeCard } from "./echoee-card";
import { EchoeeCardSkeleton } from "./echoee-card-skeleton";

type EchoeeGroupProps = {
    category: string,
    title: string,
    refresh: number
};

export const EchoeeGroup = ({ title, category, refresh }: EchoeeGroupProps) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch query
    const { data: echoees, isLoading, isFetching } = useFetchArtistsWithFilterQuery({
        q: null,
        max_price: null,
        min_price: null,
        genres: [],
        category: category,
        page: page
    });

    // Combined state for all fetched results
    const [combinedEchoees, setCombinedEchoees] = useState<z.infer<typeof ArtistInSchema>[]>([]);


    // Effect to reset data when component mounts or when `refresh` changes
    useEffect(() => {
        setPage(1);              // Reset to the first page
        setLoading(true);        // Start loading to trigger fetch
    }, [refresh]);

    // Effect to handle changes to the `echoees` data and combine unique results
    useEffect(() => {
        if (echoees && echoees.results) {
            if(page === 1){
                setCombinedEchoees(echoees.results)
            }
            else{
            setCombinedEchoees((prev) => {
                const allEchoees = [...(prev || []), ...echoees.results];
                // Ensure uniqueness by id
                const uniqueEchoees = Array.from(new Map(allEchoees.map(item => [item.id, item])).values());
                return uniqueEchoees;
            });
        }
            setLoading(false);  // Stop loading after setting new data
        }
    }, [echoees]);

    // Function to load more data if available
    const loadMore = () => {
        if (isLoading || isFetching) {
            return;  // Prevent loading more if already fetching
        }
        if (echoees && echoees.has_next) setPage(prev => prev + 1);  // Load next page if available
    };

    return (
        <View>
            {echoees && echoees.count > 0 &&<Text style={styles.title}>{title}</Text>}
            <FlatList
                horizontal
                data={combinedEchoees}
                renderItem={({ item, index }) => <EchoeeCard key={item.id} echoee={item} />}
                keyExtractor={(item) => item.id.toString()}
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
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
        padding: 8,
        fontWeight: 'bold',
    },
});
