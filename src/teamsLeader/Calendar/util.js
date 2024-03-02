import dayjs from "dayjs";

const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year();
    console.log("Year",year);
    const firstDayOfTheMonth = dayjs(new Date(year,month,1)).day() ;
    
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const dayMatrix = new Array(6).fill([]).map(() => {
      return  new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year,month,currentMonthCount))

        })
    })
    console.log("dayMatrix",dayMatrix);
    return dayMatrix;
  };
  
  export default getMonth;
  