import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __getSchedules, __deleteSchedule } from "../../redux/modules/schedules";
import { useSelector } from "react-redux";

function ScheduleCard() {
  const dispatch = useDispatch();
  const { schedules } = useSelector(state => state.schedules);
  console.log("aa", schedules);

  useEffect(() => {
    dispatch(__getSchedules());
  }, [dispatch]);

  const onDeleteSchedule = tripId => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteSchedule(tripId));
    }
  };

  return (
    <div className="h-screen">
      {!schedules ? (
        <Spinner />
      ) : (
        schedules?.map(item => {
          return (
            <ScheduleCardComponent
              key={item.id}
              title={item.title}
              startDate={item.startAt}
              endDate={item.endAt}
              id={item.id}
              onDeleteSchedule={onDeleteSchedule}
            />
          );
        })
      )}
    </div>
  );
}

function ScheduleCardComponent({ title, startDate, endDate, id, onDeleteSchedule }) {
  const newStartDate = DateCalculation(startDate);
  const newEndDate = DateCalculation(endDate);
  const newDate = DateDiff(newStartDate, newEndDate);
  const nights = newDate[0];
  const allDays = newDate[1];

  const navigate = useNavigate();

  const setItem = () => {
    localStorage.setItem("id", id);
  };

  return (
    <div className="w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row">
      <div
        className="pr-36"
        onClick={() => {
          navigate(`${id}/1`);
          setItem();
        }}
      >
        <div className="flex flex-col m-5 ">
          <span className="mt-2	font-semibold">
            {nights + "박" + allDays + "일" + " "}
            {title}
          </span>
          <span className="mt-2 font-light text-sm">
            {startDate}~{endDate}
          </span>
        </div>
      </div>
      <div className="flex flex-row mt-5 ">
        <DeleteOutlineIcon className="mt-5 cursor-pointer" onClick={() => onDeleteSchedule(id)} />
      </div>
    </div>
  );
}

export default ScheduleCard;
