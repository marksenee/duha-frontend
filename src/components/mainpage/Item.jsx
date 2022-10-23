import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Map from "../../pages/detailpage/mappage/Map";
import Bookmark from "./Bookmark";

const Item = ({ data, category, refetchList }) => {
  const navigator = useNavigate();
  const { id, name, description, region, thumbnailUrl, bookmarked, hasNearStation, latitude, longitude, bookmarkNum } = data;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const itemClickHandler = () => {
    switch (category) {
      case "touristspot":
        return navigator("/spots/" + id);
        break;
      case "restaurant":
        return navigator("/restaurants/" + id);
        break;
      case "accommodation":
        return navigator("/accommodations/" + id);
        break;
    }
  };
  const mapClickHandler = event => {
    event.stopPropagation();
    setIsMapModalOpen(true);
  };

  const backdropClickHandler = () => {
    setIsMapModalOpen(false);
  };
  return (
    <div className="relative">
      <div
        onClick={itemClickHandler}
        className="p-2 md:p-4 group bg-white1 rounded-md mb-4 shadow-md cursor-pointer flex hover:brightness-95 transition-all"
      >
        <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative mr-2">
          <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-start">
            <p className="font-bold text-sm md:text-lg">{name}</p>
            {hasNearStation && (
              <DirectionsBusFilledOutlinedIcon
                fontSize="medium"
                sx={{
                  color: "#ECB390"
                }}
              />
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-xs">{region}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs">{description}</p>
          </div>
          <div className="flex items-center">
            <Bookmark bookmarked={bookmarked} numberOfBookmarks={bookmarkNum} category={category} id={id} refetchList={refetchList} />
          </div>
          <div onClick={mapClickHandler} className="absolute right-2 bottom-2">
            <LocationOnOutlinedIcon className="cursor-pointer" fontSize="medium" />
          </div>
        </div>
      </div>
      {isMapModalOpen && (
        <div>
          <div className="fixed top-0 left-0 z-20 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
          <div className="fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
            <Map latitude={latitude} longitude={longitude} name={name} setIsMapModalOpen={setIsMapModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
