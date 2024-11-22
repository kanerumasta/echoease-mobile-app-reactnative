import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { useFetchTransactionDetailQuery } from "@/redux/features/transactionApiSlice";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function TransactionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: transaction, isLoading: transactionLoading } = useFetchTransactionDetailQuery(id);
  const { data: currentUser, isLoading: userLoading } = useGetUserQuery();
  const isExpense = (transaction?.transaction_type === 'downpayment') || (transaction?.transaction_type === 'final_payment')

  if (transactionLoading || userLoading) return <ActivityIndicator />;

  return (
    <View style={styles.mainContainer}>
      <Header />
      {transaction && currentUser && (
        <View style={styles.receipt}>
            <View
                style={{
                    position:'absolute',
                    width:40,
                    height:40,
                    borderRadius:20,
                    backgroundColor:'dodgerblue',
                    bottom:70,
                    left:-20,
                    zIndex:100
                }}
            />
            <View
                style={{
                    position:'absolute',
                    width:40,
                    height:40,
                    borderRadius:20,
                    backgroundColor:'dodgerblue',
                    bottom:70,
                    right:-20,
                    zIndex:100
                }}
            />
          {currentUser.role === "artist" ? (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${transaction.booking.client.profile.profile_image}`,
                }}
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${transaction.booking.artist.user.profile.profile_image}`,
                }}
              />
            </View>
          )}

          <View style={styles.receiptHeader}>
            <Text style={{fontSize:20, fontWeight:'bold', textTransform:'capitalize',color:'dodgerblue', textAlign:'center'}}>{transaction.title ? transaction.title : transaction.payment.title}</Text>
          </View>

          <View style={{paddingVertical:10, flexDirection: "row", alignItems: "center", justifyContent:'space-between' }}>
            <Text>Booking Reference:</Text>
            <Text
              style={{
                fontWeight: "bold",
                color:'rgba(0,0,0,0.5)'
              }}
            >
              {transaction.booking.booking_reference}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between' }}>
            <Text>Amount</Text>
            <Text

              style={{
                fontSize:20,
                fontWeight: "bold",
                color: isExpense?"#f31260":"dodgerblue",
              }}
            >
             {'\u20B1'}{transaction.amount}
            </Text>
          </View>
          <View style={{ height: 50, borderBottomWidth:1, borderStyle:'dashed', borderColor:'rgba(0,0,0,0.4)' }} />

          <View style={{ height: 50 }} />
          <View style={styles.footer}>
            <Text style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "rgba(0,0,0,0.5)",

            }}>Transaction Reference:</Text>
            <Text selectable style={{
                fontSize: 16,
                fontWeight: "bold",

            }}>{transaction.transaction_reference}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    padding: 8,
    backgroundColor: "dodgerblue",
  },
  header: {
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  receipt: {
    borderRadius: 15,
    position: "relative",
    paddingTop: 40,
    padding: 15,
    backgroundColor: "#fff",
    elevation: 10,
  },
  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -70,
    left: "50%",
    transform: [{ translateX: -45}],
    zIndex: 1000,
    backgroundColor:'dodgerblue',

    borderRadius:60
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Half of width and height to make it a circle
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    gap:4


  },
  receiptHeader: {
    padding: 30,
    justifyContent: "center",
    // backgroundColor:'rgba(0,0,0,0.1)',

    borderRadius:15,
    marginBottom:10
  },
});
