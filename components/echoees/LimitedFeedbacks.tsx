import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useFetchArtistFeedbacksQuery } from "@/redux/features/reviewsApiSlice";
import { FeedbacksInSchema } from "@/schemas/review-schemas";
import { z } from 'zod';
import { Stars } from './stars';

export const LimitedFeedbacks = ({ artistId }: { artistId: number }) => {
    const { data, isLoading, isFetching } = useFetchArtistFeedbacksQuery({
        page: 1,
        artistId,
    });

    // Get the first 6 feedbacks
    const feedbacksToDisplay = data?.results.slice(0, 6);

    if (isLoading || isFetching) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            {
                feedbacksToDisplay?.map((feedback)=>(
                    <FeedbackCard key={feedback.id} feedbackItem={feedback}/>
                ))
            }
        </View>
    );
};

const FeedbackCard = ({ feedbackItem }: { feedbackItem: z.infer<typeof FeedbacksInSchema> }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.topContainer}>
                <Image style={styles.cardImage} source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${feedbackItem.client.profile.profile_image}` }} />
                <View>
                    <Text style={styles.fullname}>{feedbackItem.client.fullname}</Text>
                    <Stars rating={feedbackItem.rating} />
                </View>
            </View>
            <View>
                <Text style={styles.comment}>{feedbackItem.feedback}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 5,
    },
    cardContainer: {

        backgroundColor: '#fff',

        marginVertical: 10,
        borderRadius: 8,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    fullname: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    comment: {
        color: 'rgba(0,0,0,0.6)',
        fontSize:12,
    },
    emptyFeedbackContainer: {
        height: Dimensions.get('window').height,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
