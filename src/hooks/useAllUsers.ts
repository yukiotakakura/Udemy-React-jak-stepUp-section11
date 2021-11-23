import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

/**
 * 全ユーザー一覧を取得するカスタムフックを定義
 */
export const useAllUsers = () => {
  // 加工後のAPIデータを保持するstateを定義
  const [userProfile, setUserProfiles] = useState<Array<UserProfile>>([]);
  // ローディングを保持するｓtateを定義
  const [loading, setLoading] = useState(false);
  // APIエラーを保持するstateを定義
  const [error, setError] = useState(false);

  // APIからユーザー一覧を加工してから取得する
  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfile, loading, error };
};
