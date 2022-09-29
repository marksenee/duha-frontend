import React, { useEffect, useState } from "react";
import { mypageAPIs } from "../../api/api";
import Layout from "../../components/layout/Layout";
import CategoryItem from "../../components/mypage/CategoryItem";
import Spinner from "../../components/Spinner/Spinner";

function FavoriteRestaurantsPage() {
  const [restaurantData, setRestaurantData] = useState();

  useEffect(() => {
    mypageAPIs.getFavoriteLists("restaurant").then(res => setRestaurantData(res.data.data));
  }, []);

  return (
    <Layout isLoggedIn={false} title="마이페이지" highlight={"mypage/favorites"}>
      <div className="grid place-items-center m-10">
        <span className="font-medium text-xl">
          {restaurantData?.length ? "000님이 즐겨찾기하신 맛집 목록을 확인해보세요!" : "맛집 즐겨찾기를 추가해보세요! "}
        </span>
      </div>
      {restaurantData ? (
        restaurantData?.map(item => {
          return <CategoryItem key={item.id} item={item} category={`restaurants`} />;
        })
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default FavoriteRestaurantsPage;