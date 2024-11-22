import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { useConfirmBookingMutation, useFetchBookingDetailQuery, useRejectBookingMutation } from "@/redux/features/bookingApiSlice";
import { useCreateInvoiceMutation } from "@/redux/features/paymentApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Dialog from 'react-native-dialog'
import { TextInput } from "react-native-paper";
export default function BookingDetail(){
    const {id} = useLocalSearchParams<{id:string}>()
    const {data:booking,isLoading} = useFetchBookingDetailQuery(id,{
        refetchOnMountOrArgChange:true
    })
    const {data:currentUser} = useGetUserQuery()
    const [createInvoice,{isLoading:invoiceLoading}] = useCreateInvoiceMutation()
    const [cancellationReason, setCancellationReason] = useState("")
    const [dialogVisible, setDialogVisible] = useState(false)
    const [rejectDialogVisible, setRejectDialogVisible] = useState(false)
    const [confirmBooking,{isLoading:confirming}] = useConfirmBookingMutation()
    const [rejectBooking, {isLoading:rejecting}] = useRejectBookingMutation()

    const handleCreateInvoice = async (paymentType:string)=>{
        if(!booking) return
        const payload = {
            booking_id:booking.id.toString(),
            payment_type:paymentType,
            redirect_url:'myapp://payment-success'
        }
        const invoice = await createInvoice(payload).unwrap()
        openXendit(invoice.invoice_url)

    }
    const handleConfirmBooking = async ()=>{
        if(!booking) return
        await confirmBooking(booking.id.toString()).unwrap()
        setDialogVisible(false)

    }
    const handleRejectBooking = async ()=>{
        if(!booking) return
        await rejectBooking({

            bookingId:booking.id,
            reason:cancellationReason
        }).unwrap()
        setRejectDialogVisible(false)

    }

    const openXendit =  (url:string)=>{
        Linking.openURL(url)
    }
    console.log(`${booking?.artist.user.profile.profile_image}`)

    const statusBackColor = booking?.status === 'pending' ? '#e6c77a' : booking?.status === 'completed' ? '#17c964' : booking?.status === 'rejected' ? '#f31260' : booking?.status === 'approved' ? "#9353d3" : booking?.status === 'awaiting_downpayment'? "#006fee" : "#3f3f46"

    if(isLoading)return <View><Text>Loading..</Text></View>


    return(
        <>
        <ScrollView>
            {booking && currentUser &&
        <View style={styles.modalContainer}>
             {/* Image */}
             <View style={{position:'relative'}}>
                {currentUser.role === 'client'?
                 <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height * 0.35}} source={{uri:`${booking.artist.user.profile.profile_image}`}}/>
                 :
                 <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height * 0.35}} source={{uri:`${booking.client.profile.profile_image}`}}/>
                }

             </View>
             <View style={{padding:15}}>
                 <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                     <Text style={{fontSize:24, fontWeight:'bold', marginBottom:10}}>{currentUser.role  === 'client' ? booking.artist.user.fullname : booking.client.fullname}</Text>
                     <Text style={{padding:8, textTransform:'capitalize',
                         backgroundColor:statusBackColor,
                         fontSize:12,
                         borderRadius:20,
                         color:(booking.status === 'awaiting_downpayment') || (booking.status === 'approved') || (booking.status === 'rejected') ? "#fff":'#000'

                      }}>{booking.status.split('_').join(' ')}</Text>
                 </View>
                 <View style={{flexDirection:'row', gap:6, paddingVertical:6}}>
                     <Ionicons name="headset-sharp" size={24} color={"dodgerblue"} style={{opacity:0.7}}/>
                     <View>
                         <Text style={{fontSize:14, color:'rgba(0,0,0,0.8)',fontWeight:'bold', textTransform:'capitalize'}}>{booking.event_name}</Text>
                     </View>
                 </View>
                 <View style={{flexDirection:'row', gap:6, paddingVertical:6}}>
                     <Ionicons name="time-sharp" size={24} color={"dodgerblue"} style={{opacity:0.7}}/>
                     <View>
                         <Text style={{fontSize:14, color:'rgba(0,0,0,0.8)',marginBottom:3, fontWeight:'bold'}}>{booking .formatted_event_date}</Text>
                         <Text style={{fontSize:12, color:'rgba(0,0,0,0.4)'}}>{booking.formatted_start_time}-{booking.formatted_end_time}</Text>
                     </View>
                 </View>
                 <View style={{flexDirection:'row', gap:6, paddingVertical:6}}>
                     <Ionicons name="location-sharp" size={24} color={"dodgerblue"} style={{opacity:0.7}}/>
                     <View>
                         <Text style={{fontSize:14, color:'rgba(0,0,0,0.8)',marginBottom:3,fontWeight:'bold', textTransform:'capitalize'}}>{booking.venue || 'null'}</Text>
                         <Text style={{fontSize:12, color:'rgba(0,0,0,0.4)', textTransform:'capitalize', maxWidth:Dimensions.get('window').width*0.75}}>{booking.location}</Text>
                     </View>
                 </View>
              </View>
              {(booking.status === 'awaiting_downpayment' && currentUser && currentUser.role === 'client') &&
              <TouchableOpacity disabled={isLoading} style={{backgroundColor:'dodgerblue',elevation:4,flexDirection:'row', alignItems:'center',gap:6,justifyContent:'center', marginHorizontal:10, borderRadius:40, padding:15}} onPress={()=>{handleCreateInvoice('downpayment')}}>
                {!isLoading && <Ionicons size={20} name='card' color={"#00fa9a"}/>}
                 <Text style={{fontSize:14, fontWeight:'bold', color:'#fff', textAlign:'center'}}>{isLoading && <ActivityIndicator size={25} color='#fff'/>}{isLoading ? '' :'Pay Downpayment Now'}</Text>

              </TouchableOpacity>
             }
              {(booking.status === 'approved' && booking.is_event_due && currentUser && currentUser.role === 'client') &&
              <TouchableOpacity style={{backgroundColor:'dodgerblue',elevation:4,flexDirection:'row', alignItems:'center',gap:6,justifyContent:'center', marginHorizontal:10, borderRadius:40, padding:15}}onPress={()=>{handleCreateInvoice('final_payment')}}>
               {!confirming && <Ionicons size={20} name='card' color={"#00fa9a"}/>}
                 <Text style={{fontSize:14, fontWeight:'bold', color:'#fff', textAlign:'center'}}>{isLoading && <ActivityIndicator size={25} color='#fff'/>}{isLoading ? '' :'Pay Now'}</Text>

              </TouchableOpacity>
             }
             <View style={{flexDirection:'row'}}>
              {(booking.status === 'pending' && !booking.is_event_due && currentUser && currentUser.role === 'artist') &&
              <TouchableOpacity onPress={()=>setDialogVisible(true)} style={{backgroundColor:'#17c964',elevation:4,flexDirection:'row', alignItems:'center',gap:6,justifyContent:'center', marginHorizontal:10, borderRadius:40, padding:15}}>
               {!isLoading && <Ionicons size={20} name='checkmark-circle' color={"#000"}/>}
                 <Text style={{fontSize:15, fontWeight:'bold', color:'#000', textAlign:'center'}}>{confirming && <ActivityIndicator size={25} color='#fff'/>}{confirming ? '' :'Confirm Booking'}</Text>

              </TouchableOpacity>
             }
              {(booking.status === 'pending' && !booking.is_event_due && currentUser && currentUser.role === 'artist') &&
              <TouchableOpacity onPress={()=>setRejectDialogVisible(true)} style={{backgroundColor:'#f31260',elevation:4,flexDirection:'row', alignItems:'center',gap:6,justifyContent:'center', marginHorizontal:10, borderRadius:40, padding:15}}>
               {!rejecting && <Ionicons size={20} name='close-circle-sharp' color={"#fff"}/>}
                 <Text style={{fontSize:15, fontWeight:'bold', color:'#fff', textAlign:'center'}}>{rejecting && <ActivityIndicator size={25} color='#fff'/>}{rejecting ? '' :'Reject Booking'}</Text>

              </TouchableOpacity>
             }

             </View>
             {booking.latitude && booking.longitude &&
             <View style={{marginTop:20,height:Dimensions.get('window').height * 0.5,backgroundColor:'blue', borderRadius:20, overflow:'hidden', margin:15}}>
                 <MapView
                     style={{flex:1, borderRadius:10}}
                     showsBuildings={true}

                     showsMyLocationButton={true}
                     showsUserLocation={true}
                     tintColor='dodgerblue'

                     initialRegion={{
                         latitude: booking.latitude,
                         longitude: booking.longitude,
                         latitudeDelta: 0.1,
                         longitudeDelta: 0.1
                     }}
                 >
                     <Marker


                         coordinate={{latitude: booking.latitude, longitude: booking.longitude}}
                         title={booking.venue?.toUpperCase() || "Event Venue"}
                         description={booking.location}
                         pinColor='dodgerblue'

                     />


                 </MapView>
          </View>
}
        </View>
        }
        </ScrollView>

        <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Confirm Booking</Dialog.Title>
            <Dialog.Description>Are you sure you want to confirm this booking?</Dialog.Description>
            <Dialog.Button label={confirming ? <ActivityIndicator /> : 'YES'} onPress={handleConfirmBooking}/>
            <Dialog.Button label="No" onPress={() => setDialogVisible(false)} />
        </Dialog.Container>
        <Dialog.Container contentStyle={{
            maxHeight:Dimensions.get('window').height * 0.5
        }} visible={rejectDialogVisible}>
            <Dialog.Title style={{color:"#f31260", fontWeight:"bold"}}>Reject Booking</Dialog.Title>
            <Dialog.Description>Are you sure you want to reject this booking?</Dialog.Description>
            <View style={{paddingHorizontal:10,}}>
                <Text style={{}}>Reason for Rejecting</Text>
                <Text style={{fontSize:12, maxWidth:'80%', color:'rgba(0,0,0,0.3)', marginBottom:8}}>Let your echoer know why you are rejecting this booking. </Text>
                <TextInput placeholder='Type your reason here...' multiline style={{padding:5,borderColor:'#f31260',borderWidth:1, borderRadius:8, marginVertical:5}} value={cancellationReason} onChangeText={setCancellationReason}/>
            </View>
            <Dialog.Button style={{backgroundColor:"#f31260", color:'#fff', borderRadius:8, paddingHorizontal:12}} label={rejecting ? <ActivityIndicator /> : 'YES'} onPress={handleRejectBooking}/>
            <Dialog.Button style={{backgroundColor:"rgba(0,0,0,0.5)", color:'#fff', borderRadius:8, paddingHorizontal:12, marginLeft:5}}  label="No" onPress={() => setRejectDialogVisible(false)} />
        </Dialog.Container>
        </>


    )


}


const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor:"#fff",
        padding:20,
        borderRadius:10,
        marginBottom:10,
        elevation:4,
        flexDirection:'row',
        marginHorizontal:10,
        gap:8,
        borderBottomRightRadius:40,
        borderTopLeftRadius:40
    },
    artistName:{
        fontSize:16,
        fontWeight:'bold',
        flex:1,
         color:'dodgerblue'
    },
    image:{
        width:100,
        height:100,
        borderRadius:15,
        borderTopLeftRadius:20
    },
    description:{
        fontSize:12,
        color:'rgba(0,0,0,0.4)',
        textTransform:'capitalize'
    },
    price:{
        fontSize:18,
        fontWeight:'bold',


    },
    status:{
        width:90,
        textAlign:'center',
        padding:4,
        marginTop:4,
        borderRadius:30,
        textTransform:'capitalize',
        fontSize:10,
        fontWeight:'bold',
        display:'flex'

    },
    modalContainer:{
        backgroundColor:'#fff',
        minHeight:Dimensions.get('window').height,

    },
    modalContent:{
        backgroundColor:'red',
        height:200
    }
})
