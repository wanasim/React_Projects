const initialCalendarState = {
   sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}

function calendar (state){
   // grabbing properties from action
   //notice how object spread syntax is needed twice because it assigns the new state to the day and then to the meal.
   return {
            ...state,  //spreads all days
            ["friday"] : { //matches the particular day listed above in ...state
              ...state["friday"], //spreads the object which shows all meals in the day
            ["breakfast"]:"chicken", //assigns the meal with the food
            }
         }
  }

  console.log(calendar(initialCalendarState))
