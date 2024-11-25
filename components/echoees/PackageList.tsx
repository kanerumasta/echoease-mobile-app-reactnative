import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { ArtistInSchema, RateSchema } from '@/schemas/artist-schemas'
import { useFonts} from 'expo-font'
import { Poppins_400Regular,Poppins_700Bold } from '@expo-google-fonts/poppins';
import { CustomText } from '../CustomText'


const PackageList = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
    const [fontsLoaded ] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })
    if(!fontsLoaded) return null
  return (
    <View>
      <Text style={styles.headerTitle}>Packages</Text>
        <FlatList
            data = {artist.rates}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainContainer}
            nestedScrollEnabled={true}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {({item}) => (
               <PackageItem rate={item}/>
            )}
        />
    </View>
  )
}

export default PackageList

const PackageItem = ({rate}:{rate:z.infer<typeof RateSchema>}) => {
    return <View style={styles.itemContainer}>
        <CustomText style={styles.amountText}>&#8369;{new Intl.NumberFormat().format(Math.floor(rate.amount))}</CustomText>
        <CustomText style={styles.rateText}>{rate.name}</CustomText>
    </View>
}

const styles = StyleSheet.create({
    headerTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.4)',
        marginBottom:10,
    },
    mainContainer:{
        flexDirection:'row',
        gap:6,
        marginBottom:12,

    },
    itemContainer:{

        width:120,
        borderRadius:14,

        padding:10,

        backgroundColor:"rgba(30, 144, 255, 0.2)"

    },
    amountText:{
        fontWeight:'bold',
        color:'rgba(0,0,0,0.6)',
        fontSize:24,
        textAlign:'center',
    },
    rateText:{
        color:'rgba(0,0,0,0.5)',
        fontSize:12,
        textAlign:'center',
        fontWeight:'bold',
        fontFamily:'Poppins_400Regular'

    }
})
