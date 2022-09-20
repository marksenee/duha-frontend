import placeNames from "../../utils/placeNames.js";
import SpotButton from "../../components/mainpage/SpotButton";
import Item from "../../components/mainpage/Item";
import Layout from "../../components/layout/Layout";

const dummyData = [
    {
        name: "이름",
        description: "설명",
        location: "위치",
        likes: 999,
        image: "이미지",
        isFavorite: true
    },
    {
        name: "이름2",
        description: "설명",
        location: "위치",
        likes: 999,
        image: "이미지",
        isFavorite: true
    },
    {
        name: "이름3",
        description: "설명",
        location: "위치",
        likes: 999,
        image: "이미지",
        isFavorite: true
    }
]

const TouristSpots = () => {
    return <Layout isLoggedIn={false} title="관광지" highlight={"mainpage/spots"}>
        <div>
            <ul className="flex flex-row justify-around">
                <li className="font-bold text-2xl">관광</li>
                <li className="font-bold text-2xl">맛집</li>
                <li className="font-bold text-2xl">숙소</li>
            </ul>
        </div>
        <div>
            <ul className="flex flex-row justify-between">
                <li className="bg-green-400 p-1.5 px-3 rounded text-white font-bold shadow-2xl">전체</li>
                {placeNames.map(place => {
                    return <SpotButton key={place.name} {...place}/>;
                })
                }
            </ul>
        </div>
        <div>
            {dummyData.map(data => {
                return <Item key={data.name} {...data}/>
            })}
        </div>
    </Layout>
}

export default TouristSpots;