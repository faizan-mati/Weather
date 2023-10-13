import React from 'react'
import './description.css'
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Description = ({ weather, units }) => {

  const tempUnit = units === "metric" ? "°C" : "°F"
  const windUnit = units === "metric" ? "m/s" : "m/h"

  const card = [{
    id: 1,
    icon: <FaArrowDown />,
    title: "min",
    data: weather.minTemperature.toFixed() ,
    unit: tempUnit
  },

  {
    id: 2,
    icon: <FaArrowUp />,
    title: "max",
    data: weather.maxTemperature.toFixed() ,
    unit: tempUnit
  },
  {
    id: 3,
    icon: <BiHappy />,
    title: "Feel Like",
    data: weather.feelsLike.toFixed() ,
    unit: tempUnit
  },

  {
    id: 4,
    icon: <MdCompress />,
    title: "pressure",
    data: weather.pressure.toFixed() ,
    unit: tempUnit
  },

  {
    id: 5,
    icon: <MdOutlineWaterDrop />,
    title: "humidity",
    data: weather.humidity.toFixed() ,
    unit: "%"
  },

  {
    id: 6,
    icon: <FaWind />,
    title: "Wind Speed",
    data: weather.windSpeed.toFixed() ,
    unit: windUnit
  }
  ]
  return (
    <div className='section section__description'>
      {
        card.map(({ id, icon, title, data, unit }) => (

          <div key={id} className='card' >
            <div className='description__card-icon'>
              {icon}
              <small>{title}</small>
            </div>
            <h2>{`${data}${unit}`}</h2>
          </div>
        )
        )}
    </div >
  )
}

export default Description