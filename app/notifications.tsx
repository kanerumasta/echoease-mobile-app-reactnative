import { useDeleteNotificationMutation, useFetchNewNotificationsQuery, useFetchOldNotificationsQuery, useReadNotificationMutation } from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
import { toDateString } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

export default function Notifications() {
  const [page, setPage] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [onSelectionMode, setOnSelectionMode] = useState(false)
  const { data: notifications = [], isLoading, refetch } = useFetchNewNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedNotifications, setSelectedNotifications] = useState<z.infer<typeof NotificationInSchema>[]|null>(null)
  const { data: oldNotifications, isLoading: loadingOldNotifications, isFetching, refetch:refetchOld } = useFetchOldNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteNotification] = useDeleteNotificationMutation()

  // State to accumulate old notifications
  const [oldNotificationsData, setOldNotificationsData] = useState<any[]>([]);

  const handleDeleteNofifs = async () => {
    try {
      setDeleteLoading(true);

      // Execute all deletions in parallel
      if (selectedNotifications?.length) {
        await Promise.all(selectedNotifications.map((notif) => deleteNotification(notif.id)));
      }

      Toast.show({
        text1: "Deleted successfully",
        type: "success",
      });

      // Reset states after deletion
      setSelectedNotifications([]);
      setOnSelectionMode(false);

      handleRefresh()
    } catch (error) {
      Toast.show({
        text1: "Failed to delete notifications",
        type: "error",
      });
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };


  useEffect(() => {
    if (oldNotifications?.results && !loadingOldNotifications && !isLoading &&  !isFetching) {
      setOldNotificationsData((prevData) => {
        const existingIds = new Set(prevData.map((notification) => notification.id));
        const newNotifications = oldNotifications.results.filter(
          (notification) => !existingIds.has(notification.id)
        );
        return [...prevData, ...newNotifications];
      });
    }
  }, [oldNotifications]);

  const handleNextPage = () => {
    if (oldNotifications?.has_next && !loadingOldNotifications && !isFetching) {
      setPage((prev) => prev + 1);
      refetch()
    }
  };


  const handleRefresh = () => {


        setPage(1); // Reset the page to 1
        setOldNotificationsData([]); // Clear the old notifications
        refetch(); // Refetch new notifications
        refetchOld(); // Refetch old notifications

  }


  const renderItem = ({ item, isNew }: { item: z.infer<typeof NotificationInSchema>; isNew: boolean }) => (
    <NotificationCard
        isSelected={selectedNotifications?.some((notif)=>notif.id === item.id) || false}
        isNew={isNew}
        item={item}
        selectionMode={onSelectionMode}
        setSelectedNotifications={setSelectedNotifications}
        setSelectionMode={setOnSelectionMode}
        key={item.id}
         />
  );

  const data = [
    { title: "Latest", data: notifications, isNew: true },
    { title: "Previously", data: oldNotificationsData, isNew: false },
  ];

  return (
    <>
    {onSelectionMode &&
    <ActionBar isLoading={deleteLoading} onClose={
        ()=>{
         setOnSelectionMode(false)
         setSelectedNotifications(null)
        }

    } onDelete={handleDeleteNofifs}/>
}
    <FlatList

      data={data}
      keyExtractor={(item, index) => `section-${index}`}
      renderItem={({ item }) => (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <FlatList
            data={item.data}
            renderItem={(subItem) => renderItem({ ...subItem, isNew: item.isNew })}
            keyExtractor={(subItem) => subItem.id.toString()}
            onEndReached={handleNextPage}
            ListFooterComponent={
                item.title.toLowerCase() === 'latest' ?
                  (isLoading ? <ActivityIndicator size={30} /> : null) :
                  (loadingOldNotifications || isFetching ? <ActivityIndicator size={30} /> : null)
              }
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
      showsVerticalScrollIndicator={false}

    />
    </>
  );
}

type NotificationCardProps = {
    item: z.infer<typeof NotificationInSchema>,
    isNew: boolean,
    isSelected:boolean,
    selectionMode:boolean,
    setSelectionMode:Dispatch<SetStateAction<boolean>>,
    setSelectedNotifications:Dispatch<SetStateAction<z.infer<typeof NotificationInSchema>[]|null>>
}
const NotificationCard = ({
    item,
    isNew,
    isSelected,
    selectionMode,
    setSelectionMode,
    setSelectedNotifications,
  }: NotificationCardProps) => {
    const router = useRouter();

    const handleSelectNotification = (notification: z.infer<typeof NotificationInSchema>) => {
      setSelectedNotifications((prevSelected) => {
        if (!prevSelected) return [notification];
        const isAlreadySelected = prevSelected.some((n) => n.id === notification.id);
        if (isAlreadySelected) {
          // Remove if already selected
          return prevSelected.filter((n) => n.id !== notification.id);
        }
        return [...prevSelected, notification];
      });
    };

    const handlePress = () => {
      if (selectionMode) {
        // Toggle selection
        handleSelectNotification(item);
      } else {
        // Normal navigation
        readNotification(item.id.toString());
        const type = item.notification_type;
        if (type.split("_").includes("booking")) {
          router.push("/bookings");
        }
        if (type.split("_").includes("dibursement") || type === "downpayment") {
          router.push(`/transactions`);
        }
        if (type === 'downpayment_paid' && item.booking?.id) {
         router.push(`/bookings/${item.booking?.id.toString()}`);
        }
      }
    };

    const [readNotification] = useReadNotificationMutation();

    const renderIcon = (item: z.infer<typeof NotificationInSchema>) => {
      const type = item.notification_type;
      return (
        <View
          style={{
            borderRadius: 20,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              type === "new_booking"
                ? "dodgerblue"
                : type === "booking_confirmation"
                ? "#17c964"
                : type === "booking_rejected"
                ? "#f31260"
                : type === "payment_reminder"
                ? "#9353d3"
                : type === "event_reminder"
                ? "#f5a524"
                : type === "downpayment_paid"
                ? "#9353d3"
                : type === "dibursement_received"
                ? "#17c964"
                : "dodgerblue",
          }}
        >
          {isSelected ? (
            <Ionicons name="checkmark" size={25} color={"#fff"} />
          ) : type.split("_").includes("booking") ? (
            <Ionicons name="book" size={25} color={"#fff"} />
          ) : type.split("_").includes("dibursement") ? (
            <Ionicons name="card" size={25} color={"#000"} />
          ) : type.split("_").includes("downpayment") ? (
            <Ionicons name="card" size={25} color={"#fff"} />
          ) : type.split("_").includes("follower") ? (
            <Ionicons name="person-add" size={25} color={"#fff"} />
          ) : type.split("_").includes("message") ? (
            <Ionicons name="chatbubble" size={25} color={"#fff"} />
          ) : (
            <Ionicons name="notifications" size={25} color={"#fff"} />
          )}
        </View>
      );
    };

    return (
      <TouchableOpacity
        onLongPress={() => {
          if (!selectionMode) setSelectionMode(true); // Enter selection mode on long press
          handleSelectNotification(item); // Select the long-pressed notification
        }}
        onPress={handlePress}
        style={{
          backgroundColor: isSelected ? "rgba(0, 0, 255, 0.1)" : "#fff",
          padding: 10,
          marginVertical: 6,
          marginHorizontal: 8,
          borderRadius: 10,
          flexDirection: "row",
          gap: 8,
        }}
      >
        {renderIcon(item)}
        <View style={{ width: "85%" }}>
          <Text style={{ fontWeight: isNew ? "bold" : "500", fontSize: 14 }}>{item.title}</Text>
          <Text style={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}>{item.description}</Text>
          <Text style={{ textAlign: "right", fontSize: 12, color: "rgba(0,0,0,0.4)" }}>
            {toDateString(item.created_at).slice(4)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


const ActionBar = ({onDelete, onClose, isLoading}:{onDelete:()=>void, onClose:()=>void,isLoading:boolean}) => {
    return <View style={{
        height:40,
        justifyContent:'space-between',
        backgroundColor:'dodgerblue',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row'
    }}>
        <Ionicons onPress={onClose} color={"#fff"} size={25} name="close" />
        {isLoading ? <ActivityIndicator size={25} color={"#fff"} /> :
        <Ionicons onPress={onDelete} color={"#fff"} size={25} name="trash"/>}
    </View>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
    paddingHorizontal: 8,
  },
});
