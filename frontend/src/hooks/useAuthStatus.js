import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    // 從 redux 取得 user data
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        }
        else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])

    return {
        loggedIn, checkingStatus
    }
}