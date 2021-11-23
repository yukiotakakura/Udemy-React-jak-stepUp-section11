import { UserCard } from "./components/UserCard";
import "./styles.css";
import { useAllUsers } from "./hooks/useAllUsers";

export default function App() {
  const { getUsers, userProfile, loading, error } = useAllUsers();

  // ボタンが押された場合にユーザー一覧を取得するカスタムフックを呼び出す
  const onClickFetchUsers = () => getUsers();
  return (
    <div className="App">
      <button onClick={onClickFetchUsers}>
        JsonPlaceholderからデータを取得
      </button>
      <br />
      {/*  APIのデータ取得に失敗した場合*/}
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました。</p>
      ) : loading ? ( // ロード中の場合
        <p>Loadding...</p>
      ) : (
        // それ以外の場合はユーザーカードを表示
        <>
          {/*  ユーザーカードをループ */}
          {userProfile.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
