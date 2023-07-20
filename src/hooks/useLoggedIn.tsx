import { useGetIdentity } from "@refinedev/core"
import { useEffect, useState } from "react";
import { IUser } from "src/interfaces/interface";
import { supabaseClient } from "src/utility";


export const useLoggedIn = () => {
    const { data: user, isError } = useGetIdentity<IUser>();
    const [profile, setProfile] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                try {
                    const { data, error } = await supabaseClient
                                            .from("profiles")
                                            .select()
                                            .limit(1)
                                            .eq("id", user.id);
                    
                    setProfile(data[0]);
                    setIsLoading(false);
                } catch(error) {
                    console.error('Error fetching extra info:', error);
                    setIsLoading(false);
                }
            }
        }

        fetchUserProfile();

    }, [user]);

    return { user, profile, isError, isLoading }
}