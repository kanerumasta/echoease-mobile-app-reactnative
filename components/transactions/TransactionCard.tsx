import { TransactionSchema } from "@/schemas/transaction-schemas"
import { isToday } from "@/utils/helpers"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { z } from "zod"

type TransactionCardProps = {
    transaction:z.infer<typeof TransactionSchema>
}

export const TransactionCard=({transaction}:TransactionCardProps) => {
    const isExpense = (transaction.transaction_type === 'downpayment') || (transaction.transaction_type === 'final_payment')

    const router = useRouter()

    return <TouchableOpacity onPress={()=>{
        router.push(`/transactions/${transaction.id}`)
    }} style={styles.mainContainer}>

        {isExpense ?
        <View style={styles.icon}>
            <Image source={require('../../assets/images/up-arrow.png')} style={{width:30, height:30}}/>
        </View> :
        <View style={styles.icon}>
            <Image source={require('../../assets/images/down-arrow.png')} style={{width:30, height:30}}/>
        </View>
        }
        <View style={{
            flex:1,
            justifyContent:'center',

            }}>
                {isToday(transaction.created_at) ?
                <View
                    style={{
                        flexDirection:'row',
                        alignItems: 'center',
                        gap:4
                    }}
                    >
                    <Text style={styles.description}>Today</Text>
                    <Text style={styles.description}>{transaction.formatted_time}</Text>
                </View> :
                <Text style={styles.description}>{transaction.formatted_created_at}</Text>}
            <Text style={styles.title}>{transaction.payment.title}</Text>

        </View>
        <View>
        <Text style={[styles.amount,
            {color:isExpense ? '#f31260' :'dodgerblue'}
        ]}>{isExpense ? '-' : '+'}{'\u20B1'}{transaction.amount}</Text>
        </View>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
    mainContainer:{
      flexDirection:'row',
      gap:6,
      padding:10,
      alignItems:'center',
      borderBottomWidth:1,
      borderColor:'rgba(0, 0,0, 0.10)',
      margin:5,

    },
    icon:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
    },
    title:{
        textTransform:'capitalize',
        fontWeight:'bold',
        fontSize:15,
        color:'black',

    },
    description:{
        fontSize:12,
        color:'rgba(0,0,0,0.4)',
    },
    amount:{
        fontSize:16,
        fontWeight:'bold',
    }
})
