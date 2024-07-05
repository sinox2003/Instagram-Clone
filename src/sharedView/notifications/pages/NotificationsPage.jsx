import React, { useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import { firestore } from "../../../config/firebase.js";
import useGetNotification from "../../../hooks/back-end-hooks/useGetNotification.js";
import {Box, VStack, Text, useColorMode, Divider, Heading} from "@chakra-ui/react";
import NotificationNavBar from "../components/NotificationNavBar.jsx";
import NotificationSkeleton from "../components/NotificationSkeleton.jsx";
import NotificationNewLike from "../components/Notification-newLike.jsx";
import NotificationNewFollower from "../components/Notification-newFollower.jsx";
import NotificationNewComment from "../components/Notification-newComment.jsx";

function NotificationsPage() {
    const { toggle } = useToggleSidebar();
    const authUser = useAuthStore(state => state.user);
    const { isLoading, notifications } = useGetNotification();
    const skeletonArray = new Array(10).fill(null);
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    useEffect(() => {
        toggle(false);

        if (authUser?.uid) {
            const notificationsRef = doc(firestore, "userNotifications", authUser.uid);
            updateDoc(notificationsRef, {
                unread: false
            }).catch((error) => {
                console.error("Error updating notifications: ", error);
            });
        }
    }, []);

    const renderNotification = (key, notification) => {
        switch (notification.type) {
            case 'newLike':
                return (
                    <NotificationNewLike key={key} notification={notification} />
                );
            case 'newFollower':
                return (
                    <NotificationNewFollower key={key} notification={notification} />
                );
            case 'newComment':
                return (
                    <NotificationNewComment key={key} notification={notification} />
                );
            default:
                return (
                    <>No Notifications</>
                );
        }
    };

    const groupNotifications = (notifications) => {
        const now = Date.now();
        const oneDay = 86400000;
        const oneWeek = 604800000;
        const oneMonth = 2629800000;

        const today = notifications.filter(n => now - n.timestamp < oneDay);
        const thisWeek = notifications.filter(n => now - n.timestamp >= oneDay && now - n.timestamp < oneWeek);
        const thisMonth = notifications.filter(n => now - n.timestamp >= oneWeek && now - n.timestamp < oneMonth);
        const earlier = notifications.filter(n => now - n.timestamp >= oneMonth);

        return { today, thisWeek, thisMonth, earlier };
    };

    const groupedNotifications = groupNotifications(notifications);

    const renderGroupedNotifications = (group, label) => (
        group.length > 0 && (
            <>
                <Text textAlign={"start"} fontWeight={"bold"} px={"16px"} pt={"8px"} w={"full"}>{label}</Text>
                {
                    group.map((notification, key) => (
                        renderNotification(key, notification)
                    ))
                }
                <Divider borderColor={switchMode('whiteAlpha.400','blackAlpha.400')}  />
            </>
        )
    );

    return (
        <>
            <NotificationNavBar />
            {
                isLoading ?
                    <VStack mt={{ base: "45px", md: 6 }} py={4} overflowY="auto" h={{ base: "calc(100dvh - 100px)", md: '100vh' }} w={"full"}>
                        {
                            skeletonArray.map((_, index) => (
                                <NotificationSkeleton key={index} />
                            ))
                        }
                    </VStack>
                    :
                    <Box mt={{ base: "45px", md: 6 }} overflowY="auto"
                         h={{ base: "calc(100dvh - 100px)", md: '100vh' }} w={"full"}>
                        <VStack>
                            {
                            notifications.length===0 ?

                                <Heading  size={{base:"md",md:"lg"}}  pt={"8px"} >  There are no notifications at the moment </Heading>

                                :
                                <>
                                    {renderGroupedNotifications(groupedNotifications.today, "Today")}
                                    {renderGroupedNotifications(groupedNotifications.thisWeek, "This Week")}
                                    {renderGroupedNotifications(groupedNotifications.thisMonth, "This Month")}
                                    {renderGroupedNotifications(groupedNotifications.earlier, "Earlier")}
                                </>
                            }


                        </VStack>
                    </Box>
            }
        </>
    );
}

export default NotificationsPage;
