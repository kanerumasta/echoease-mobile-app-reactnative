import { TransactionCard } from "@/components/transactions/TransactionCard";
import { useFetchTransactionsQuery } from "@/redux/features/transactionApiSlice";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function Transactions(){
    const [page,setPage] = useState(1)
    const {data:transactions, isLoading, refetch} = useFetchTransactionsQuery(page,{refetchOnMountOrArgChange:true})

    console.log(transactions)
    const handleFetchNext = () => {
        if(transactions?.has_next && !isLoading){
            setPage(prev => prev+1)
        }
    }
    const handleRefresh = () => {
        setPage(1)
        refetch()
    }

    if(isLoading) return <ActivityIndicator />

    return <View style={styles.mainContainer}>
        {transactions &&
        <FlatList
        style={{paddingTop:10}}
        key={transactions.results.length}

            data={transactions.results}
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
