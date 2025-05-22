import { createContext, PropsWithChildren, useMemo, useState } from "react";

export type Profile = { username: string };

export const MyValueContext = createContext<
  { profile: Profile; setProfile: (newProfile: Profile) => void } | undefined
>(undefined);

type MyValueProviderProps = PropsWithChildren<{ profile: Profile }>;

export const MyValueProvider = ({
  profile,
  children,
}: MyValueProviderProps) => {
  const [myProfile, setMyProfile] = useState(profile);

  const value = useMemo(
    () => ({
      profile: myProfile,
      setProfile: setMyProfile,
    }),
    [myProfile]
  );

  return (
    <MyValueContext.Provider value={value}>{children}</MyValueContext.Provider>
  );
};
