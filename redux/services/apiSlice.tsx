import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import AsyncStorage from "@react-native-async-storage/async-storage";

const mutex = new Mutex();
console.log('env',`${process.env.BACKEND_URL}` )
console.log(typeof(`${process.env.BACKEND_URL}`))
const baseQuery = fetchBaseQuery({
  baseUrl:`${process.env.BACKEND_URL}/api`,
  prepareHeaders: async (headers) => {
    const accessToken = await AsyncStorage.getItem('access');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {

        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: '/jwt/refresh/',
              method: 'POST',
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            await AsyncStorage.setItem('access', refreshResult.data.access);
            result = await baseQuery(args, api, extraOptions); // Retry original request with new token
          } else {
            console.log('Refresh failed, logging out');
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth, // Use the enhanced baseQuery
  tagTypes: [
    "CurrentUser", "oldNotifications", "newNotifications", "Bookings", "Echoees", "ConnectionRequests", "PendingBookings",
    "Portfolio", "Connections", "RecommendedArtists", "SentConnectionRequests", "CurrentArtist", "AwaitingDownpayments",
    "ApprovedBookings", "MyUnavailableDates", "CompletedBookings", "PendingPayments", "UpcomingEvents", "ScheduledDays",
    "CombinedAvailability", "Transactions", "followers", "BlockedChats",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
