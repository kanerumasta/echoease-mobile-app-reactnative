import { TransactionCard } from "@/components/transactions/TransactionCard";
import { useFetchTransactionsQuery } from "@/redux/features/transactionApiSlice";
import { TransactionSchema } from "@/schemas/transaction-schemas";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

export default function Transactions(){
    const [page,setPage] = useState(1)
    const {data:transactions, isLoading, refetch} = useFetchTransactionsQuery(page,{refetchOnMountOrArgChange:true})
    const [cachedTransactions, setCachedTransactions] = useState<z.infer<typeof TransactionSchema>[]>([])

    const handleFetchNext = () => {
        if(transactions?.has_next && !isLoading){
            setPage(prev => prev+1)
        }
    }
    const handleRefresh = () => {
        setPage(1)
        refetch()
    }

    // Append new transactions without duplicates
    const appendTransactions = useCallback(() => {
        if (transactions?.results) {
            const newTransactions = transactions?.results
            setCachedTransactions((prev) => {
                const newTransactions = transactions.results.filter(
                    (newTransaction) => !prev.some((transaction) => transaction.id === newTransaction.id)
                );
                return [...prev, ...newTransactions];
            });
        }
    }, [transactions]);

// Effect hook to append transactions when data is fetched
useEffect(() => {
    appendTransactions();
}, [transactions, appendTransactions]);

    if(isLoading) return <ActivityIndicator />

    return <View style={styles.mainContainer}>
        {transactions &&
        <FlatList
            style={{paddingTop:10}}
            key={transactions.results.length}
            onEndReachedThreshold={0.5}
            data={cachedTransactions}
            renderItem={({item})=>(
               <TransactionCard key={item.id} transaction={item}/>
            )}
            keyExtractor={(item)=>item.id.toString()}
        onEndReached={handleFetchNext}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}
        />
}
    </View>
}

const styles = StyleSheet.create({
    mainContainer:{
        minHeight: '100%',
        backgroundColor:'#f0f0f0',
    }
})
